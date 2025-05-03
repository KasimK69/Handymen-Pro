
import React, { useState } from 'react';
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, Search, UserCog, UserX, UserCheck } from "lucide-react";
import { toast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the validation schema
const customerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(7, { message: "Phone number must be at least 7 digits." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  status: z.enum(["active", "inactive"])
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  orderCount: number;
  status: 'active' | 'inactive';
}

// Sample customers data
const initialCustomers: Customer[] = [
  {
    id: "C1001",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA",
    joinDate: "2024-01-15",
    orderCount: 3,
    status: "active"
  },
  {
    id: "C1002",
    name: "Emily Johnson",
    email: "emily@example.com",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, Somewhere, CA",
    joinDate: "2024-02-20",
    orderCount: 1,
    status: "active"
  },
  {
    id: "C1003",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1 (555) 345-6789",
    address: "789 Pine St, Nowhere, CA",
    joinDate: "2024-01-05",
    orderCount: 2,
    status: "inactive"
  },
  {
    id: "C1004",
    name: "Sarah Davis",
    email: "sarah@example.com",
    phone: "+1 (555) 456-7890",
    address: "321 Elm St, Elsewhere, CA",
    joinDate: "2024-03-10",
    orderCount: 0,
    status: "active"
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
  const [customerToDelete, setCustomerToDelete] = useState<string>('');

  // Create form
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      status: "active"
    }
  });

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const confirmDeleteCustomer = (id: string) => {
    setCustomerToDelete(id);
    setIsConfirmDialogOpen(true);
  };

  const deleteCustomer = () => {
    setCustomers(customers.filter(customer => customer.id !== customerToDelete));
    
    toast({
      title: "Customer deleted",
      description: "The customer has been removed successfully",
    });

    setIsConfirmDialogOpen(false);
  };

  const toggleCustomerStatus = (id: string) => {
    setCustomers(customers.map(customer => 
      customer.id === id 
        ? { ...customer, status: customer.status === 'active' ? 'inactive' : 'active' } 
        : customer
    ));
    
    const customer = customers.find(c => c.id === id);
    const newStatus = customer?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: "Status updated",
      description: `Customer status has been set to ${newStatus}`,
    });
  };

  const openAddCustomerDialog = () => {
    setCurrentCustomer(null);
    form.reset({
      name: "",
      email: "",
      phone: "",
      address: "",
      status: "active"
    });
    setIsDialogOpen(true);
  };

  const openEditCustomerDialog = (customer: Customer) => {
    setCurrentCustomer(customer);
    form.reset({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      status: customer.status
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (values: CustomerFormValues) => {
    if (currentCustomer) {
      // Edit existing customer
      setCustomers(customers.map(customer => 
        customer.id === currentCustomer.id
          ? { 
              ...customer, 
              ...values
            }
          : customer
      ));
      
      toast({
        title: "Customer updated",
        description: "The customer information has been updated successfully",
      });
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: `C${Math.floor(1000 + Math.random() * 9000)}`,
        ...values,
        joinDate: new Date().toISOString().split('T')[0],
        orderCount: 0
      };
      
      setCustomers([...customers, newCustomer]);
      
      toast({
        title: "Customer added",
        description: "New customer has been added successfully",
      });
    }
    
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage customer accounts and information
          </p>
        </div>
        <Button 
          className="bg-brand-blue hover:bg-brand-blue/90"
          onClick={openAddCustomerDialog}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              className="pl-10"
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>
            Showing {filteredCustomers.length} out of {customers.length} customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No customers found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <TableCell>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.id}</div>
                    </TableCell>
                    <TableCell>
                      <div>{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </TableCell>
                    <TableCell>{customer.joinDate}</TableCell>
                    <TableCell>{customer.orderCount}</TableCell>
                    <TableCell>
                      <Badge variant={customer.status === "active" ? "default" : "outline"} className="capitalize">
                        {customer.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => toggleCustomerStatus(customer.id)}>
                          {customer.status === "active" ?
                            <UserX className="h-4 w-4 text-blue-500" /> :
                            <UserCheck className="h-4 w-4 text-green-500" />
                          }
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openEditCustomerDialog(customer)}>
                          <Pencil className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => confirmDeleteCustomer(customer.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Customer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{currentCustomer ? 'Edit Customer' : 'Add New Customer'}</DialogTitle>
            <DialogDescription>
              {currentCustomer 
                ? 'Update customer information below.' 
                : 'Enter customer details to add a new customer.'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter customer name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Enter customer email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter customer phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter customer address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select
                        className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {currentCustomer ? 'Save Changes' : 'Add Customer'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this customer? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteCustomer}>
              Delete Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Customers;
