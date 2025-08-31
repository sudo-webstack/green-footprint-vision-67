import { useEffect, useState } from "react";

const ParallaxSection = ({ children, className = "", speed = 0.5 }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={className}
      style={{ transform: `translateY(${scrollY * speed}px)` }}
    >
      {children}
    </div>
  );
};

export default ParallaxSection;