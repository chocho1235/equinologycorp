import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  content?: string;
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Load blog posts from localStorage
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
    } else {
      // Default posts if no posts are saved
      const defaultPosts: BlogPost[] = [
        {
          id: '1',
          title: 'The Science Behind Equine Massage',
          excerpt: 'Discover how equine massage therapy can improve your horse\'s performance and well-being.',
          date: 'March 15, 2024',
          category: 'Equine Therapy',
          readTime: '5 min read',
          image: 'https://images.unsplash.com/photo-1511988617509-a57c1a1c0dde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          content: '<h2>The Science Behind Equine Massage</h2><p>Equine massage therapy is a powerful tool for improving your horse\'s performance and well-being. In this article, we explore the scientific principles behind this practice and its benefits.</p>'
        },
        {
          id: '2',
          title: 'Digital Transformation Strategies',
          excerpt: 'Key insights into successful digital transformation initiatives and how companies can navigate the changing landscape.',
          date: 'March 10, 2024',
          category: 'Business',
          readTime: '4 min read',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000'
        },
        {
          id: '3',
          title: 'Innovation in the Modern Workplace',
          excerpt: 'How innovative technologies are reshaping the way we work and collaborate in the digital age.',
          date: 'March 5, 2024',
          category: 'Innovation',
          readTime: '6 min read',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000'
        }
      ];
      setBlogPosts(defaultPosts);
      localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
    }
  }, []);

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptionStatus('success');
      setEmail('');
      setTimeout(() => setSubscriptionStatus('idle'), 3000);
    } catch (error) {
      setSubscriptionStatus('error');
      setTimeout(() => setSubscriptionStatus('idle'), 3000);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Our Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Insights, trends, and perspectives on technology, business, and innovation.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute right-4 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <Link to={`/blog/${filteredPosts[0].id}`} className="block mb-20 group">
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src={filteredPosts[0].image} 
                alt={filteredPosts[0].title}
                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm mb-4">
                    {filteredPosts[0].category}
                  </span>
                  <h2 className="text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-gray-300 mb-4">{filteredPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{filteredPosts[0].date}</span>
                    <span className="text-gray-400">{filteredPosts[0].readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <Link 
              to={`/blog/${post.id}`} 
              key={post.id}
              className="group"
            >
              <div className="bg-gray-900/50 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-900/70">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">No articles found</h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest insights and updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit"
                disabled={isSubscribing}
                className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium transition-opacity ${
                  isSubscribing ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {subscriptionStatus === 'success' && (
              <p className="mt-4 text-green-400">Successfully subscribed!</p>
            )}
            {subscriptionStatus === 'error' && (
              <p className="mt-4 text-red-400">Something went wrong. Please try again.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; 