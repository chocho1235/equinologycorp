import { useRef, useEffect, useState } from 'react';

const InteractiveFooter = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverLink, setHoverLink] = useState<string | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!footerRef.current) return;
      
      const rect = footerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    const footer = footerRef.current;
    if (footer) {
      footer.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (footer) {
        footer.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 text-center text-white text-4xl font-bold py-32 pointer-events-none bg-gradient-to-b from-transparent to-black/90">
        Enterprise AI Solutions
        <br />
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Powered by Machine Learning
        </span>
        <div className="text-sm mt-6 opacity-70 font-normal">Transforming data into enterprise value</div>
      </div>
      
      <footer 
        ref={footerRef}
        className="relative bg-black text-white px-10 py-20 overflow-hidden group"
      >
        {/* SVG Drawing Effect - Enhanced */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
          viewBox="0 0 800 400" 
          preserveAspectRatio="none"
        >
          {/* Grid pattern */}
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path 
              d="M 40 0 L 0 0 0 40" 
              fill="none" 
              className="stroke-blue-500/10 stroke-[0.5]"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Animated lines */}
          <path 
            d="M0,100 Q200,150 400,100 T800,100" 
            className="stroke-blue-500/20 stroke-2 fill-none [stroke-dasharray:800] [stroke-dashoffset:800] group-hover:[stroke-dashoffset:0] transition-[stroke-dashoffset] duration-1000 ease-out"
          />
          <path 
            d="M0,200 Q200,250 400,200 T800,200" 
            className="stroke-purple-500/20 stroke-2 fill-none [stroke-dasharray:800] [stroke-dashoffset:800] group-hover:[stroke-dashoffset:0] transition-[stroke-dashoffset] duration-1000 ease-out delay-100"
          />
          <path 
            d="M0,300 Q200,350 400,300 T800,300" 
            className="stroke-blue-400/20 stroke-2 fill-none [stroke-dasharray:800] [stroke-dashoffset:800] group-hover:[stroke-dashoffset:0] transition-[stroke-dashoffset] duration-1000 ease-out delay-200"
          />
          
          {/* Reactive circle that follows cursor */}
          <circle 
            cx={mousePosition.x} 
            cy={mousePosition.y} 
            r="80" 
            className="fill-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ filter: 'blur(40px)' }}
          />
        </svg>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floatParticle ${3 + Math.random() * 5}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="grid md:grid-cols-4 gap-12 text-sm">
            {/* Solutions */}
            <div className="transition-transform duration-500 group-hover:translate-y-0 translate-y-4">
              <h3 className="font-bold text-lg mb-4 text-blue-400 relative group/title">
                Enterprise Solutions
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover/title:w-full"></span>
              </h3>
              <ul className="space-y-2">
                {["Machine Learning", "Big Data Analytics", "Cloud Infrastructure", "AI Consulting"].map((item) => (
                  <li key={item} className="transform transition-transform duration-300 hover:translate-x-1">
                    <a 
                      href="#" 
                      className="hover:text-blue-400 transition-colors inline-block"
                      onMouseEnter={() => setHoverLink(item)}
                      onMouseLeave={() => setHoverLink(null)}
                    >
                      {item}
                      {hoverLink === item && (
                        <span className="absolute h-px bg-gradient-to-r from-blue-500 to-transparent w-12 -ml-1 mt-6"></span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="transition-transform duration-500 delay-100 group-hover:translate-y-0 translate-y-4">
              <h3 className="font-bold text-lg mb-4 text-blue-400 relative group/title">
                Resources
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover/title:w-full"></span>
              </h3>
              <ul className="space-y-2">
                {["Documentation", "API Reference", "Case Studies", "White Papers"].map((item) => (
                  <li key={item} className="transform transition-transform duration-300 hover:translate-x-1">
                    <a 
                      href="#" 
                      className="hover:text-blue-400 transition-colors inline-block"
                      onMouseEnter={() => setHoverLink(item)}
                      onMouseLeave={() => setHoverLink(null)}
                    >
                      {item}
                      {hoverLink === item && (
                        <span className="absolute h-px bg-gradient-to-r from-blue-500 to-transparent w-12 -ml-1 mt-6"></span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="transition-transform duration-500 delay-200 group-hover:translate-y-0 translate-y-4">
              <h3 className="font-bold text-lg mb-4 text-blue-400 relative group/title">
                Company
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover/title:w-full"></span>
              </h3>
              <ul className="space-y-2">
                {["About Us", "Careers", "Partners", "Contact"].map((item) => (
                  <li key={item} className="transform transition-transform duration-300 hover:translate-x-1">
                    <a 
                      href="#" 
                      className="hover:text-blue-400 transition-colors inline-block"
                      onMouseEnter={() => setHoverLink(item)}
                      onMouseLeave={() => setHoverLink(null)}
                    >
                      {item}
                      {hoverLink === item && (
                        <span className="absolute h-px bg-gradient-to-r from-blue-500 to-transparent w-12 -ml-1 mt-6"></span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="transition-transform duration-500 delay-300 group-hover:translate-y-0 translate-y-4">
              <h3 className="font-bold text-lg mb-4 text-blue-400 relative group/title">
                Stay Updated
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover/title:w-full"></span>
              </h3>
              <p className="mb-4 text-gray-400">Get the latest updates on AI and machine learning.</p>
              <form className="space-y-2">
                <div className="relative overflow-hidden rounded">
                  <input 
                    type="email" 
                    placeholder="Enter your work email" 
                    className="w-full bg-white/5 border border-blue-500/20 rounded px-4 py-2 outline-none focus:border-blue-500 transition-colors relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-2 rounded font-medium relative overflow-hidden group/btn"
                >
                  <span className="relative z-10">Subscribe to Newsletter</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8 text-xs flex justify-between flex-wrap gap-4 text-gray-400">
            <div className="flex items-center space-x-4">
              <span>© 2024 Enterprise AI. All rights reserved.</span>
              <a href="#" className="hover:text-blue-400 transition-colors relative group/link">
                Privacy
                <span className="absolute left-0 right-0 bottom-0 h-px bg-blue-400/50 scale-x-0 group-hover/link:scale-x-100 transition-transform origin-right group-hover/link:origin-left duration-300"></span>
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors relative group/link">
                Terms
                <span className="absolute left-0 right-0 bottom-0 h-px bg-blue-400/50 scale-x-0 group-hover/link:scale-x-100 transition-transform origin-right group-hover/link:origin-left duration-300"></span>
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors relative group/link">
                Security
                <span className="absolute left-0 right-0 bottom-0 h-px bg-blue-400/50 scale-x-0 group-hover/link:scale-x-100 transition-transform origin-right group-hover/link:origin-left duration-300"></span>
              </a>
            </div>
            <div className="flex space-x-6">
              {["LinkedIn", "Twitter", "GitHub"].map(platform => (
                <a 
                  key={platform}
                  href="#" 
                  className="hover:text-blue-400 transition-colors relative group/icon"
                >
                  {platform}
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-blue-400/50 scale-x-0 group-hover/icon:scale-x-100 transition-transform duration-300"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Status Bar - More technical metrics with animations */}
      <div className="bg-[#0a0a0a] text-xs text-gray-500 px-10 py-2 flex justify-between items-center border-t border-white/5 relative overflow-hidden group">
        {/* Animated data line */}
        <div className="absolute inset-0 h-px w-full">
          <div className="absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent w-40 -translate-x-40 group-hover:translate-x-full transition-transform duration-2000 ease-in-out" />
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 group/status">
            <span className="w-2 h-2 bg-green-500 rounded-full group-hover/status:animate-ping"></span>
            <span>All Systems Operational</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>GPU Clusters: 24/24</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Avg. Response Time: 42ms</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Model Accuracy: 99.98%</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 group/processing">
          <span className="w-2 h-2 bg-blue-500 rounded-full relative">
            <span className="absolute inset-0 bg-blue-500 rounded-full animate-ping"></span>
          </span>
          <span className="group-hover/processing:text-blue-400 transition-colors">Real-time Processing</span>
        </div>
      </div>
      
      {/* Animation keyframes */}
      <style>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          75% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveFooter; 