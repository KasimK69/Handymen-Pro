
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CalendarClock, 
  UserCheck, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  BarChart3 
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div>
          <select 
            className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
            defaultValue="today"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <CalendarClock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <UserCheck className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,456</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Product Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 text-sm font-medium text-gray-500 pb-2 border-b">
                <div>Customer</div>
                <div>Service</div>
                <div>Date</div>
                <div>Status</div>
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="grid grid-cols-4 text-sm">
                  <div>John Doe</div>
                  <div>AC Repair</div>
                  <div>{new Date().toLocaleDateString()}</div>
                  <div><span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 text-sm font-medium text-gray-500 pb-2 border-b">
                <div>Product</div>
                <div>Customer</div>
                <div>Amount</div>
                <div>Status</div>
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="grid grid-cols-4 text-sm">
                  <div>AC 1.5 Ton</div>
                  <div>Sarah Johnson</div>
                  <div>$599</div>
                  <div><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
