
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, FileText, Calendar, ShoppingBag, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const overviewData = [
  { title: 'Total Bookings', value: '2,856', icon: <Calendar className="h-6 w-6 text-blue-500" />, change: '+12%', period: 'from last month', color: 'text-green-600' },
  { title: 'Total Revenue', value: 'PKR 185,420', icon: <CreditCard className="h-6 w-6 text-green-500" />, change: '+8%', period: 'from last month', color: 'text-green-600' },
  { title: 'Active Customers', value: '1,523', icon: <Users className="h-6 w-6 text-purple-500" />, change: '+5%', period: 'from last month', color: 'text-green-600' },
  { title: 'Pending Bookings', value: '24', icon: <Calendar className="h-6 w-6 text-amber-500" />, change: '-3%', period: 'from last month', color: 'text-red-600' },
];

const recentBookings = [
  { id: 'BKG-2023-001', customer: 'Ahmed Khan', service: 'AC Installation', date: '2023-09-25', status: 'Completed', amount: 'PKR 15,000' },
  { id: 'BKG-2023-002', customer: 'Sara Ali', service: 'AC Repair', date: '2023-09-24', status: 'Scheduled', amount: 'PKR 2,500' },
  { id: 'BKG-2023-003', customer: 'Fahad Mahmood', service: 'Gas Refill', date: '2023-09-24', status: 'In Progress', amount: 'PKR 3,500' },
  { id: 'BKG-2023-004', customer: 'Ayesha Ahmed', service: 'Maintenance', date: '2023-09-23', status: 'Completed', amount: 'PKR 4,000' },
  { id: 'BKG-2023-005', customer: 'Bilal Hassan', service: 'AC Troubleshooting', date: '2023-09-22', status: 'Scheduled', amount: 'PKR 1,800' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome to your AC Services admin dashboard.</p>
      </header>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overviewData.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">{item.icon}</span>
                <span className={`text-sm font-medium ${item.color}`}>
                  {item.change} <span className="text-gray-500 dark:text-gray-400">{item.period}</span>
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
                <h3 className="text-2xl font-bold">{item.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/admin/bookings" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Manage Bookings
            </Link>
          </Button>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link to="/admin/customers" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Manage Customers
            </Link>
          </Button>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link to="/admin/services" className="flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Manage Services
            </Link>
          </Button>
          <Button asChild className="bg-amber-600 hover:bg-amber-700">
            <Link to="/admin/blog-posts" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Manage Blog Posts
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Recent Bookings */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Bookings</CardTitle>
          <Button variant="ghost" size="sm" asChild className="text-sm">
            <Link to="/admin/bookings" className="flex items-center">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium">Booking ID</th>
                  <th className="text-left py-3 px-4 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 font-medium">Service</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4">{booking.id}</td>
                    <td className="py-3 px-4">{booking.customer}</td>
                    <td className="py-3 px-4">{booking.service}</td>
                    <td className="py-3 px-4">{booking.date}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === 'Completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : booking.status === 'Scheduled'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
