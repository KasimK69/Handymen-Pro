import React from 'react';
import SEOOptimizer from '@/components/SEOOptimizer';

const SEOOptimizerPage = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO Content Optimizer</h1>
        <p className="text-gray-600">Analyze and optimize your content for better search engine visibility</p>
      </div>
      <SEOOptimizer />
    </div>
  );
};

export default SEOOptimizerPage;