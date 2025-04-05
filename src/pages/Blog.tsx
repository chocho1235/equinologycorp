import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load blog posts from localStorage
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
    } else {
      // Default posts if no posts are saved
      const defaultPosts = [
        {
          id: 1,
          title: "The Future of AI in Business",
          excerpt: "Exploring how artificial intelligence is transforming modern business operations and creating new opportunities for growth.",
          date: "March 15, 2024",
          category: "Technology",
          readTime: "5 min read",
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000"
        },
        {
          id: 2,
          title: "Digital Transformation Strategies",
          excerpt: "Key insights into successful digital transformation initiatives and how companies can navigate the changing landscape.",
          date: "March 10, 2024",
          category: "Business",
          readTime: "4 min read",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000"
        },
        {
          id: 3,
          title: "Innovation in the Modern Workplace",
          excerpt: "How innovative technologies are reshaping the way we work and collaborate in the digital age.",
          date: "March 5, 2024",
          category: "Innovation",
          readTime: "6 min read",
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000"
        }
      ];
      setBlogPosts(defaultPosts);
      localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
    }
  }, []);

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

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <div className="mb-20">
            <div className="relative rounded-2xl overflow-hidden group">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title}
                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm mb-4">
                    {blogPosts[0].category}
                  </span>
                  <h2 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
                  <p className="text-gray-300 mb-4">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{blogPosts[0].date}</span>
                    <span className="text-gray-400">{blogPosts[0].readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
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

        {/* Newsletter Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest insights and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; 