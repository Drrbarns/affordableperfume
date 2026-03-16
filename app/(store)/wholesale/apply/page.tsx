'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const ghanaRegions = [
  'Greater Accra', 'Ashanti', 'Western', 'Central', 'Eastern',
  'Northern', 'Volta', 'Upper East', 'Upper West', 'Brong-Ahafo',
  'Ahafo', 'Bono', 'Bono East', 'North East', 'Savannah', 'Oti', 'Western North'
];

export default function WholesaleApplicationPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [existingApplication, setExistingApplication] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    business_name: '',
    contact_name: '',
    email: '',
    phone: '',
    city: '',
    region: '',
    business_type: '',
    tax_id: '',
    notes: ''
  });

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setCheckingAuth(false);
        return;
      }

      setUser(session.user);
      setForm(prev => ({ ...prev, email: session.user.email || '' }));

      // Check for existing application
      const { data: app } = await supabase
        .from('wholesale_applications')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (app) setExistingApplication(app);

      // Check if already a wholesaler
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_wholesaler')
        .eq('id', session.user.id)
        .single();

      if (profile?.is_wholesaler) {
        router.push('/wholesale');
        return;
      }

      setCheckingAuth(false);
    }

    checkAuth();
  }, [router]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.business_name.trim()) newErrors.business_name = 'Business name is required';
    if (!form.contact_name.trim()) newErrors.contact_name = 'Contact name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.region) newErrors.region = 'Region is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!user) {
      router.push(`/auth/signup?redirect=/wholesale/apply`);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('wholesale_applications')
        .insert([{
          user_id: user.id,
          ...form
        }]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      console.error('Application error:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  // Already submitted
  if (submitted || (existingApplication?.status === 'pending')) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-line text-4xl text-green-600"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your interest in becoming a wholesaler. We&apos;ll review your application and get back to you within 1-2 business days.
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

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <i className="ri-store-2-line text-2xl"></i>
            <span className="text-amber-200 text-sm font-medium uppercase tracking-wider">Wholesale Program</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Apply to Become a Wholesaler</h1>
          <p className="text-amber-100">
            Get access to exclusive wholesale pricing, bulk quantities, and dedicated support.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {!user && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start space-x-3">
            <i className="ri-information-line text-blue-600 text-xl mt-0.5"></i>
            <div>
              <p className="text-blue-900 font-semibold">Account Required</p>
              <p className="text-blue-800 text-sm">
                You&apos;ll need to{' '}
                <Link href={`/auth/signup?redirect=/wholesale/apply`} className="underline font-medium">create an account</Link>
                {' '}or{' '}
                <Link href={`/auth/login?redirect=/wholesale/apply`} className="underline font-medium">log in</Link>
                {' '}before submitting your application.
              </p>
            </div>
          </div>
        )}

        {existingApplication?.status === 'rejected' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
            <i className="ri-close-circle-line text-red-600 text-xl mt-0.5"></i>
            <div>
              <p className="text-red-900 font-semibold">Previous Application Rejected</p>
              <p className="text-red-800 text-sm">
                Your previous application was not approved. You may submit a new application with updated details below.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Business Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Business Name *</label>
              <input
                type="text"
                value={form.business_name}
                onChange={(e) => updateField('business_name', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.business_name ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="Your business name"
              />
              {errors.business_name && <p className="text-red-500 text-sm mt-1">{errors.business_name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Contact Name *</label>
              <input
                type="text"
                value={form.contact_name}
                onChange={(e) => updateField('contact_name', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.contact_name ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="Full name of contact person"
              />
              {errors.contact_name && <p className="text-red-500 text-sm mt-1">{errors.contact_name}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="business@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.phone ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="e.g., 0241234567"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">City *</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => updateField('city', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.city ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="e.g., Accra"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Region *</label>
              <select
                value={form.region}
                onChange={(e) => updateField('region', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 cursor-pointer ${errors.region ? 'border-red-300' : 'border-gray-300'}`}
              >
                <option value="">Select region</option>
                {ghanaRegions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Business Type</label>
              <select
                value={form.business_type}
                onChange={(e) => updateField('business_type', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 cursor-pointer"
              >
                <option value="">Select type</option>
                <option value="retailer">Retailer</option>
                <option value="distributor">Distributor</option>
                <option value="reseller">Reseller</option>
                <option value="salon">Salon / Beauty Shop</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Tax ID / Business Registration</label>
              <input
                type="text"
                value={form.tax_id}
                onChange={(e) => updateField('tax_id', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Optional"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Additional Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
              placeholder="Tell us about your business, expected order volume, or any questions..."
            />
          </div>

          <button
            type="submit"
            disabled={loading || !user}
            className={`w-full py-4 rounded-lg font-semibold text-white transition-colors ${
              user
                ? 'bg-amber-600 hover:bg-amber-700 cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <i className="ri-loader-4-line animate-spin mr-2"></i>
                Submitting...
              </span>
            ) : !user ? (
              'Log in to Submit Application'
            ) : (
              <>
                <i className="ri-send-plane-line mr-2"></i>
                Submit Application
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
