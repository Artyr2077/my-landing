'use client';

import React, { ReactNode, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
}

const MOBILE_BREAKPOINT = 700;

const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= MOBILE_BREAKPOINT;
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  threshold = 0.15,
  className,
  style,
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile());
    const handleResize = () => setMobile(isMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const variants: Variants = mobile
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { delay, duration } },
      }
    : {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { delay, duration } },
      };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;