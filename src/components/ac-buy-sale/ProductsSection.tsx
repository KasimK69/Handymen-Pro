
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from './ProductCard';
import WantedCard from './WantedCard';
import { ACUnit } from '@/types/acUnit';
import { ArrowRight, Search, Grid3X3, Grid2X2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductsSectionProps {
  selectedTab: 'for-sale' | 'wanted';
  onTabChange: (tab: 'for-sale' | 'wanted') => void;
  acUnitsForSale: ACUnit[];
  acUnitsWanted: ACUnit[];
  onOpenGallery: (unit: ACUnit) => void;
  onWhatsAppContact: (unit: ACUnit) => void;
  formatPrice: (price: number) => string;
  onOpenSellingForm: () => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  selectedTab,
  onTabChange,
  acUnitsForSale,
  acUnitsWanted,
  onOpenGallery,
  onWhatsAppContact,
  formatPrice,
  onOpenSellingForm
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState('all');
  const [gridView, setGridView] = useState<'grid-3' | 'grid-2'>('grid-3');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter and sort functions
  const filteredProducts = (selectedTab === 'for-sale' ? acUnitsForSale : acUnitsWanted).filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (priceRange === 'all') return matchesSearch;
    if (priceRange === 'under-100k') return matchesSearch && product.price < 100000;
    if (priceRange === '100k-150k') return matchesSearch && product.price >= 100000 && product.price <= 150000;
    if (priceRange === 'over-150k') return matchesSearch && product.price > 150000;
    
    return matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // newest - default order
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <Tabs value={selectedTab} onValueChange={(value) => onTabChange(value as 'for-sale' | 'wanted')}>
          {/* Header with Tabs */}
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-[#2D3559] font-['Inter']"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Premium AC <span className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] bg-clip-text text-transparent">Marketplace</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover the best air conditioning units with competitive pricing and quality assurance from verified sellers across Pakistan.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto shadow-xl rounded-2xl overflow-hidden bg-white border-2 border-gray-100 h-16">
                <TabsTrigger 
                  value="for-sale" 
                  className="text-lg py-4 font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8843F2] data-[state=active]:to-[#FF467E] data-[state=active]:text-white transition-all duration-500 rounded-xl data-[state=active]:shadow-lg data-[state=active]:scale-105"
                >
                  🔥 ACs For Sale ({acUnitsForSale.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="wanted" 
                  className="text-lg py-4 font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8843F2] data-[state=active]:to-[#FF467E] data-[state=active]:text-white transition-all duration-500 rounded-xl data-[state=active]:shadow-lg data-[state=active]:scale-105"
                >
                  💰 ACs Wanted ({acUnitsWanted.length})
                </TabsTrigger>
              </TabsList>
            </motion.div>
          </div>

          <TabsContent value="for-sale">
            {/* Filters and Search */}
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by brand, model, or features..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-3 border-gray-200 focus:border-[#8843F2] focus:ring-[#8843F2] rounded-xl text-lg"
                  />
                </div>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="py-3 border-gray-200 focus:border-[#8843F2] rounded-xl text-lg">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="py-3 border-gray-200 focus:border-[#8843F2] rounded-xl text-lg">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under-100k">Under PKR 100K</SelectItem>
                    <SelectItem value="100k-150k">PKR 100K - 150K</SelectItem>
                    <SelectItem value="over-150k">Over PKR 150K</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={gridView === 'grid-3' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setGridView('grid-3')}
                    className={`rounded-xl ${gridView === 'grid-3' ? 'bg-[#8843F2] hover:bg-[#7335E8]' : ''}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={gridView === 'grid-2' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setGridView('grid-2')}
                    className={`rounded-xl ${gridView === 'grid-2' ? 'bg-[#8843F2] hover:bg-[#7335E8]' : ''}`}
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="font-medium">Showing {currentProducts.length} of {filteredProducts.length} results</span>
                <span className="font-medium">Page {currentPage} of {totalPages}</span>
              </div>
            </motion.div>
            
            {/* Products Grid */}
            <motion.div 
              className={`grid gap-8 mb-12 ${
                gridView === 'grid-3' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 md:grid-cols-2'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {currentProducts.map((unit, index) => (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                >
                  <ProductCard 
                    product={unit} 
                    onImageClick={() => onOpenGallery(unit)}
                    onWhatsAppContact={() => onWhatsAppContact(unit)}
                    formatPrice={formatPrice}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* No Results */}
            {currentProducts.length === 0 && (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No AC Units Found</h3>
                <p className="text-gray-600 mb-8">Try adjusting your search filters or browse all available units.</p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setPriceRange('all');
                    setSortBy('newest');
                  }}
                  className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] hover:from-[#7335E8] hover:to-[#F03A6E]"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div 
                className="flex justify-center items-center gap-2 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-xl ${currentPage === page ? 'bg-gradient-to-r from-[#8843F2] to-[#FF467E]' : ''}`}
                  >
                    {page}
                  </Button>
                ))}
              </motion.div>
            )}
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Button 
                className="bg-gradient-to-r from-[#2D3559] to-[#4CC9F0] hover:from-[#1e2442] hover:to-[#3ab5d9] text-white px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl"
                onClick={() => onOpenGallery(acUnitsForSale[0])}
              >
                🔥 Explore More AC Options
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="wanted">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2D3559]">
                AC <span className="text-[#8843F2]">Buying Requests</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                Connect with buyers actively searching for air conditioning units. Post your AC for sale and get matched with interested buyers.
              </p>
              <Button 
                className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] hover:from-[#7335E8] hover:to-[#F03A6E] text-white px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl"
                onClick={onOpenSellingForm}
              >
                💰 List Your AC for Sale
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {acUnitsWanted.map((unit, index) => (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                >
                  <WantedCard 
                    request={unit} 
                    formatPrice={formatPrice}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* No Wanted Requests */}
            {acUnitsWanted.length === 0 && (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-6xl mb-4">💭</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Buying Requests Yet</h3>
                <p className="text-gray-600 mb-8">Be the first to post what you're looking for!</p>
                <Button 
                  onClick={onOpenSellingForm}
                  className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] hover:from-[#7335E8] hover:to-[#F03A6E]"
                >
                  Post Your Request
                </Button>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProductsSection;
