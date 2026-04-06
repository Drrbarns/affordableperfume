import Link from 'next/link';
import { sanitizeHtml } from '@/lib/sanitize';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const posts: any = {
    '1': {
      title: 'The Ultimate Guide to Online Shopping in Ghana',
      image: 'https://readdy.ai/api/search-image?query=Modern%20African%20woman%20shopping%20online%20on%20laptop%20in%20bright%20contemporary%20home%20office%20coffee%20cup%20plants%20natural%20light%20relaxed%20lifestyle%20photography%20minimal%20clean%20background&width=1200&height=600&seq=blogpost1&orientation=landscape',
      category: 'Shopping Tips',
      date: 'December 15, 2024',
      readTime: '8 min read',
      author: 'Ama Osei',
      content: `
        <p>Online shopping has revolutionised the way Ghanaians purchase products, offering convenience, variety, and competitive prices. However, navigating the world of ecommerce can be daunting if you're new to it. This comprehensive guide will help you shop online safely and confidently.</p>

        <h2>Why Shop Online in Ghana?</h2>
        <p>The benefits of online shopping are numerous. You can browse thousands of products from the comfort of your home, compare prices easily, read reviews from other customers, and have items delivered directly to your doorstep. For busy professionals and families, online shopping saves valuable time.</p>

        <p>Moreover, online stores often offer exclusive deals and promotions that aren't available in physical shops. You can shop at any time of day or night, without worrying about store opening hours or traffic.</p>

        <h2>Choosing a Reliable Online Store</h2>
        <p>Not all online stores are created equal. When shopping online, look for these trust signals:</p>
        <ul>
          <li><strong>Secure website:</strong> The URL should start with "https://" and display a padlock icon</li>
          <li><strong>Clear contact information:</strong> Phone numbers, email addresses, and physical address should be visible</li>
          <li><strong>Customer reviews:</strong> Real testimonials from verified buyers</li>
          <li><strong>Return policy:</strong> Clear terms for returns and refunds</li>
          <li><strong>Professional design:</strong> Well-organised website with detailed product information</li>
        </ul>

        <h2>Payment Methods in Ghana</h2>
        <p>Ghanaian online shoppers have several secure payment options:</p>
        <ul>
          <li><strong>Mobile Money:</strong> MTN, Vodafone, and AirtelTigo offer convenient payment options</li>
          <li><strong>Credit/Debit Cards:</strong> Visa and Mastercard are widely accepted</li>
          <li><strong>Moolre Payment:</strong> Our integrated payment gateway for seamless mobile money and card payments</li>
        </ul>

        <p>Always ensure you're on a secure connection when entering payment details. Avoid using public Wi-Fi for transactions.</p>

        <h2>Understanding Delivery Options</h2>
        <p>Delivery times and costs vary by location. In Accra and major cities, you can often get next-day delivery. Remote areas may take longer. Always check:</p>
        <ul>
          <li>Estimated delivery time for your location</li>
          <li>Delivery costs (many stores offer free shipping above a certain amount)</li>
          <li>Tracking availability</li>
          <li>What happens if you're not home for delivery</li>
        </ul>

        <h2>Tips for Safe Online Shopping</h2>
        <ol>
          <li><strong>Research the seller:</strong> Check reviews and ratings before purchasing</li>
          <li><strong>Read product descriptions carefully:</strong> Note sizes, colours, materials, and specifications</li>
          <li><strong>Save confirmation emails:</strong> Keep records of your orders and payment</li>
          <li><strong>Check return policies:</strong> Understand your options if the product isn't suitable</li>
          <li><strong>Use strong passwords:</strong> Create unique passwords for shopping accounts</li>
          <li><strong>Monitor your accounts:</strong> Check bank statements for unauthorised charges</li>
          <li><strong>Be wary of deals that seem too good to be true:</strong> Scammers often lure victims with unrealistic discounts</li>
        </ol>

        <h2>What to Do If Something Goes Wrong</h2>
        <p>Despite best efforts, issues can arise. If you receive the wrong item, a damaged product, or don't receive your order at all:</p>
        <ul>
          <li>Contact the seller immediately with photos and order details</li>
          <li>Most reputable stores will offer a replacement or refund</li>
          <li>If the store is unresponsive, contact your bank or mobile money provider</li>
          <li>Report fraudulent sellers to relevant authorities</li>
        </ul>

        <h2>Making the Most of Online Shopping</h2>
        <p>To enhance your online shopping experience:</p>
        <ul>
          <li>Sign up for newsletters to get exclusive deals and early access to sales</li>
          <li>Use wishlists to save items you're interested in</li>
          <li>Follow your favourite stores on social media for flash sales</li>
          <li>Take advantage of loyalty programmes and reward points</li>
          <li>Shop during major sales events like Black Friday for better prices</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Online shopping in Ghana is safe, convenient, and increasingly popular. By following these guidelines, you can enjoy all the benefits whilst minimising risks. Start with small purchases from reputable stores to build confidence, and soon you'll wonder how you ever lived without the convenience of online shopping.</p>

        <p>Happy shopping!</p>
      `
    },
    '2': {
      title: 'Top 10 Perfumes to Add to Your Collection This Season',
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20modern%20African%20home%20interior%20with%20stylish%20furniture%20decor%20items%20plants%20bright%20natural%20lighting%20contemporary%20design%20magazine%20quality%20photography&width=1200&height=600&seq=blogpost2&orientation=landscape',
      category: 'Fragrance Picks',
      date: 'December 12, 2024',
      readTime: '6 min read',
      author: 'Yaw Darko',
      content: `
        <p>Looking to refresh your fragrance shelf this season? These perfume styles help you cover every mood and occasion, from workday freshness to evening statements.</p>

        <h2>1. Fresh Citrus Daily Driver</h2>
        <p>Choose a clean citrus-forward scent for daytime wear. It feels bright, easy to wear, and performs well in Ghana's warm weather.</p>

        <h2>2. Elegant Floral Signature</h2>
        <p>A balanced floral fragrance gives a polished, feminine profile that works for both office and weekend settings.</p>

        <h2>3. Smooth Woody Fragrance</h2>
        <p>Woody notes add depth and versatility. They are ideal if you want a mature, confident profile without being too heavy.</p>

        <h2>4. Warm Oriental / Amber Option</h2>
        <p>For evenings and events, amber and oriental accords create a richer scent trail with stronger presence.</p>

        <h2>5. Oud-Inspired Statement</h2>
        <p>If you enjoy bold fragrances, an oud-forward perfume brings character and long-lasting projection.</p>

        <h2>6. Clean Musk Layering Scent</h2>
        <p>A soft musk can be worn alone or layered with other perfumes to boost longevity and create a unique signature.</p>

        <h2>7. Date-Night Gourmand</h2>
        <p>Vanilla, caramel, and sweet-spice notes create a cozy and memorable evening profile.</p>

        <h2>8. Classic Designer Bestseller</h2>
        <p>Keep one trusted bestseller in your rotation for effortless confidence and broad compliment appeal.</p>

        <h2>9. Gift-Ready Fragrance Set</h2>
        <p>A matching perfume and body product set is perfect for gifting and gives better value than buying separately.</p>

        <h2>10. Travel-Size Essential</h2>
        <p>Carry a smaller bottle or decant for top-ups during long days and special occasions.</p>

        <h2>Final Tip</h2>
        <p>Build your collection gradually: one fresh scent, one evening scent, and one all-round signature gives excellent coverage without overspending.</p>
      `
    },
    '3': {
      title: 'How to Choose Quality Perfumes: A Buyer\'s Guide',
      image: 'https://readdy.ai/api/search-image?query=Person%20examining%20product%20quality%20checking%20labels%20and%20details%20in%20bright%20retail%20setting%20closeup%20hands%20inspecting%20merchandise%20professional%20photography%20clean%20background&width=1200&height=600&seq=blogpost3&orientation=landscape',
      category: 'Buying Guide',
      date: 'December 10, 2024',
      readTime: '7 min read',
      author: 'Kwame Mensah',
      content: `
        <p>In a market full of fragrance options, choosing the right perfume can be difficult. This guide helps you identify authentic, high-quality scents and buy with confidence.</p>

        <h2>Know the Concentration</h2>
        <p>Understand concentration levels before buying: EDP generally lasts longer than EDT, while parfum is often the most intense and premium.</p>

        <h2>Check Authenticity Signals</h2>
        <p>Use sellers that provide clear batch codes, original packaging photos, and transparent product details. Authentic retailers also maintain consistent pricing and support.</p>

        <h2>Read Scent Notes Carefully</h2>
        <p>Good listings should include top, heart, and base notes so you know how the fragrance evolves from first spray to dry-down.</p>

        <h2>Look for Trustworthy Product Pages</h2>
        <p>Reliable perfume stores provide clear descriptions, return terms, and real customer feedback:</p>
        <ul>
          <li>Detailed note breakdown and concentration</li>
          <li>Bottle size and usage guidance</li>
          <li>Expected longevity and projection profile</li>
          <li>Authenticity and sourcing transparency</li>
          <li>Multiple clear photos of bottle and box</li>
        </ul>

        <h2>The Power of Reviews</h2>
        <p>Customer reviews are invaluable. Look for:</p>
        <ul>
          <li>Verified purchase badges</li>
          <li>Detailed feedback with photos</li>
          <li>Recent reviews (product quality can change)</li>
          <li>How sellers respond to negative reviews</li>
          <li>Overall rating trends</li>
        </ul>

        <p>Be sceptical of products with only perfect 5-star reviews or very few reviews relative to sales.</p>

        <h2>Price vs. Value</h2>
        <p>Expensive does not always mean better scent, and cheap does not always mean fake. Consider:</p>
        <ul>
          <li><strong>Cost per wear:</strong> A long-lasting scent can be better value even at a slightly higher price</li>
          <li><strong>Performance:</strong> Longevity and projection should match your needs</li>
          <li><strong>Versatility:</strong> Day and night usability increases value</li>
          <li><strong>Authenticity confidence:</strong> Buy from stores with clear sourcing and support</li>
        </ul>

        <h2>Red Flags to Avoid</h2>
        <p>Watch out for these warning signs:</p>
        <ul>
          <li>Vague or missing product information</li>
          <li>No return policy or unclear terms</li>
          <li>Prices significantly below market average</li>
          <li>Poor website quality and numerous spelling errors</li>
          <li>Lack of contact information</li>
          <li>Pressure tactics urging immediate purchase</li>
          <li>No physical address or company details</li>
        </ul>

        <h2>Fragrance-Specific Tips</h2>

        <h3>Designer Perfumes</h3>
        <ul>
          <li>Check packaging quality and bottle finishing</li>
          <li>Verify consistency with known scent profile</li>
          <li>Start with trusted bestsellers if you are new</li>
          <li>Compare performance in your climate</li>
        </ul>

        <h3>Niche or Oud Fragrances</h3>
        <ul>
          <li>Test first if possible; profiles can be intense</li>
          <li>Use fewer sprays for stronger formulations</li>
          <li>Consider occasion and weather before purchase</li>
          <li>Layer with neutral musks for smoother wear</li>
        </ul>

        <h2>Making the Final Decision</h2>
        <p>Before clicking "buy," ask yourself:</p>
        <ol>
          <li>Do I need this product?</li>
          <li>Have I researched alternatives?</li>
          <li>Is this the right time to buy? (sales, seasons)</li>
          <li>Can I afford it without financial strain?</li>
          <li>Does it meet my quality standards?</li>
          <li>What's the return policy if I'm unsatisfied?</li>
        </ol>

        <h2>After Purchase</h2>
        <p>Protect your investment:</p>
        <ul>
          <li>Inspect items immediately upon delivery</li>
          <li>Keep packaging until you're certain you'll keep it</li>
          <li>Register warranties</li>
          <li>Follow care instructions</li>
          <li>Leave honest reviews to help other shoppers</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Choosing quality perfumes requires research, patience, and testing. Compare notes, check authentic sellers, and choose scents that match your lifestyle. The right fragrance gives better performance, confidence, and long-term value.</p>

        <p>Remember: the bitterness of poor quality lingers long after the sweetness of a low price is forgotten.</p>
      `
    }
  };

  const post = posts[id] || posts['1'];

  const relatedPosts = [
    {
      id: id === '1' ? '2' : '1',
      title: id === '1' ? 'Top 10 Perfumes to Add to Your Collection This Season' : 'How to Buy Authentic Perfumes Online in Ghana',
      image: id === '1' ?
        'https://readdy.ai/api/search-image?query=Beautiful%20modern%20African%20home%20interior%20with%20stylish%20furniture%20decor%20items%20plants%20bright%20natural%20lighting%20contemporary%20design%20magazine%20quality%20photography&width=600&height=400&seq=related1&orientation=landscape' :
        'https://readdy.ai/api/search-image?query=Modern%20African%20woman%20shopping%20online%20on%20laptop%20in%20bright%20contemporary%20home%20office%20coffee%20cup%20plants%20natural%20light%20relaxed%20lifestyle%20photography%20minimal%20clean%20background&width=600&height=400&seq=related2&orientation=landscape',
      category: id === '1' ? 'Fragrance Picks' : 'Shopping Tips'
    },
    {
      id: id === '3' ? '1' : '3',
      title: id === '3' ? 'The Ultimate Guide to Online Shopping in Ghana' : 'How to Choose Quality Products: A Buyer\'s Guide',
      image: id === '3' ?
        'https://readdy.ai/api/search-image?query=Modern%20African%20woman%20shopping%20online%20on%20laptop%20in%20bright%20contemporary%20home%20office%20coffee%20cup%20plants%20natural%20light%20relaxed%20lifestyle%20photography%20minimal%20clean%20background&width=600&height=400&seq=related3&orientation=landscape' :
        'https://readdy.ai/api/search-image?query=Person%20examining%20product%20quality%20checking%20labels%20and%20details%20in%20bright%20retail%20setting%20closeup%20hands%20inspecting%20merchandise%20professional%20photography%20clean%20background&width=600&height=400&seq=related4&orientation=landscape',
      category: id === '3' ? 'Shopping Tips' : 'Buying Guide'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-96 bg-gray-900">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              {post.category}
            </span>
            <h1 className="text-5xl font-bold text-white mb-6">{post.title}</h1>
            <div className="flex items-center justify-center gap-6 text-blue-100">
              <span className="flex items-center gap-2">
                <i className="ri-user-line"></i>
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <i className="ri-calendar-line"></i>
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <i className="ri-time-line"></i>
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="prose prose-lg max-w-none">
          <div
            className="text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.8'
            }}
          />
        </article>

        <div className="mt-12 pt-12 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-2">Written by</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-blue-700 text-xl"></i>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{post.author}</p>
                  <p className="text-sm text-gray-500">Content Writer</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-3">Share this article</p>
              <div className="flex gap-3">
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer">
                  <i className="ri-facebook-fill text-gray-600"></i>
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer">
                  <i className="ri-twitter-fill text-gray-600"></i>
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-gray-600"></i>
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer">
                  <i className="ri-whatsapp-line text-gray-600"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.id}`}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="relative h-48">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {relatedPost.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {relatedPost.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Enjoyed This Article?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Subscribe to our newsletter for more fragrance tips and exclusive offers
          </p>
          <form className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-blue-700 px-8 py-4 rounded-full font-medium hover:bg-blue-50 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-700 font-medium hover:gap-3 transition-all"
          >
            <i className="ri-arrow-left-line"></i>
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
