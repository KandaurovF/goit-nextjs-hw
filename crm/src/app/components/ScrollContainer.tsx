'use client';

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

interface ScrollContainerProps {
  children: React.ReactNode;
}

export default function ScrollContainer({ children }: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);

  const checkScroll = () => {
    if (containerRef.current) {
      setHasScroll(
        containerRef.current.scrollHeight > containerRef.current.clientHeight,
      );
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    checkScroll();

    if (container) {
      const resizeObserver = new ResizeObserver(() => {
        checkScroll();
      });

      resizeObserver.observe(container);

      return () => resizeObserver.disconnect();
    }
  }, [children]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'relative overflow-y-auto max-h-[90vh]',
        hasScroll ? 'pr-7' : 'pr-1',
      )}
    >
      {children}
    </div>
  );
}
