
import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Filter, 
  Search,
  ChevronDown,
  FileText,
  MoreHorizontal,
  Trash2,
  Eye,
  X,
  User,
  Calendar,
  Clock,
  Package,
  CreditCard
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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderType {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled';
  paymentMethod: 'cash' | 'bank' | 'easypaisa' | 'jazzcash';
  paymentStatus: 'pending' | 'paid' | 'failed';
  date: string;
}

const sampleOrders: OrderType[] = [
  {
    id: 'ORD-2023-001',
    customer: {
      name: 'Ali Ahmed',
      email: 'ali.ahmed@example.com',
      phone: '0300-1234567',
      address: 'House 123, Street 4, F-7/4',
      city: 'Islamabad'
    },
    items: [
      {
        id: 'PROD-001',
        name: 'Pro Inverter AC - 1.5 Ton',
        price: 135000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
      }
    ],
    total: 135000,
    status: 'delivered',
    paymentMethod: 'cash',
    paymentStatus: 'paid',
    date: '2023-05-15'
  },
  {
    id: 'ORD-2023-002',
    customer: {
      name: 'Fatima Khan',
      email: 'fatima@example.com',
      phone: '0333-7654321',
      address: 'Apartment 45, Block C, Bahria Town',
      city: 'Rawalpindi'
    },
    items: [
      {
        id: 'PROD-002',
        name: 'Standard AC - 1 Ton',
        price: 85000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1563351672-62b74891a28a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
      },
      {
        id: 'PROD-003',
        name: 'Installation Kit',
        price: 5000,
        quantity: 1,
        image: 'https://via.placeholder.com/200x200?text=Installation+Kit'
      }
    ],
    total: 90000,
    status: 'processing',
    paymentMethod: 'bank',
    paymentStatus: 'paid',
    date: '2023-05-20'
  },
  {
    id: 'ORD-2023-003',
    customer: {
      name: 'Muhammad Usman',
      email: 'usman@example.com',
      phone: '0311-9876543',
      address: 'House 78, Street 12, G-13/1',
      city: 'Islamabad'
    },
    items: [
      {
        id: 'PROD-004',
        name: 'Pro Inverter AC - 2 Ton',
        price: 175000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1581275326027-70a6b944649a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
      }
    ],
    total: 175000,
    status: 'shipping',
    paymentMethod: 'easypaisa',
    paymentStatus: 'paid',
    date: '2023-06-02'
  },
  {
    id: 'ORD-2023-004',
    customer: {
      name: 'Ayesha Malik',
      email: 'ayesha@example.com',
      phone: '0321-1122334',
      address: 'Flat 12, Rose Arcade, F-10 Markaz',
      city: 'Islamabad'
    },
    items: [
      {
        id: 'PROD-005',
        name: 'Standard AC - 1.5 Ton',
        price: 110000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1580821810660-5486b8e980a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
      }
    ],
    total: 110000,
    status: 'pending',
    paymentMethod: 'jazzcash',
    paymentStatus: 'pending',
    date: '2023-06-10'
  },
  {
    id: 'ORD-2023-005',
    customer: {
      name: 'Ahmed Raza',
      email: 'ahmed.raza@example.com',
      phone: '0345-9876123',
      address: 'House 345, Street 7, Phase 2, DHA',
      city: 'Rawalpindi'
    },
    items: [
      {
        id: 'PROD-006',
        name: 'Used Standard AC - 1 Ton',
        price: 55000,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1563351672-62b74891a28a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
      }
    ],
    total: 110000,
    status: 'cancelled',
    paymentMethod: 'cash',
    paymentStatus: 'failed',
    date: '2023-06-15'
  }
];

const OrdersAdmin = () => {
  const [orders, setOrders] = useState<OrderType[]>(sampleOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderType['status']>('pending');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = () => {
    if (!selectedOrder) return;

    setOrders(orders.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, status: newStatus } 
        : order
    ));

    toast({
      title: "Order Status Updated",
      description: `Order ${selectedOrder.id} is now ${newStatus}.`,
    });

    setIsStatusDialogOpen(false);
  };

  const handleDeleteOrder = () => {
    if (!selectedOrder) return;

    setOrders(orders.filter(order => order.id !== selectedOrder.id));
    
    toast({
      title: "Order Deleted",
      description: `Order ${selectedOrder.id} has been deleted.`,
      variant: "destructive",
    });

    setIsDeleteDialogOpen(false);
  };

  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'cash': return 'Cash on Delivery';
      case 'bank': return 'Bank Transfer';
      case 'easypaisa': return 'EasyPaisa';
      case 'jazzcash': return 'JazzCash';
      default: return method;
    }
  };

  const getStatusColor = (status: OrderType['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipping': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPaymentStatusColor = (status: OrderType['paymentStatus']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'paid': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Manage customer orders and track shipments</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            You have {orders.length} orders in total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="w-full sm:w-[200px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipping">Shipping</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.email}</div>
                      </TableCell>
                      <TableCell>
                        {new Date(order.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="text-sm">{getPaymentMethodLabel(order.paymentMethod)}</div>
                          <Badge className={`${getPaymentStatusColor(order.paymentStatus)}`}>
                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatPrice(order.total)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => {
                              setSelectedOrder(order);
                              setIsViewDialogOpen(true);
                            }}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedOrder(order);
                              setNewStatus(order.status);
                              setIsStatusDialogOpen(true);
                            }}>
                              <Package className="mr-2 h-4 w-4" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsDeleteDialogOpen(true);
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      <div className="flex flex-col items-center">
                        <ShoppingCart className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-xl font-medium text-gray-600 mb-1">No Orders Found</p>
                        <p className="text-sm text-gray-500">
                          {searchQuery
                            ? "Try adjusting your search or filter criteria."
                            : "Orders will appear here when customers place them."}
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
      
      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Order Details - {selectedOrder?.id}
            </DialogTitle>
            <DialogDescription>
              Complete information about this order and customer
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Status and Payment Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  <div className="text-sm text-gray-500 mb-1">Order Status</div>
                  <Badge className={`${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  <div className="text-sm text-gray-500 mb-1">Payment Method</div>
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-gray-700" />
                    {getPaymentMethodLabel(selectedOrder.paymentMethod)}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  <div className="text-sm text-gray-500 mb-1">Order Date</div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-700" />
                    {new Date(selectedOrder.date).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Name</div>
                    <div className="font-medium">{selectedOrder.customer.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email</div>
                    <div className="font-medium">{selectedOrder.customer.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Phone</div>
                    <div className="font-medium">{selectedOrder.customer.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Address</div>
                    <div className="font-medium">
                      {selectedOrder.customer.address}, {selectedOrder.customer.city}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Order Items
                </h3>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=No+Image';
                                  }}
                                />
                              </div>
                              <div className="font-medium">{item.name}</div>
                            </div>
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

              {/* Order Totals */}
              <div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(selectedOrder.total)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Delivery</span>
                    <span className="text-green-500">Free</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between py-2 font-bold">
                    <span>Total</span>
                    <span>{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setIsViewDialogOpen(false);
              setNewStatus(selectedOrder?.status || 'pending');
              setIsStatusDialogOpen(true);
            }}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Update Status Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status for order {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={newStatus} onValueChange={(value) => setNewStatus(value as OrderType['status'])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipping">Shipping</SelectItem>
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
            <Button onClick={handleStatusChange}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Order Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete order {selectedOrder?.id}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteOrder}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersAdmin;
