import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const TextDisplay = () => {
  return (
    <div className="text-center max-w-screen">
      <TypeAnimation
        sequence={[
          'Explore Endless Possibilities! ',
          1000,
          'Choose from 1 Million+ Courses! ',
          1000,
          'Dive into Expert-Led Learning! ',
          1000,
          'Expand your career opportunities! ',
          1000,
        ]}
        wrapper="span"
        speed={50}
        className="tracking-wide text-white text-2xl font-bold sm:text-2xl inline-block" // Apply the styles using className
        repeat={Infinity}
      />
    </div>
  );
};

export default TextDisplay;