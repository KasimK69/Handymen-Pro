
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { 
  FileText, 
  ShoppingCart, 
  Settings, 
  Users, 
  BarChart3, 
  Calendar,
  LogOut,
  Package
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAdminAuth();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const dashboardCards = [
    {
      title: 'Blog Posts',
      description: 'Manage blog content',
      icon: FileText,
      count: '12',
      link: '/admin/blogs',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'AC Products',
      description: 'Manage AC listings',
      icon: Package,
      count: '8',
      link: '/admin/products',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Services',
      description: 'Manage services offered',
      icon: Settings,
      count: '6',
      link: '/admin/services',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Inquiries',
      description: 'Customer inquiries',
      icon: Users,
      count: '24',
      link: '/admin/inquiries',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#2D3559]">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome to AC Services Admin Panel</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <Card 
              key={index}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(card.link)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${card.color}`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-700">{card.count}</div>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg mb-1">{card.title}</CardTitle>
                <p className="text-sm text-gray-600">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => navigate('/admin/blogs')}
                className="bg-gradient-to-r from-[#8843F2] to-[#FF467E] text-white"
              >
                <FileText className="mr-2 h-4 w-4" />
                Create New Blog Post
              </Button>
              <Button 
                onClick={() => navigate('/admin/products')}
                variant="outline"
              >
                <Package className="mr-2 h-4 w-4" />
                Add AC Product
              </Button>
              <Button 
                onClick={() => navigate('/admin/services')}
                variant="outline"
              >
                <Settings className="mr-2 h-4 w-4" />
                Add New Service
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">New blog post published</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Package className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">AC product added to marketplace</p>
                  <p className="text-sm text-gray-600">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Users className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-medium">New customer inquiry received</p>
                  <p className="text-sm text-gray-600">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
