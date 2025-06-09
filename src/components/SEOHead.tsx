
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'AC Services & Repairs Pakistan | Professional AC Installation, Repair & Sales',
  description = 'Professional AC services in Islamabad & Rawalpindi. Expert AC installation, repair, maintenance, and premium air conditioner sales. 24/7 emergency service available.',
  keywords = 'ac service, ac repair, ac installation, air conditioner, islamabad, rawalpindi, ac maintenance, ac gas filling, ac sale',
  image = 'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  url = 'https://acservices.pk',
  type = 'website'
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="AC Services Pakistan" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="AC Services Pakistan" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO Tags */}
      <meta name="geo.region" content="PK-IS" />
      <meta name="geo.placename" content="Islamabad, Pakistan" />
      <meta name="geo.position" content="33.6844;73.0479" />
      <meta name="ICBM" content="33.6844, 73.0479" />
      
      {/* Business Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "AC Services Pakistan",
          "description": "Professional AC services, repairs, and air conditioner sales in Islamabad and Rawalpindi",
          "url": "https://acservices.pk",
          "telephone": "+92-312-5242182",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Bahria Town, Phase 8",
            "addressLocality": "Rawalpindi",
            "addressRegion": "Punjab",
            "addressCountry": "Pakistan"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "33.6844",
            "longitude": "73.0479"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
            ],
            "opens": "08:00",
            "closes": "22:00"
          },
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "33.6844",
              "longitude": "73.0479"
            },
            "geoRadius": "50000"
          },
          "services": [
            "AC Installation",
            "AC Repair",
            "AC Maintenance", 
            "AC Gas Filling",
            "Air Conditioner Sales"
          ],
          "priceRange": "PKR 2,000 - 200,000",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "500"
          }
        })}
      </script>
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEOHead;
