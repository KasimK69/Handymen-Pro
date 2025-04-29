
import React, { useState } from 'react';
import { 
  ShoppingCart, 
  ChevronDown,
  ChevronUp,
  Check,
  X,
  FileText,
  Phone,
  Mail,
  MapPin,
  User,
  Calendar,
  Clock,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

// Sample order data for demonstration
const initialOrders = [
  {
    id: 'order-001',
    customerName: 'Ahmed Khan',
    email: 'ahmed.khan@example.com',
    phone: '+92 300 1234567',
    address: '123 Main St, F-10, Islamabad',
    orderDate: '2023-04-25T08:30:00',
    status: 'pending',
    paymentMethod: 'cash',
    items: [
      {
        id: 'inverter-1ton',
        name: 'Pro Inverter AC - 1 Ton',
        price: 125000,
        quantity: 1,
        images: ['https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      }
    ],
    total: 125000
  },
  {
    id: 'order-002',
    customerName: 'Sara Ali',
    email: 'sara.ali@example.com',
    phone: '+92 333 9876543',
    address: '456 Park Ave, Bahria Town, Rawalpindi',
    orderDate: '2023-04-24T14:15:00',
    status: 'confirmed',
    paymentMethod: 'bank',
    items: [
      {
        id: 'inverter-1.5ton',
        name: 'Pro Inverter AC - 1.5 Ton',
        price: 135000, // After discount
        quantity: 1,
        images: ['https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      }
    ],
    total: 135000
  },
  {
    id: 'order-003',
    customerName: 'Muhammad Usman',
    email: 'usman@example.com',
    phone: '+92 321 5551234',
    address: '789 River Road, DHA Phase 2, Islamabad',
    orderDate: '2023-04-22T10:45:00',
    status: 'delivered',
    paymentMethod: 'easypaisa',
    items: [
      {
        id: 'used-standard-1ton',
        name: 'Used Standard AC - 1 Ton',
        price: 55000,
        quantity: 1,
        images: ['https://images.unsplash.com/photo-1563351672-62b74891a28a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      },
      {
        id: 'installation',
        name: 'AC Installation Service',
        price: 5000,
        quantity: 1,
        images: [],
      }
    ],
    total: 60000
  },
  {
    id: 'order-004',
    customerName: 'Fatima Zaidi',
    email: 'fatima.z@example.com',
    phone: '+92 311 7778888',
    address: '321 Blue St, G-9, Islamabad',
    orderDate: '2023-04-20T16:20:00',
    status: 'cancelled',
    paymentMethod: 'jazzcash',
    items: [
      {
        id: 'inverter-2ton',
        name: 'Pro Inverter AC - 2 Ton',
        price: 175000,
        quantity: 1,
        images: ['https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      }
    ],
    total: 175000
  }
];

const statusColors: Record<string, string> = {
  'pending': 'bg-yellow-500',
  'confirmed': 'bg-blue-500',
  'shipped': 'bg-purple-500',
  'delivered': 'bg-green-500',
  'cancelled': 'bg-red-500'
};

const paymentMethodLabels: Record<string, string> = {
  'cash': 'Cash on Delivery',
  'bank': 'Bank Transfer',
  'easypaisa': 'EasyPaisa',
  'jazzcash': 'JazzCash'
};

const OrdersAdmin = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = useState<'orderDate' | 'total'>('orderDate');
  
  const handleSortChange = (newSortBy: 'orderDate' | 'total') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };
  
  const openViewDialog = (order: any) => {
    setCurrentOrder(order);
    setIsViewDialogOpen(true);
  };
  
  const openStatusDialog = (order: any) => {
    setCurrentOrder(order);
    setNewStatus(order.status);
    setIsStatusDialogOpen(true);
  };
  
  const handleStatusUpdate = () => {
    setOrders(prev => 
      prev.map(order => 
        order.id === currentOrder.id ? { ...order, status: newStatus } : order
      )
    );
    
    toast({
      title: "Order Status Updated",
      description: `Order #${currentOrder.id} status updated to ${newStatus}.`,
    });
    
    setIsStatusDialogOpen(false);
  };
  
  // Filter orders based on active tab and search query
  const filteredOrders = orders.filter(order => {
    // Status filter
    if (activeTab !== 'all' && order.status !== activeTab) return false;
    
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query) ||
        order.phone.includes(query)
      );
    }
    
    return true;
  });
  
  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'orderDate') {
      return sortOrder === 'desc' 
        ? new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        : new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
    } else {
      return sortOrder === 'desc' 
        ? b.total - a.total
        : a.total - b.total;
    }
  });
  
  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PK', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-PK', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  return (
    <div className="space-y-8 p-4">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders</p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
            <div>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>
                You have {orders.length} total orders
              </CardDescription>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64"
              />
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                  <TabsTrigger value="shipped">Shipped</TabsTrigger>
                  <TabsTrigger value="delivered">Delivered</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortChange('orderDate')}>
                    <div className="flex items-center">
                      Date
                      {sortBy === 'orderDate' && (
                        sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortChange('total')}>
                    <div className="flex items-center">
                      Total
                      {sortBy === 'total' && (
                        sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.length > 0 ? (
                  sortedOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>{order.customerName}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[order.status]}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>{formatDate(order.orderDate)}</div>
                        <div className="text-sm text-gray-500">{formatTime(order.orderDate)}</div>
                      </TableCell>
                      <TableCell>{formatPrice(order.total)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => openViewDialog(order)}>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openStatusDialog(order)}>
                              <Check className="mr-2 h-4 w-4" />
                              Update Status
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center">
                        <ShoppingCart className="h-12 w-12 text-gray-300 mb-2" />
                        <h3 className="text-lg font-medium">No orders found</h3>
                        <p className="text-gray-500">
                          {searchQuery 
                            ? "Try adjusting your search query" 
                            : activeTab !== 'all'
                              ? `No ${activeTab} orders found`
                              : "You don't have any orders yet"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* View Order Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order #{currentOrder?.id}
            </DialogDescription>
          </DialogHeader>
          
          {currentOrder && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-500">Status</div>
                  <Badge className={`mt-1 ${statusColors[currentOrder.status]}`}>
                    {currentOrder.status.charAt(0).toUpperCase() + currentOrder.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-sm font-medium text-gray-500">Order Date</div>
                  <div className="flex items-center justify-end mt-1">
                    <Calendar className="mr-1 h-4 w-4 text-gray-400" />
                    <span>{formatDate(currentOrder.orderDate)}</span>
                  </div>
                  <div className="flex items-center justify-end mt-1">
                    <Clock className="mr-1 h-4 w-4 text-gray-400" />
                    <span>{formatTime(currentOrder.orderDate)}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <h3 className="text-lg font-medium mb-3">Customer Information</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <div className="font-medium">{currentOrder.customerName}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <div>{currentOrder.email}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <div>{currentOrder.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Delivery & Payment */}
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <h3 className="text-lg font-medium mb-3">Delivery & Payment</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <div className="text-sm text-gray-500">Delivery Address</div>
                        <div>{currentOrder.address}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CreditCard className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <div className="text-sm text-gray-500">Payment Method</div>
                        <div>{paymentMethodLabels[currentOrder.paymentMethod]}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Order Items</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentOrder.items.map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            {item.images && item.images[0] ? (
                              <div className="w-16 h-16 rounded overflow-hidden">
                                <img 
                                  src={item.images[0]} 
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center">
                                <Package className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{item.name}</div>
                          </TableCell>
                          <TableCell className="text-right">
                            {formatPrice(item.price)}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatPrice(item.price * item.quantity)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-medium">Total</div>
                  <div className="text-xl font-bold">{formatPrice(currentOrder.total)}</div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Close
                </Button>
                <Button onClick={() => {
                  setIsViewDialogOpen(false);
                  openStatusDialog(currentOrder);
                }}>
                  Update Status
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Update Status Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status for order #{currentOrder?.id}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStatusUpdate}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersAdmin;
