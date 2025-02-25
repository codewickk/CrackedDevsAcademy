import React, { useState } from 'react';

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item mb-2 " style={{ backgroundColor: 'rgb(45, 45, 45)' }}>
      <button
        className="accordion-header w-full text-left p-4 rounded-lg flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md"
        onClick={toggleAccordion}
      >
        <span className="text-lg font-semibold text-white">{title}</span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-200 text-white ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="accordion-content p-4" style={{ backgroundColor: 'rgb(45, 45, 45)' }}>
          {children}
        </div>
      )}
    </div>
  );
};

const Accordion = ({ children }) => {
  return (
    <div className="accordion w-full max-w-4xl mx-auto my-4 px-4">{children}</div>
  );
};

export { Accordion, AccordionItem };

