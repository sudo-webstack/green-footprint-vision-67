import { useEffect, useRef, useState } from "react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  enableParallax?: boolean;
  style?: React.CSSProperties;
}

const ParallaxSection = ({ 
  children, 
  className = "", 
  speed = 0.5, 
  enableParallax = true,
  style = {}
}: ParallaxSectionProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableParallax) return;

    const element = elementRef.current;
    if (!element) return;

    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { 
        rootMargin: '100px',
        threshold: 0
      }
    );

    observer.observe(element);

    // Optimized scroll handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking && isInView) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    if (isInView) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enableParallax, isInView]);

  const parallaxStyle = enableParallax && isInView 
    ? { 
        transform: `translateY(${scrollY * speed}px)`,
        transition: 'transform 0.1s ease-out',
        ...style
      }
    : style;

  return (
    <div 
      ref={elementRef}
      className={`${className} ${!enableParallax ? 'animate-fade-in-up' : ''}`}
      style={parallaxStyle}
    >
      {children}
    </div>
  );
};

export default ParallaxSection;