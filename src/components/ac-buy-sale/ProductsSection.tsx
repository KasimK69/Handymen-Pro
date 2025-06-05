
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from './ProductCard';
import WantedCard from './WantedCard';
import { ACUnit } from '@/types/acUnit';
import { ArrowRight, Search, Grid3X3, Grid2X2, Plus } from 'lucide-react';
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
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white">
      <div className="container mx-auto px-4">
        <Tabs value={selectedTab} onValueChange={(value) => onTabChange(value as 'for-sale' | 'wanted')}>
          {/* Header with Tabs */}
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Premium AC Marketplace
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
              className="flex justify-center"
            >
              <TabsList className="grid grid-cols-2 w-full max-w-2xl mx-auto shadow-2xl rounded-3xl overflow-hidden bg-white border-4 border-gray-100 h-20 p-2">
                <TabsTrigger 
                  value="for-sale" 
                  className="text-lg py-6 px-8 font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-blue-700 data-[state=active]:text-white transition-all duration-500 rounded-2xl data-[state=active]:shadow-xl data-[state=active]:scale-105 hover:scale-102"
                >
                  🔥 ACs For Sale ({acUnitsForSale.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="wanted" 
                  className="text-lg py-6 px-8 font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:via-emerald-600 data-[state=active]:to-green-700 data-[state=active]:text-white transition-all duration-500 rounded-2xl data-[state=active]:shadow-xl data-[state=active]:scale-105 hover:scale-102"
                >
                  💰 ACs Wanted ({acUnitsWanted.length})
                </TabsTrigger>
              </TabsList>
            </motion.div>
          </div>

          <TabsContent value="for-sale">
            {/* Filters and Search */}
            <motion.div 
              className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-12 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by brand, model, or features..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 py-4 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-2xl text-lg font-medium bg-white/50"
                  />
                </div>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="py-4 border-2 border-gray-200 focus:border-blue-500 rounded-2xl text-lg font-medium bg-white/50">
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
                  <SelectTrigger className="py-4 border-2 border-gray-200 focus:border-blue-500 rounded-2xl text-lg font-medium bg-white/50">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under-100k">Under PKR 100K</SelectItem>
                    <SelectItem value="100k-150k">PKR 100K - 150K</SelectItem>
                    <SelectItem value="over-150k">Over PKR 150K</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex items-center gap-3">
                  <Button
                    variant={gridView === 'grid-3' ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => setGridView('grid-3')}
                    className={`rounded-2xl h-12 ${gridView === 'grid-3' ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : 'border-2'}`}
                  >
                    <Grid3X3 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant={gridView === 'grid-2' ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => setGridView('grid-2')}
                    className={`rounded-2xl h-12 ${gridView === 'grid-2' ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : 'border-2'}`}
                  >
                    <Grid2X2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-lg text-gray-600 font-medium">
                <span>Showing {currentProducts.length} of {filteredProducts.length} results</span>
                <span>Page {currentPage} of {totalPages}</span>
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
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="transform transition-all duration-300"
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
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">No AC Units Found</h3>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Try adjusting your search filters or browse all available units. We're constantly adding new products!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setPriceRange('all');
                      setSortBy('newest');
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl"
                  >
                    Clear All Filters
                  </Button>
                  <Button 
                    onClick={onOpenSellingForm}
                    variant="outline"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg rounded-2xl"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    List Your AC
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div 
                className="flex justify-center items-center gap-3 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-2xl min-w-12 h-12 text-lg font-semibold ${
                      currentPage === page 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                        : 'border-2 border-gray-300 hover:border-blue-500'
                    }`}
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
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white px-16 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-3xl transform hover:scale-105"
                onClick={onOpenSellingForm}
              >
                <Plus className="mr-3 h-6 w-6" />
                🔥 List Your AC for Sale
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="wanted">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
                AC Buying Requests
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-10">
                Connect with buyers actively searching for air conditioning units. Post your AC for sale and get matched with interested buyers instantly.
              </p>
              <Button 
                className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 text-white px-16 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-3xl transform hover:scale-105"
                onClick={onOpenSellingForm}
              >
                <Plus className="mr-3 h-6 w-6" />
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
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="transform transition-all duration-300"
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
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-8xl mb-6">💭</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">No Buying Requests Yet</h3>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Be the first to post what you're looking for! Our sellers are waiting to connect with serious buyers.
                </p>
                <Button 
                  onClick={onOpenSellingForm}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-4 text-lg rounded-2xl"
                >
                  <Plus className="mr-2 h-5 w-5" />
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
