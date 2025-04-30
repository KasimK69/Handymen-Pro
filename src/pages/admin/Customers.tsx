
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
import { Pencil, Trash2, Plus, Search, UserCog } from "lucide-react";
import { toast } from '@/hooks/use-toast';

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

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(customer => customer.id !== id));
    
    toast({
      title: "Customer deleted",
      description: "The customer has been removed successfully",
    });
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

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage customer accounts and information
          </p>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue/90">
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
                  <TableRow key={customer.id}>
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
                      <Badge variant={customer.status === "active" ? "default" : "outline"}>
                        {customer.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => toggleCustomerStatus(customer.id)}>
                          <UserCog className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteCustomer(customer.id)}>
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
    </>
  );
};

export default Customers;
