import React from 'react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-black text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-blue-500 to-blue-400 text-transparent bg-clip-text">
            Portfolio
          </span>
        </h1>
        
        <p className="text-xl text-gray-400 mb-12 text-center max-w-3xl mx-auto">
          Explore our portfolio of successful projects and see how we've helped businesses transform with cutting-edge technology solutions.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Cards */}
          {[
            {
              title: "Enterprise AI Platform",
              description: "Built a scalable AI platform for enterprise data analysis and predictive modeling.",
              image: "🤖",
              technologies: ["Machine Learning", "Big Data", "Cloud Computing"]
            },
            {
              title: "E-commerce Solution",
              description: "Developed a high-performance e-commerce platform with real-time inventory management.",
              image: "🛒",
              technologies: ["React", "Node.js", "MongoDB"]
            },
            {
              title: "Healthcare Analytics",
              description: "Created an advanced analytics system for healthcare data processing and visualization.",
              image: "🏥",
              technologies: ["Data Science", "Python", "Tableau"]
            },
            {
              title: "Financial Services App",
              description: "Built a secure financial services application with real-time transaction processing.",
              image: "💰",
              technologies: ["Blockchain", "React Native", "AWS"]
            },
            {
              title: "Smart Manufacturing",
              description: "Implemented IoT solutions for smart manufacturing and process optimization.",
              image: "🏭",
              technologies: ["IoT", "Edge Computing", "Python"]
            },
            {
              title: "Digital Marketing Platform",
              description: "Developed an AI-powered digital marketing platform with automated campaign management.",
              image: "📊",
              technologies: ["AI", "Marketing Automation", "Analytics"]
            }
          ].map((project, index) => (
            <div 
              key={index}
              className="bg-black/20 rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="text-4xl mb-4">{project.image}</div>
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-400 mb-8">Let's discuss how we can help transform your business with technology.</p>
          <Link 
            to="/contact" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Portfolio; 