import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Enterprise AI",
      excerpt: "Exploring how artificial intelligence is transforming enterprise solutions and what to expect in the coming years.",
      date: "March 15, 2024",
      category: "AI & Machine Learning",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Optimizing Neural Networks for Business",
      excerpt: "Best practices for implementing neural networks in enterprise environments and maximizing their potential.",
      date: "March 10, 2024",
      category: "Technology",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Data Security in the AI Era",
      excerpt: "Understanding the importance of data security when implementing AI solutions in your organization.",
      date: "March 5, 2024",
      category: "Security",
      readTime: "4 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-black text-white pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-blue-400 text-transparent bg-clip-text">
              Blog
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights, updates, and thought leadership on enterprise technology and AI solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              to={`/blog/${post.id}`}
              key={post.id}
              className="group bg-black/20 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-blue-400">{post.category}</span>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-400 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{post.date}</span>
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog; 