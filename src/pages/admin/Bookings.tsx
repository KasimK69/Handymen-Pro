
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
import { Calendar, User, Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  customer: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  phone: string;
  address: string;
}

// Sample bookings data
const initialBookings: Booking[] = [
  {
    id: "B1001",
    customer: "John Smith",
    service: "AC Repair",
    date: "2025-05-05",
    time: "10:00 AM",
    status: "confirmed",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA"
  },
  {
    id: "B1002",
    customer: "Emma Johnson",
    service: "AC Installation",
    date: "2025-05-06",
    time: "2:30 PM",
    status: "pending",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, Somewhere, CA"
  },
  {
    id: "B1003",
    customer: "Michael Brown",
    service: "AC Maintenance",
    date: "2025-05-04",
    time: "9:00 AM",
    status: "completed",
    phone: "+1 (555) 345-6789",
    address: "789 Pine St, Nowhere, CA"
  },
  {
    id: "B1004",
    customer: "Sarah Williams",
    service: "AC Repair",
    date: "2025-05-07",
    time: "11:30 AM",
    status: "cancelled",
    phone: "+1 (555) 456-7890",
    address: "321 Elm St, Elsewhere, CA"
  }
];

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [filter, setFilter] = useState<string>('all');

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
    
    toast({
      title: "Booking updated",
      description: `Booking ${id} has been marked as ${status}`,
    });
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Confirmed</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Service Bookings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage customer service appointments and bookings
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bookings</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-brand-blue hover:bg-brand-blue/90">
            <Clock className="mr-2 h-4 w-4" />
            New Booking
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>
            You have {filteredBookings.length} bookings {filter !== 'all' && `with status: ${filter}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No bookings found matching the selected filter.
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        <div>
                          <div>{booking.customer}</div>
                          <div className="text-xs text-gray-500">{booking.phone}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <div>
                          <div>{booking.date}</div>
                          <div className="text-xs text-gray-500">{booking.time}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {booking.status !== 'completed' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'completed')}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                        )}
                        {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          >
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          View
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

export default Bookings;
