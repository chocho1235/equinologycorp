import { Link } from 'react-router-dom';

const FindOutMore = () => {
  const services = [
    {
      title: "AI-Powered Solutions",
      description: "Leverage cutting-edge artificial intelligence to transform your business operations and decision-making processes.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Enterprise Integration",
      description: "Seamlessly integrate our solutions with your existing enterprise systems and workflows.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Data Analytics",
      description: "Unlock valuable insights from your data with our advanced analytics platform.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const features = [
    {
      title: "Scalable Architecture",
      description: "Our solutions grow with your business, ensuring long-term success and adaptability."
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock technical support to ensure your operations run smoothly."
    },
    {
      title: "Security First",
      description: "Enterprise-grade security measures to protect your data and systems."
    },
    {
      title: "Custom Solutions",
      description: "Tailored implementations to meet your specific business requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-black text-white pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-blue-400 text-transparent bg-clip-text">
              Transform Your Business
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Discover how our enterprise solutions can revolutionize your operations and drive growth.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>

        {/* Services Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-black/20 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-black/20 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-black/20 backdrop-blur-sm border border-blue-500/20 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join the growing number of enterprises that have transformed their operations with our solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              Contact Us
            </Link>
            <Link
              to="/blog"
              className="border border-blue-500/20 text-white px-8 py-3 rounded-lg font-medium hover:border-blue-500/40 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindOutMore; 