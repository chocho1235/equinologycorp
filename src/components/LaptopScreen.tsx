import React, { useState, useCallback } from 'react';

const LaptopScreen = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Normalize to -1 to 1 range and multiply by rotation factor
    const rotateX = (y - 0.5) * 20;
    const rotateY = (x - 0.5) * 20;
    
    setMousePosition({ x: rotateY, y: rotateX });
  }, []);

  return (
    <div 
      className="relative h-[500px] bg-black/20 rounded-lg overflow-hidden group z-50"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTAgMGg2MHY2MEgwVjB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`w-[600px] h-[400px] bg-gray-900 rounded-lg shadow-2xl overflow-hidden ${isHovering ? '' : 'transition-transform duration-500'}`}
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            willChange: 'transform',
          }}
        >
          {/* Laptop Screen Content */}
          <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-lg p-4">
            {/* Browser Controls */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            
            {/* Website Content */}
            <div className="space-y-4">
              {/* Navigation Bar */}
              <div className="h-8 bg-blue-500/20 rounded w-full flex items-center justify-between px-4">
                <div className="text-white text-sm font-medium">Equinology</div>
                <div className="flex space-x-4">
                  <div className="w-2 h-2 rounded-full bg-white/30"></div>
                  <div className="w-2 h-2 rounded-full bg-white/30"></div>
                  <div className="w-2 h-2 rounded-full bg-white/30"></div>
                </div>
              </div>
              
              {/* Reviews Section */}
              <div className="grid grid-cols-2 gap-4">
                {/* Customer Review 1 */}
                <div className="h-32 bg-blue-500/20 rounded flex flex-col justify-center items-center p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center mr-2">
                      <span className="text-white text-sm font-medium">JD</span>
                    </div>
                    <div className="text-white/80 text-sm font-medium mr-2">John D.</div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="text-white/80 text-sm text-center line-clamp-4">
                    "Delivered on time with exceptional attention to detail!"
                  </div>
                </div>

                {/* Customer Review 2 */}
                <div className="h-32 bg-blue-500/20 rounded flex flex-col justify-center items-center p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center mr-2">
                      <span className="text-white text-sm font-medium">SM</span>
                    </div>
                    <div className="text-white/80 text-sm font-medium mr-2">Sarah M.</div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="text-white/80 text-sm text-center line-clamp-4">
                    "Transformed our outdated site into a modern platform."
                  </div>
                </div>

                {/* Customer Review 3 */}
                <div className="h-32 bg-blue-500/20 rounded flex flex-col justify-center items-center p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center mr-2">
                      <span className="text-white text-sm font-medium">MR</span>
                    </div>
                    <div className="text-white/80 text-sm font-medium mr-2">Michael R.</div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="text-white/80 text-sm text-center line-clamp-4">
                    "Significantly boosted our online presence!"
                  </div>
                </div>

                {/* Customer Review 4 */}
                <div className="h-32 bg-blue-500/20 rounded flex flex-col justify-center items-center p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center mr-2">
                      <span className="text-white text-sm font-medium">AL</span>
                    </div>
                    <div className="text-white/80 text-sm font-medium mr-2">Alex L.</div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="text-white/80 text-sm text-center line-clamp-4">
                    "Outstanding service and incredible attention to detail!"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Laptop Base */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-4 bg-gray-800 rounded-t-lg"></div>
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-[60]" />
    </div>
  );
};

export default LaptopScreen; 