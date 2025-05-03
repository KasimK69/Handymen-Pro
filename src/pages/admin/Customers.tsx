
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
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from '@/hooks/use-toast';
import { Customer } from '@/types/customer';
import CustomerTable from '@/components/admin/customers/CustomerTable';
import CustomerSearch from '@/components/admin/customers/CustomerSearch';
import CustomerDialog from '@/components/admin/customers/CustomerDialog';
import DeleteConfirmationDialog from '@/components/admin/customers/DeleteConfirmationDialog';
import { CustomerFormValues } from '@/components/admin/customers/CustomerForm';

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
    setIsDialogOpen(true);
  };

  const openEditCustomerDialog = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleSubmitCustomer = (values: CustomerFormValues) => {
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
      // Add new customer - making sure all required properties are provided
      const newCustomer: Customer = {
        id: `C${Math.floor(1000 + Math.random() * 9000)}`,
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        status: values.status,
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

      <CustomerSearch 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

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
            <CustomerTable 
              customers={filteredCustomers}
              onEdit={openEditCustomerDialog}
              onDelete={confirmDeleteCustomer}
              onToggleStatus={toggleCustomerStatus}
            />
          </Table>
        </CardContent>
      </Card>

      <CustomerDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmitCustomer}
        currentCustomer={currentCustomer}
      />

      <DeleteConfirmationDialog 
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={deleteCustomer}
      />
    </>
  );
};

export default Customers;
