
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, Eye } from "lucide-react";

interface Payment {
  id: string;
  customer: string;
  amount: number;
  date: string;
  method: 'credit_card' | 'cash' | 'bank_transfer' | 'paypal';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  orderId: string;
}

// Sample payments data
const initialPayments: Payment[] = [
  {
    id: "P10001",
    customer: "John Smith",
    amount: 249.99,
    date: "2025-04-25",
    method: "credit_card",
    status: "completed",
    orderId: "ORD10045"
  },
  {
    id: "P10002",
    customer: "Emma Johnson",
    amount: 499.99,
    date: "2025-04-24",
    method: "paypal",
    status: "completed",
    orderId: "ORD10044"
  },
  {
    id: "P10003",
    customer: "Michael Brown",
    amount: 149.99,
    date: "2025-04-23",
    method: "cash",
    status: "completed",
    orderId: "ORD10043"
  },
  {
    id: "P10004",
    customer: "Sarah Williams",
    amount: 349.99,
    date: "2025-04-23",
    method: "bank_transfer",
    status: "pending",
    orderId: "ORD10042"
  },
  {
    id: "P10005",
    customer: "James Johnson",
    amount: 199.99,
    date: "2025-04-22",
    method: "credit_card",
    status: "failed",
    orderId: "ORD10041"
  },
  {
    id: "P10006",
    customer: "Robert Miller",
    amount: 299.99,
    date: "2025-04-22",
    method: "credit_card",
    status: "refunded",
    orderId: "ORD10040"
  }
];

const Payments = () => {
  const [payments] = useState<Payment[]>(initialPayments);
  const [filter, setFilter] = useState<string>('all');

  const filteredPayments = filter === 'all' 
    ? payments 
    : payments.filter(payment => payment.status === filter);

  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + (payment.status !== 'refunded' ? payment.amount : 0), 
    0
  );

  const getMethodLabel = (method: Payment['method']) => {
    switch(method) {
      case 'credit_card':
        return 'Credit Card';
      case 'cash':
        return 'Cash';
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'paypal':
        return 'PayPal';
      default:
        return 'Unknown';
    }
  };

  const getStatusBadge = (status: Payment['status']) => {
    switch(status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
      case 'refunded':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Refunded</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage customer payments and transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-brand-blue hover:bg-brand-blue/90">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{filteredPayments.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Completed Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{payments.filter(p => p.status === 'completed').length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{payments.filter(p => p.status === 'pending').length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            Showing {filteredPayments.length} payments {filter !== 'all' && `with status: ${filter}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No payments found matching the selected filter.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.customer}</TableCell>
                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        {payment.date}
                      </div>
                    </TableCell>
                    <TableCell>{getMethodLabel(payment.method)}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 text-blue-500" />
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

export default Payments;
