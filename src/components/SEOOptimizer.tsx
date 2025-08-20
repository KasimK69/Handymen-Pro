import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Search, TrendingUp, Globe, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface SEOAnalysis {
  title: {
    length: number;
    isGood: boolean;
    recommendation?: string;
  };
  description: {
    length: number;
    isGood: boolean;
    recommendation?: string;
  };
  keywords: {
    density: number;
    isGood: boolean;
    recommendation?: string;
  };
  readability: {
    score: number;
    isGood: boolean;
    recommendation?: string;
  };
}

const SEOOptimizer = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [keywords, setKeywords] = useState('');
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);

  const analyzeSEO = () => {
    const titleLength = title.length;
    const descLength = description.length;
    const contentWords = content.split(' ').filter(word => word.length > 0);
    const keywordList = keywords.split(',').map(k => k.trim().toLowerCase());
    
    let keywordCount = 0;
    const contentLower = content.toLowerCase();
    keywordList.forEach(keyword => {
      if (keyword) {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        keywordCount += (contentLower.match(regex) || []).length;
      }
    });

    const keywordDensity = contentWords.length > 0 ? (keywordCount / contentWords.length) * 100 : 0;
    const readabilityScore = Math.max(0, Math.min(100, 100 - (contentWords.length / 100) * 2));

    setAnalysis({
      title: {
        length: titleLength,
        isGood: titleLength >= 30 && titleLength <= 60,
        recommendation: titleLength < 30 ? 'Title too short - aim for 30-60 characters' : 
                      titleLength > 60 ? 'Title too long - aim for 30-60 characters' : undefined
      },
      description: {
        length: descLength,
        isGood: descLength >= 120 && descLength <= 160,
        recommendation: descLength < 120 ? 'Description too short - aim for 120-160 characters' : 
                      descLength > 160 ? 'Description too long - aim for 120-160 characters' : undefined
      },
      keywords: {
        density: keywordDensity,
        isGood: keywordDensity >= 1 && keywordDensity <= 3,
        recommendation: keywordDensity < 1 ? 'Add more target keywords to content' : 
                      keywordDensity > 3 ? 'Reduce keyword density - might be seen as spam' : undefined
      },
      readability: {
        score: readabilityScore,
        isGood: readabilityScore >= 60,
        recommendation: readabilityScore < 60 ? 'Content might be too complex - use shorter sentences' : undefined
      }
    });
  };

  const generateSuggestions = () => {
    const suggestions = [
      "Add location-specific keywords (Islamabad, Rawalpindi, Pakistan)",
      "Include service-related terms (AC repair, installation, maintenance)",
      "Use seasonal keywords (summer cooling, winter heating)",
      "Add brand names (Samsung, LG, Haier, Gree)",
      "Include problem-solution keywords (AC not cooling, refrigerant leak)",
      "Add quality indicators (professional, certified, experienced)",
      "Use call-to-action phrases (book now, free quote, same day service)"
    ];
    
    return suggestions.slice(0, 4);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Search className="h-6 w-6 text-white" />
            </div>
            SEO Content Optimizer
          </CardTitle>
          <p className="text-gray-600">Optimize your content for better search engine visibility</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Page Title</label>
              <Input
                placeholder="e.g., Professional AC Repair Services in Islamabad"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-2"
              />
              <div className="text-xs text-gray-500">{title.length}/60 characters</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Meta Description</label>
              <Textarea
                placeholder="e.g., Expert AC repair and installation services in Islamabad & Rawalpindi. 24/7 emergency service, certified technicians, and 1-year warranty."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mb-2"
              />
              <div className="text-xs text-gray-500">{description.length}/160 characters</div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Target Keywords (comma separated)</label>
            <Input
              placeholder="e.g., ac repair, ac installation, air conditioner service, islamabad"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <Textarea
              placeholder="Enter your page content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />
            <div className="text-xs text-gray-500 mt-1">
              {content.split(' ').filter(word => word.length > 0).length} words
            </div>
          </div>

          <Button 
            onClick={analyzeSEO} 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={!title || !description || !content}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Analyze SEO
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="h-5 w-5" />
                SEO Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title Analysis */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Title Optimization</h4>
                    {analysis.title.isGood ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Good
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Needs Work
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {analysis.title.length} characters
                  </p>
                  {analysis.title.recommendation && (
                    <p className="text-xs text-amber-600 mt-1">
                      {analysis.title.recommendation}
                    </p>
                  )}
                </div>

                {/* Description Analysis */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Meta Description</h4>
                    {analysis.description.isGood ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Good
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Needs Work
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {analysis.description.length} characters
                  </p>
                  {analysis.description.recommendation && (
                    <p className="text-xs text-amber-600 mt-1">
                      {analysis.description.recommendation}
                    </p>
                  )}
                </div>

                {/* Keyword Density */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Keyword Density</h4>
                    {analysis.keywords.isGood ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Good
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Needs Work
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {analysis.keywords.density.toFixed(1)}%
                  </p>
                  {analysis.keywords.recommendation && (
                    <p className="text-xs text-amber-600 mt-1">
                      {analysis.keywords.recommendation}
                    </p>
                  )}
                </div>

                {/* Readability */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Readability</h4>
                    {analysis.readability.isGood ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Good
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Needs Work
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Score: {analysis.readability.score.toFixed(0)}/100
                  </p>
                  {analysis.readability.recommendation && (
                    <p className="text-xs text-amber-600 mt-1">
                      {analysis.readability.recommendation}
                    </p>
                  )}
                </div>
              </div>

              {/* SEO Suggestions */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  SEO Improvement Suggestions
                </h4>
                <ul className="space-y-2">
                  {generateSuggestions().map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default SEOOptimizer;