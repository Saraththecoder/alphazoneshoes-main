import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const Reveal = ({ children, className = '', options }) => {
  const ref = useScrollReveal(options);
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default Reveal;
