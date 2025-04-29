
import React from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role }) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="mb-4 text-brand-blue">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.942.41-2.98.82-2.77 2.93-5.73 2.93-5.73s-3.02 1.392-4.81 3.34c-1.84 1.99-2.27 4.3-1.29 6.92.92 2.48 3.29 3.17 4.75 2.49 1.17-.54 1.56-1.94 1.56-2.98zm11.08 0c0-.88-.23-1.618-.69-2.217-.326-.42-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.942.41-2.98.82-2.77 2.93-5.73 2.93-5.73s-3.02 1.392-4.81 3.34c-1.84 1.99-2.27 4.3-1.29 6.92.92 2.48 3.29 3.17 4.75 2.49 1.17-.54 1.56-1.94 1.56-2.98z" />
      </svg>
    </div>
    <p className="text-gray-700 dark:text-gray-300 mb-6">{quote}</p>
    <div>
      <p className="font-bold">{author}</p>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  </div>
);

export default TestimonialCard;
