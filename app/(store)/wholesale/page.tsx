'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ProductCard, { type ColorVariant, getColorHex } from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/skeletons/ProductCardSkeleton';

type WholesaleStatus = 'loading' | 'not_logged_in' | 'not_wholesaler' | 'pending' | 'approved';

export default function WholesaleShopPage() {
  const router = useRouter();
  const [status, setStatus] = useState<WholesaleStatus>('loading');
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);

  useEffect(() => {
    async function checkAccess() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setStatus('not_logged_in');
        return;
      }

      setUser(session.user);

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_wholesaler')
        .eq('id', session.user.id)
        .single();

      if (profile?.is_wholesaler) {
        setStatus('approved');
        fetchProducts(session.access_token);
        return;
      }

      // Check if they have a pending application
      const { data: application } = await supabase
        .from('wholesale_applications')
        .select('status')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (application?.status === 'pending') {
        setApplicationStatus('pending');
        setStatus('pending');
      } else if (application?.status === 'rejected') {
        setApplicationStatus('rejected');
        setStatus('not_wholesaler');
      } else {
        setStatus('not_wholesaler');
      }
    }

    checkAccess();
  }, []);

  async function fetchProducts(token: string) {
    setLoadingProducts(true);
    try {
      const res = await fetch('/api/wholesale/products', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();

      const formatted = data.map((p: any) => {
        const variants = p.product_variants || [];
        const hasVariants = variants.length > 0;
        const totalStock = hasVariants
          ? variants.reduce((sum: number, v: any) => sum + (v.quantity || 0), 0)
          : p.quantity;

        const colorVariants: ColorVariant[] = [];
        const seen = new Set<string>();
        for (const v of variants) {
          const name = v.option2;
          if (name && !seen.has(name.toLowerCase().trim())) {
            const hex = getColorHex(name);
            if (hex) {
              seen.add(name.toLowerCase().trim());
              colorVariants.push({ name: name.trim(), hex });
            }
          }
        }

        return {
          id: p.id,
          slug: p.slug,
          name: p.name,
          price: p.wholesale_price || p.price,
          originalPrice: p.price !== (p.wholesale_price || p.price) ? p.price : undefined,
          image: p.product_images?.[0]?.url || 'https://via.placeholder.com/800x800?text=No+Image',
          rating: 0,
          reviewCount: 0,
          badge: 'Wholesale',
          inStock: totalStock > 0,
          maxStock: totalStock || 50,
          moq: p.wholesale_moq || p.moq || 1,
          category: p.categories?.name,
          hasVariants,
          colorVariants,
        };
      });

      setProducts(formatted);
    } catch (err) {
      console.error('Error loading wholesale products:', err);
    } finally {
      setLoadingProducts(false);
    }
  }

  // Set wholesale cart flag when viewing the wholesale catalog
  useEffect(() => {
    if (status === 'approved') {
      localStorage.setItem('wholesale_cart', 'true');
    }
    return () => {
      // Don't remove on unmount — keep it for checkout
    };
  }, [status]);

  // Not logged in
  if (status === 'not_logged_in') {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-lock-line text-4xl text-amber-600"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Wholesale Access Required</h1>
          <p className="text-gray-600 mb-8">
            Please log in with your approved wholesaler account to access our wholesale catalog.
          </p>
          <Link
            href={`/auth/login?redirect=/wholesale`}
            className="inline-flex items-center px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
          >
            <i className="ri-login-box-line mr-2"></i>
            Log In
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Not a wholesaler yet?{' '}
            <Link href="/wholesale/apply" className="text-amber-600 hover:underline font-medium">
              Apply here
            </Link>
          </p>
        </div>
      </main>
    );
  }

  // Pending application
  if (status === 'pending') {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-time-line text-4xl text-blue-600"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Application Under Review</h1>
          <p className="text-gray-600 mb-8">
            Your wholesaler application is currently being reviewed. We&apos;ll notify you once it&apos;s approved. This usually takes 1-2 business days.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back to Store
          </Link>
        </div>
      </main>
    );
  }

  // Not wholesaler (rejected or never applied)
  if (status === 'not_wholesaler') {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-store-2-line text-4xl text-amber-600"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Become a Wholesaler</h1>
          <p className="text-gray-600 mb-2">
            {applicationStatus === 'rejected'
              ? 'Your previous application was not approved. You may re-apply with updated information.'
              : 'Access exclusive wholesale pricing by applying for a wholesaler account.'
            }
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Get access to bulk pricing, lower MOQs, and dedicated support.
          </p>
          <Link
            href="/wholesale/apply"
            className="inline-flex items-center px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
          >
            <i className="ri-file-list-3-line mr-2"></i>
            Apply for Wholesale
          </Link>
        </div>
      </main>
    );
  }

  // Loading
  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  // Approved — show wholesale catalog
  return (
    <main className="min-h-screen bg-white">
      {/* Wholesale Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <i className="ri-vip-crown-2-line text-2xl"></i>
                <span className="text-amber-200 text-sm font-medium uppercase tracking-wider">Wholesale Portal</span>
              </div>
              <h1 className="text-3xl font-bold">Wholesale Catalog</h1>
              <p className="text-amber-100 mt-1">Exclusive pricing for approved wholesalers</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-amber-200 text-sm">Logged in as</p>
                <p className="font-semibold">{user?.email}</p>
              </div>
              <Link
                href="/cart"
                className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <i className="ri-shopping-cart-2-line text-xl"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{products.length}</span> wholesale products
            </p>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-8">
              {products.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 bg-gray-100 rounded-full">
                <i className="ri-inbox-line text-4xl text-gray-400"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Wholesale Products Yet</h3>
              <p className="text-gray-600">Check back soon for new wholesale offerings.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
