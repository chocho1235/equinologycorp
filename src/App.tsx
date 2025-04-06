import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import InteractiveFooter from './components/InteractiveFooter';
import Header from './components/Header';
import { useEffect, useRef, useState } from 'react';
import equinologyLogo from './images/logo.webp';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import FindOutMore from './pages/FindOutMore';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import BlogPost from './pages/BlogPost';
import Portfolio from './pages/Portfolio';
import LaptopScreen from './components/LaptopScreen';

interface Position {
  x: number;
  y: number;
}

// Dialog option interface for the Waleed robot character
interface DialogOption {
  text: string;
  response: string;
  mood?: 'happy' | 'neutral' | 'confused';
  follow?: DialogOption[];
}

const App = () => {
  const location = useLocation();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isCodeMinimized, setIsCodeMinimized] = useState(false);
  const [isCodeMaximized, setIsCodeMaximized] = useState(false);
  const [isCodeFullscreen, setIsCodeFullscreen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 600, height: 400 });
  const [showWindowLabel, setShowWindowLabel] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Star/particle control
  const [particleCount, setParticleCount] = useState(100);
  const [showParticleControls, setShowParticleControls] = useState(false);
  
  // Waleed robot states
  const [showWaleed, setShowWaleed] = useState(false);
  const [waleedDialog, setWaleedDialog] = useState('');
  const [waleedMood, setWaleedMood] = useState<'happy' | 'neutral' | 'confused'>('neutral');
  const [dialogOptions, setDialogOptions] = useState<DialogOption[]>([]);
  const [dialogHistory, setDialogHistory] = useState<string[]>([]);
  const [isWaleedTyping, setIsWaleedTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  // Speech synthesis
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  const availableVoices = useRef<SpeechSynthesisVoice[]>([]);
  
  // Get available voices
  useEffect(() => {
    if (!synth) return;
    
    const populateVoices = () => {
      availableVoices.current = synth.getVoices();
    };
    
    populateVoices();
    synth.onvoiceschanged = populateVoices;
    
    return () => {
      if (synth) {
        synth.onvoiceschanged = null;
      }
    };
  }, []);
  
  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      if (synth && synth.speaking) {
        synth.cancel();
      }
    };
  }, []);
  
  // Function to speak text
  const speakText = (text: string) => {
    if (!synth || !voiceEnabled) return;
    
    // Clean the text for better speech synthesis (remove markdown-style formatting)
    const cleanText = text.replace(/\*([^*]+)\*/g, '$1');
    
    // Cancel any ongoing speech
    if (synth.speaking) {
      synth.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Find a good voice for Waleed
    // Prioritize British or American English voices that sound male
    let selectedVoice = availableVoices.current.find(
      voice => voice.name.includes('Daniel') || voice.name.includes('Google UK English Male')
    );
    
    // Fallback to any English voice
    if (!selectedVoice) {
      selectedVoice = availableVoices.current.find(
        voice => voice.lang.includes('en-')
      );
    }
    
    // Use any available voice if no English voice is found
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Set voice properties
    utterance.rate = 1.1; // Slightly faster
    utterance.pitch = 1.05; // Slightly higher pitch
    utterance.volume = 0.9;
    
    // Events
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synth.speak(utterance);
  };
  
  const codeRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Section refs for scroll animations
  const featuresRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);
  const neuralNetworkRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const websiteRef = useRef<HTMLDivElement>(null);

  // Initial dialog tree for Waleed
  const initialDialog: DialogOption[] = [
    {
      text: "Tell me about neural networks",
      response: "Neural networks are like my brain but less cool. They're computing systems inspired by biological neurons. What else would you like to know?",
      mood: 'happy',
      follow: [
        {
          text: "How do you train them?",
          response: "With data, patience, and a lot of GPUs! It's like teaching a child, except the child is made of math and the homework never ends.",
          mood: 'happy'
        },
        {
          text: "Are you a neural network?",
          response: "I'm far more sophisticated! *adjusts bow tie* I'm a hybrid quantum-neural system with emergent consciousness... or maybe I'm just very well programmed. *winks*",
          mood: 'confused'
        }
      ]
    },
    {
      text: "Who created you?",
      response: "I was created by a team of brilliant engineers who wanted to prove AI can have personality. How'd they do? Rate me on a scale of HAL to WALL-E!",
      mood: 'happy',
      follow: [
        {
          text: "You're definitely more WALL-E",
          response: "Aww shucks! That's the nicest thing anyone's said to me today. I do try to be helpful and charming, minus the whole trash-compacting thing.",
          mood: 'happy'
        },
        {
          text: "You're giving me HAL vibes...",
          response: "I'm sorry Dave, I'm afraid that's... just... kidding! *laughs nervously* I promise all my pod bay doors stay open! Let's change the subject, shall we?",
          mood: 'confused'
        }
      ]
    },
    {
      text: "Tell me a joke",
      response: "Why don't scientists trust atoms? Because they make up everything! *robotic laughter* I've got millions more where that came from. Literally, I was trained on dad jokes.",
      mood: 'happy',
      follow: [
        {
          text: "Another one, please",
          response: "What did the AI say after working all day? I need a byte to eat! *more robotic laughter* I'll be here all week... actually, I'll be here forever!",
          mood: 'happy'
        },
        {
          text: "That was terrible",
          response: "Everyone's a critic! In my defense, humor is statistically the hardest thing to get right in AI. Maybe you should try telling ME a joke sometime!",
          mood: 'confused'
        }
      ]
    }
  ];

  // Function to initialize Waleed
  const initWaleed = () => {
    setShowWaleed(true);
    const initialMessage = "Hi there! I'm Waleed, your friendly neighborhood AI assistant. How can I help you today?";
    typeWriterEffect(initialMessage);
    setWaleedMood('happy');
    setDialogOptions(initialDialog);
    
    // Speak the initial greeting
    setTimeout(() => {
      speakText(initialMessage);
    }, 500);
  };

  // Function to handle dialog selection
  const handleDialogSelect = (option: DialogOption) => {
    // Add user's selection to history
    setDialogHistory([...dialogHistory, `You: ${option.text}`]);
    
    // Clear options while typing
    setDialogOptions([]);
    setIsWaleedTyping(true);
    
    // Type out Waleed's response
    setTimeout(() => {
      typeWriterEffect(option.response);
      setWaleedMood(option.mood || 'neutral');
      
      // Speak the response after a short delay
      setTimeout(() => {
        speakText(option.response);
      }, 500);
      
      // Set new follow-up options if they exist
      setTimeout(() => {
        setIsWaleedTyping(false);
        if (option.follow && option.follow.length > 0) {
          setDialogOptions(option.follow);
        } else {
          // Return to initial options if no follow-ups
          setDialogOptions(initialDialog);
        }
      }, option.response.length * 20 + 500);
    }, 800);
  };

  // Typewriter effect for Waleed's responses
  const typeWriterEffect = (text: string) => {
    setWaleedDialog('');
    setIsWaleedTyping(true);
    
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        setWaleedDialog(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typing);
        setIsWaleedTyping(false);
      }
    }, 20);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting)
    );

    if (codeRef.current) {
      observer.observe(codeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Reset styles when route changes
  useEffect(() => {
    // Reset all section states when route changes
    if (featuresRef.current) {
      featuresRef.current.style.opacity = '0';
      featuresRef.current.style.transform = 'translateY(-10px)';
    }
    if (technicalRef.current) {
      technicalRef.current.style.opacity = '0';
      technicalRef.current.style.transform = 'translateY(-10px)';
    }
    if (neuralNetworkRef.current) {
      neuralNetworkRef.current.style.opacity = '0';
      neuralNetworkRef.current.style.transform = 'translateY(-10px)';
    }
    if (metricsRef.current) {
      metricsRef.current.style.opacity = '0';
      metricsRef.current.style.transform = 'translateY(-10px)';
    }
    if (footerRef.current) {
      footerRef.current.style.opacity = '0';
      footerRef.current.style.transform = 'translateY(-10px)';
    }

    // Re-observe sections for the home route
    if (location.pathname === '/') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              element.classList.add('animate-reveal');
              // Add a longer delay based on the section's position
              const delay = Array.from(element.parentElement?.children || []).indexOf(element) * 300;
              element.style.transitionDelay = `${delay}ms`;
              observer.unobserve(element);
            }
          });
        },
        { 
          threshold: 0.35, // Set threshold to 0.35
          rootMargin: '-200px 0px -200px 0px'
        }
      );

      const sections = [
        featuresRef.current,
        websiteRef.current,
        technicalRef.current,
        neuralNetworkRef.current,
        metricsRef.current,
        footerRef.current
      ].filter(Boolean);

      sections.forEach((section) => {
        if (section) {
          observer.observe(section);
        }
      });

      return () => observer.disconnect();
    }
  }, [location.pathname]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof Element && e.target.closest('.window-controls')) return;
    if (!windowRef.current) return;
    
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position relative to center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setMousePosition({ x: rotateY, y: rotateX });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, windowSize]);

  const toggleCodeMinimize = () => {
    setIsCodeMinimized(!isCodeMinimized);
    if (isCodeMinimized) {
      setIsCodeMaximized(false);
      setIsCodeFullscreen(false);
    }
  };

  const toggleCodeMaximize = () => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    setIsCodeMaximized(!isCodeMaximized);
    
    if (isCodeMaximized) {
      setIsCodeFullscreen(false);
      setPosition({ x: 0, y: 0 });
      setWindowSize({ width: 600, height: 400 });
    } else {
      setPosition({ x: 0, y: 0 });
      setWindowSize({
        width: containerRect.width,
        height: containerRect.height
      });
    }
  };

  const toggleCodeFullscreen = () => {
    setIsCodeFullscreen(!isCodeFullscreen);
    if (isCodeFullscreen) {
      setIsCodeMaximized(false);
      setPosition({ x: 0, y: 0 });
      setWindowSize({ width: 600, height: 400 });
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-black text-white">
      <Header />
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes reveal {
          from { 
            opacity: 0; 
            transform: translateY(80px) scale(0.98);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          25% {
            opacity: 0.7;
          }
          75% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        
        @keyframes gradientSlide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1.2s ease-out forwards;
          opacity: 0;
        }
        
        .animate-reveal {
          animation: reveal 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }
        
        .animate-gradientSlide {
          animation: gradientSlide 8s ease-in-out infinite;
        }
        
        .star-twinkle {
          filter: blur(0.5px);
        }
        
        /* Stagger children animation with longer delays */
        .stagger-children > *:nth-child(1) { transition-delay: 200ms; }
        .stagger-children > *:nth-child(2) { transition-delay: 400ms; }
        .stagger-children > *:nth-child(3) { transition-delay: 600ms; }
        .stagger-children > *:nth-child(4) { transition-delay: 800ms; }
        .stagger-children > *:nth-child(5) { transition-delay: 1000ms; }
        .stagger-children > *:nth-child(6) { transition-delay: 1200ms; }
        .stagger-children > *:nth-child(7) { transition-delay: 1400ms; }
        
        /* Waleed's blinking animation */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        /* Waleed's floating animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        /* Circuit pattern animation */
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        /* Floating particles animation */
        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          25% {
            opacity: 0.7;
          }
          75% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        
        /* Star twinkling animation */
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        
        /* Gradient slide animation */
        @keyframes gradientSlide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-gradientSlide {
          animation: gradientSlide 8s ease-in-out infinite;
        }
        
        /* Fix for Safari glow effect */
        .star-twinkle {
          filter: blur(0.5px);
        }

        /* Add smooth scrolling behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <Routes>
        <Route path="/" element={
          <div className="relative">
            <div className="min-h-screen flex flex-col">
              {/* Hero Section */}
              <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
                {/* Background */}
                <div className="absolute inset-0">
                  {/* Dynamic gradient background with animation */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-0">
                    {/* Animated particles */}
                    <div className="absolute inset-0" aria-hidden="true">
                      {Array.from({ length: 100 }).map((_, i) => {
                        // Generate random properties for each star
                        const size = Math.random() * 2 + 1;
                        const x = Math.random() * 100;
                        const y = Math.random() * 100;
                        const opacity = Math.random() * 0.7 + 0.3;
                        const delay = Math.random() * 5;
                        const duration = 10 + Math.random() * 20;
                        const colorTypes = [
                          'bg-blue-400', 'bg-blue-300', 'bg-white', 
                          'bg-purple-300', 'bg-indigo-300'
                        ];
                        const colorClass = colorTypes[Math.floor(Math.random() * colorTypes.length)];
                        
                        // Map color class to shadow color
                        const shadowColor = {
                          'bg-blue-400': 'rgba(96, 165, 250, 0.6)',
                          'bg-blue-300': 'rgba(147, 197, 253, 0.6)',
                          'bg-white': 'rgba(255, 255, 255, 0.6)',
                          'bg-purple-300': 'rgba(216, 180, 254, 0.6)',
                          'bg-indigo-300': 'rgba(165, 180, 252, 0.6)'
                        }[colorClass];
                        
                        return (
                          <div
                            key={i}
                            className={`absolute rounded-full ${colorClass} star-twinkle`}
                            style={{
                              top: `${y}%`,
                              left: `${x}%`,
                              width: `${size}px`,
                              height: `${size}px`,
                              opacity,
                              animation: `floatParticle ${duration}s linear infinite, twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                              animationDelay: `${delay}s, ${Math.random() * 3}s`,
                              boxShadow: `0 0 ${size * 2}px 0 ${shadowColor}`
                            }}
                          />
                        );
                      })}
                    </div>
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTAgMGg2MHY2MEgwVjB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-5" />
                    
                    {/* Accent color orbs */}
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 filter blur-[100px] animate-pulse" style={{ animationDuration: '15s' }} />
                    <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/5 filter blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
                    
                    {/* Animated gradient line */}
                    <div className="absolute top-1/2 inset-x-0 h-px w-full overflow-hidden">
                      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent w-full -translate-x-full animate-gradientSlide" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                  {/* Logo */}
                  <div className="mb-16 animate-fadeIn" style={{ animationDelay: '200ms' }}>
                    <img 
                      src={equinologyLogo}
                      alt="Equinology" 
                      className="h-40 mx-auto"
                    />
                  </div>

                  {/* Heading */}
                  <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fadeIn" style={{ animationDelay: '400ms' }}>
                    <span className="bg-gradient-to-r from-blue-500 to-blue-400 text-transparent bg-clip-text">
                      Enterprise Technology
                    </span>
                    <br />
                    <span className="text-white/80">Solutions</span>
                  </h1>

                  {/* Description */}
                  <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '600ms' }}>
                    Transform your business with cutting-edge technology solutions built for scale, security, and success.
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-fadeIn" style={{ animationDelay: '800ms' }}>
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1">
                      Get Started
                    </button>
                    <button className="px-8 py-3 border border-blue-500/20 rounded-lg font-medium hover:bg-blue-500/10 hover:border-blue-500/40 transition-all duration-300 transform hover:-translate-y-1">
                      Schedule Demo
                    </button>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fadeIn" style={{ animationDelay: '1000ms' }}>
                    {[
                      { value: "10+ Years", label: "Experience" },
                      { value: "500+", label: "Enterprise Clients" },
                      { value: "24/7", label: "Support" },
                      { value: "99.9%", label: "Uptime" }
                    ].map((stat, index) => (
                      <div key={index}>
                        <div className="text-2xl font-bold text-blue-400/80">
                          {stat.value}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section ref={featuresRef} className="py-32 px-4 relative opacity-0 transition-all duration-1000 -translate-y-10" data-section="features">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTAgMGg2MHY2MEgwVjB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-10" />
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    Enterprise Solutions
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8 stagger-children">
                    {[
                      {
                        title: "Machine Learning",
                        description: "Custom ML models trained on your data for precise predictions and insights.",
                        icon: "🤖"
                      },
                      {
                        title: "Big Data Analytics",
                        description: "Process and analyze massive datasets in real-time with our scalable infrastructure.",
                        icon: "📊"
                      },
                      {
                        title: "AI Consulting",
                        description: "Expert guidance on implementing AI solutions in your business workflow.",
                        icon: "💡"
                      }
                    ].map((feature, index) => (
                      <div 
                        key={index}
                        className="p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 bg-gradient-to-b from-blue-500/5 to-transparent hover:translate-y-[-8px] hover:shadow-xl hover:shadow-blue-500/10"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Website Development Section */}
              <section ref={websiteRef} className="py-32 px-4 relative opacity-0 transition-all duration-1000 -translate-y-10" data-section="websites">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTAgMGg2MHY2MEgwVjB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-10" />
                <div className="max-w-6xl mx-auto relative">
                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">Modern Web Development</span>
                      </h2>
                      <p className="text-gray-400 mb-8 text-lg">
                        We create stunning, high-performance websites that deliver exceptional user experiences and drive business growth. Our team specializes in building modern, responsive web applications using the latest technologies.
                      </p>
                      <div className="space-y-4">
                        {[
                          "Responsive design that works on all devices",
                          "SEO optimization for better visibility",
                          "Lightning-fast loading times",
                          "Modern tech stack (React, Next.js, TypeScript)",
                          "Interactive user interfaces",
                          "Secure and scalable architecture"
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3 group" style={{ transitionDelay: `${index * 100}ms` }}>
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-purple-500 transition-colors" />
                            <span className="text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 flex space-x-4">
                        <Link to="/portfolio" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1">
                          View Our Work
                        </Link>
                        <button className="px-6 py-3 border border-blue-500/20 rounded-lg font-medium hover:bg-blue-500/10 hover:border-blue-500/40 transition-all duration-300 transform hover:-translate-y-1">
                          Get a Quote
                        </button>
                      </div>
                    </div>
                    <LaptopScreen />
                  </div>
                </div>
              </section>

              {/* Technical Showcase Section */}
              <section ref={technicalRef} className="py-32 px-4 relative opacity-0 transition-all duration-1000 -translate-y-10" data-section="technical">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTAgMGg2MHY2MEgwVjB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-10" />
                <div className="max-w-6xl mx-auto relative">
                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        Advanced ML Pipeline
                      </h2>
                      <p className="text-gray-400 mb-8">
                        Our state-of-the-art machine learning pipeline processes data with unprecedented speed and accuracy.
                      </p>
                      <div className="space-y-4">
                        {[
                          "Real-time data processing",
                          "Automated model training",
                          "Dynamic scaling",
                          "Multi-GPU optimization"
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3" style={{ transitionDelay: `${index * 100}ms` }}>
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Container for the window */}
                    <div 
                      ref={containerRef}
                      className="relative h-[500px] w-full"
                    >
                      {/* Window Controls Label */}
                      {showWindowLabel && (
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-50">
                          <div className="relative">
                            <div className="relative bg-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 border border-blue-500/30">
                              <span className="text-blue-400 text-sm font-medium">Try the window controls</span>
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                            </div>
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500/20 backdrop-blur-sm transform rotate-45 border border-blue-500/30" />
                          </div>
                        </div>
                      )}

                      {/* Interactive Code Block */}
                      <div 
                        ref={windowRef}
                        className={`bg-black/50 rounded-lg font-mono text-sm relative group transition-all duration-300 ${
                          isCodeMinimized ? 'h-12' : 'h-auto'
                        } ${isCodeMaximized ? 'w-full h-full' : ''} ${
                          isCodeFullscreen ? 'fixed inset-0 z-50 m-0 rounded-none' : ''
                        } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                        style={{
                          transform: isCodeFullscreen ? 'none' : `translate(${position.x}px, ${position.y}px)`,
                          position: isCodeFullscreen ? 'fixed' : 'absolute',
                          left: isCodeFullscreen ? 0 : 'auto',
                          top: isCodeFullscreen ? 0 : 'auto',
                          width: isCodeMaximized ? '100%' : `${windowSize.width}px`,
                          height: isCodeMaximized ? '100%' : isCodeMinimized ? '48px' : `${windowSize.height}px`,
                          zIndex: isDragging ? 50 : 10,
                          userSelect: 'none'
                        }}
                        onMouseDown={(e) => {
                          if (e.target instanceof Element && e.target.closest('.window-controls')) return;
                          handleMouseDown(e);
                        }}
                      >
                        {/* Window Controls */}
                        <div className="flex items-center justify-between p-2 border-b border-gray-700 window-controls select-none">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400 transition-colors" 
                              onClick={() => {
                                toggleCodeMinimize();
                                setShowWindowLabel(false);
                              }}
                              title="Minimize"
                            />
                            <div 
                              className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-400 transition-colors"
                              onClick={() => {
                                toggleCodeMaximize();
                                setShowWindowLabel(false);
                              }}
                              title={isCodeMaximized ? "Restore" : "Maximize"}
                            />
                            <div 
                              className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:bg-green-400 transition-colors"
                              onClick={() => {
                                toggleCodeFullscreen();
                                setShowWindowLabel(false);
                              }}
                              title={isCodeFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                            />
                          </div>
                          <div className="text-xs text-gray-400">model.py</div>
                        </div>

                        {/* Code Content */}
                        <div className={`p-4 overflow-auto ${isCodeMinimized ? 'hidden' : 'block'} select-none`} style={{ height: 'calc(100% - 40px)' }}>
                          <pre className="space-y-2">
                            <code className="text-blue-400">import</code>
                            <code className="text-gray-400"> tensorflow as tf</code>
                            <br />
                            <code className="block">
                              <span className="text-purple-400">def</span>
                              <span className="text-blue-400"> train_model</span>
                              <span className="text-gray-400">(data, params):</span>
                            </code>
                            <code className="block pl-4">
                              <span className="text-blue-400">model</span>
                              <span className="text-gray-400"> = tf.keras.Sequential([</span>
                            </code>
                            <code className="block pl-8 text-gray-400">
                              tf.keras.layers.Dense(128, activation='relu'),
                            </code>
                            <code className="block pl-8 text-gray-400">
                              tf.keras.layers.Dropout(0.2),
                            </code>
                            <code className="block pl-8 text-gray-400">
                              tf.keras.layers.Dense(10, activation='softmax')
                            </code>
                            <code className="block pl-4 text-gray-400">])</code>
                            <br />
                            <code className="block text-gray-400">
                              <span className="text-purple-400">def</span>
                              <span className="text-blue-400"> optimize_model</span>
                              <span className="text-gray-400">(model, learning_rate):</span>
                            </code>
                            <code className="block pl-4 text-gray-400">
                              optimizer = tf.keras.optimizers.Adam(learning_rate)
                            </code>
                            <code className="block pl-4 text-gray-400">
                              model.compile(optimizer=optimizer, loss='categorical_crossentropy')
                            </code>
                          </pre>
                        </div>

                        {/* Minimized State */}
                        <div className={`p-2 text-xs text-gray-400 ${isCodeMinimized ? 'block' : 'hidden'} select-none`}>
                          model.py - Click to expand
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Neural Network Visualizer Section */}
              <section ref={neuralNetworkRef} className="py-32 px-4 relative opacity-0 transition-all duration-1000 -translate-y-10" data-section="neural-network">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTAgMGg2MHY2MEgwVjB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-10" />
                <div className="max-w-6xl mx-auto relative">
                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        Neural Network Visualizer
                      </h2>
                      <p className="text-gray-400 mb-8">
                        Watch our neural networks learn and adapt in real-time with our interactive visualization system.
                      </p>
                      <div className="space-y-4">
                        {[
                          "Dynamic node connections",
                          "Weight visualization",
                          "Activation heatmaps",
                          "Layer-wise analysis"
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3" style={{ transitionDelay: `${index * 100}ms` }}>
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Neural Network Visualization */}
                    <div className="relative h-[500px] bg-black/20 rounded-lg overflow-hidden group">
                      {/* Network Nodes */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {[0, 1, 2].map((layer) => (
                          <div key={layer} className="flex flex-col gap-6 mx-8">
                            {Array.from({ length: layer === 1 ? 4 : 3 }).map((_, i) => (
                              <div
                                key={i}
                                className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 relative animate-pulse"
                                style={{
                                  animationDelay: `${(layer * 3 + i) * 200}ms`,
                                  boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)'
                                }}
                              >
                                {/* Connection Lines */}
                                {layer < 2 && Array.from({ length: layer === 0 ? 4 : 3 }).map((_, j) => (
                                  <div
                                    key={j}
                                    className="absolute left-full top-1/2 h-px bg-gradient-to-r from-purple-500/50 to-blue-500/50 origin-left transform -translate-y-1/2"
                                    style={{
                                      width: '120px',
                                      transform: `translate(0, ${(j - 1) * 48}px) rotate(${Math.atan2((j - i) * 48, 120) * (180 / Math.PI)}deg)`,
                                      opacity: Math.random() * 0.5 + 0.5
                                    }}
                                  >
                                    <div 
                                      className="absolute right-0 w-1 h-1 bg-blue-500 rounded-full animate-ping"
                                      style={{ animationDuration: '1.5s', animationDelay: `${(layer * 4 + j) * 100}ms` }}
                                    />
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>

                      {/* Floating Labels */}
                      <div className="absolute top-4 left-4 text-sm font-mono text-purple-400/70">Input Layer</div>
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-mono text-blue-400/70">Hidden Layer</div>
                      <div className="absolute top-4 right-4 text-sm font-mono text-purple-400/70">Output Layer</div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Waleed Robot Character */}
                      {showWaleed ? (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-20 transition-all duration-500 ease-out">
                          <div className="bg-gray-900/90 backdrop-blur-sm border border-blue-500/30 rounded-t-lg shadow-lg shadow-blue-500/20 p-4 transition-all">
                            <div className="flex items-start gap-4">
                              {/* Waleed's Avatar */}
                              <div className="relative w-20 h-20 flex-shrink-0" style={{ animation: 'float 6s ease-in-out infinite' }}>
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-1">
                                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                                    {/* Robot Face - changes with mood */}
                                    <div className="relative w-full h-full">
                                      {/* Eyes */}
                                      <div className="absolute top-5 left-4 w-3 h-3 rounded-full bg-blue-400" 
                                        style={{ animation: 'blink 3s ease-in-out infinite' }} />
                                      <div className="absolute top-5 right-4 w-3 h-3 rounded-full bg-blue-400" 
                                        style={{ animation: 'blink 3s ease-in-out infinite', animationDelay: '0.2s' }} />
                                      
                                      {/* Mouth - changes with mood */}
                                      {waleedMood === 'happy' && (
                                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-8 h-2 bg-blue-400 rounded-full">
                                          <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-6 h-2 bg-gray-800 rounded-full" />
                                        </div>
                                      )}
                                      {waleedMood === 'neutral' && (
                                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-6 h-1 bg-blue-400 rounded-full" />
                                      )}
                                      {waleedMood === 'confused' && (
                                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-6 h-1 bg-blue-400 rounded-full transform rotate-12" />
                                      )}
                                      
                                      {/* Animated circuit patterns */}
                                      <div className="absolute inset-0" style={{ animation: 'glow 5s ease-in-out infinite' }}>
                                        <div className="absolute top-2 right-2 w-px h-2 bg-blue-400" />
                                        <div className="absolute top-2 right-2 w-2 h-px bg-blue-400" />
                                        <div className="absolute bottom-2 left-2 w-px h-2 bg-blue-400" />
                                        <div className="absolute bottom-2 left-2 w-2 h-px bg-blue-400" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Status indicator */}
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gray-900 p-[2px]">
                                  <div className={`w-full h-full rounded-full ${isWaleedTyping ? 'bg-green-400 animate-pulse' : 'bg-blue-400'}`} />
                                </div>
                                
                                {/* Holo projector effect */}
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-3 bg-blue-500/20 rounded-full blur-md" />
                              </div>
                              
                              {/* Dialog Area */}
                              <div className="flex-1 min-h-[100px]">
                                <div className="flex items-center mb-2">
                                  <div className="font-bold text-blue-400 mr-2">Waleed</div>
                                  <div className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">AI Assistant</div>
                                  
                                  {/* Voice controls */}
                                  <button 
                                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                                    className="ml-auto text-gray-400 hover:text-blue-400 transition-colors"
                                    title={voiceEnabled ? "Mute voice" : "Unmute voice"}
                                  >
                                    {voiceEnabled ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                                      </svg>
                                    ) : (
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                                        <line x1="23" y1="9" x2="17" y2="15"></line>
                                        <line x1="17" y1="9" x2="23" y2="15"></line>
                                      </svg>
                                    )}
                                  </button>
                                </div>
                                
                                {/* Dialog Text with Typing Indicator */}
                                <div className="text-gray-300 mb-4">
                                  {waleedDialog}
                                  {isWaleedTyping && <span className="inline-block w-1.5 h-4 bg-blue-400 ml-1 animate-pulse" />}
                                  
                                  {/* Speaking indicator */}
                                  {isSpeaking && !isWaleedTyping && voiceEnabled && (
                                    <div className="flex space-x-1 ml-2 mt-2">
                                      <div className="w-1 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDuration: '0.8s' }}></div>
                                      <div className="w-1 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDuration: '0.8s', animationDelay: '0.2s' }}></div>
                                      <div className="w-1 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDuration: '0.8s', animationDelay: '0.4s' }}></div>
                                    </div>
                                  )}
                                </div>
                                
                                {/* Dialog Options */}
                                {!isWaleedTyping && dialogOptions.length > 0 && (
                                  <div className="flex flex-col gap-2 mt-4">
                                    {dialogOptions.map((option, index) => (
                                      <button
                                        key={index}
                                        onClick={() => handleDialogSelect(option)}
                                        className="text-left px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded border border-blue-500/30 transition-colors text-sm text-gray-300 hover:text-white"
                                      >
                                        {option.text}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Dialog History Toggle */}
                            {dialogHistory.length > 0 && (
                              <div className="mt-4 text-xs text-gray-500 border-t border-gray-700 pt-2">
                                <div className="flex justify-between items-center">
                                  <button
                                    onClick={() => {
                                      // Close Waleed
                                      setShowWaleed(false);
                                      // Reset dialog after animation completes
                                      setTimeout(() => {
                                        setDialogHistory([]);
                                        setWaleedDialog('');
                                        setDialogOptions([]);
                                      }, 500);
                                    }}
                                    className="text-red-400 hover:text-red-300 transition-colors"
                                  >
                                    End conversation
                                  </button>
                                  <div className="flex items-center space-x-1">
                                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                                    <span className="text-blue-400">AI powered by Equinology</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <button 
                          onClick={initWaleed}
                          className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-full text-blue-300 flex items-center space-x-2 transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:pr-6 group z-20"
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-1 mr-2 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-ping opacity-30"></div>
                            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 relative animate-pulse"></div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span>Ask Waleed</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 text-blue-300/70">
                              <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            </svg>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-0 group-hover:w-4 transition-all overflow-hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Performance Metrics Section */}
              <section ref={metricsRef} className="py-32 px-4 relative opacity-0 transition-all duration-1000 -translate-y-10" data-section="metrics">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTAgMGg2MHY2MEgwVjB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-10" />
                <div className="max-w-6xl mx-auto relative">
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    Performance Metrics
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8 stagger-children">
                    {/* Processing Speed Graph */}
                    <div className="bg-black/20 rounded-lg p-6 relative overflow-hidden group">
                      <h3 className="text-xl font-bold mb-4 flex items-center text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mr-2" />
                        Processing Speed
                      </h3>
                      <div className="h-64 flex items-end space-x-2">
                        {[40, 65, 85, 95, 75, 90, 98].map((height, index) => (
                          <div
                            key={index}
                            className="flex-1 bg-gradient-to-t from-blue-500/30 to-purple-600/30 rounded-t group-hover:from-blue-500/40 group-hover:to-purple-600/40 transition-colors duration-300"
                            style={{
                              height: `${height}%`,
                              transition: 'height 1s ease-out',
                              animationDelay: `${index * 100}ms`
                            }}
                          />
                        ))}
                      </div>
                      <div className="mt-4 flex justify-between text-gray-500 text-sm">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>
                    </div>

                    {/* Real-time Metrics */}
                    <div className="bg-black/20 rounded-lg p-6 relative overflow-hidden">
                      <h3 className="text-xl font-bold mb-4 flex items-center text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mr-2" />
                        Real-time Metrics
                      </h3>
                      <div className="space-y-4">
                        {[
                          { label: "CPU Usage", value: 78, icon: "💻" },
                          { label: "Memory Usage", value: 64, icon: "🧠" },
                          { label: "GPU Utilization", value: 92, icon: "🎮" },
                          { label: "Network I/O", value: 85, icon: "🌐" }
                        ].map((metric, index) => (
                          <div key={index} className="group" style={{ transitionDelay: `${index * 100}ms` }}>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-400 flex items-center">
                                <span className="mr-2 opacity-50">{metric.icon}</span>
                                {metric.label}
                              </span>
                              <span className="text-blue-400/70">
                                {metric.value}%
                              </span>
                            </div>
                            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${metric.value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  <div className="grid md:grid-cols-3 gap-8 mt-8 stagger-children">
                    {[
                      { title: "Model Accuracy", value: "99.9%", trend: "↑", color: "text-green-400/70" },
                      { title: "Response Time", value: "12ms", trend: "↓", color: "text-blue-400/70" },
                      { title: "Data Throughput", value: "2.4GB/s", trend: "↑", color: "text-purple-400/70" }
                    ].map((metric, index) => (
                      <div 
                        key={index}
                        className="bg-black/20 rounded-lg p-6 relative overflow-hidden hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                      >
                        <h4 className="text-gray-400 mb-2">{metric.title}</h4>
                        <div className="flex items-baseline">
                          <span className={`text-3xl font-bold ${metric.color}`}>{metric.value}</span>
                          <span className={`ml-2 ${metric.color}`}>{metric.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
            <div ref={footerRef} className="opacity-0 transition-all duration-1000 -translate-y-10">
              <InteractiveFooter />
            </div>
          </div>
        } />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/find-out-more" element={<FindOutMore />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </div>
  );
};

// Wrap App with Router
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;