
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
  Package,
  TrendingUp,
  Eye,
  MessageSquare,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

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
      description: 'Manage blog content and articles',
      icon: FileText,
      count: '12',
      link: '/admin/blogs',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'AC Products',
      description: 'Manage AC listings and inventory',
      icon: Package,
      count: '8',
      link: '/admin/products',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Services',
      description: 'Manage services and offerings',
      icon: Settings,
      count: '6',
      link: '/admin/services',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Customer Inquiries',
      description: 'View and manage customer requests',
      icon: MessageSquare,
      count: '24',
      link: '/admin/inquiries',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const statsCards = [
    {
      title: 'Total Views',
      value: '15,432',
      change: '+12%',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Service Requests',
      value: '89',
      change: '+23%',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Products Sold',
      value: '34',
      change: '+8%',
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Customer Rating',
      value: '4.9',
      change: '+0.1',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="p-4 md:p-8">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Admin Dashboard</span>
            </h1>
            <p className="text-gray-600 text-lg">Manage your AC Services business efficiently</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2 mt-4 md:mt-0 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {statsCards.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Management Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {dashboardCards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg bg-white/80 backdrop-blur-sm group h-full"
                onClick={() => navigate(card.link)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${card.color} group-hover:scale-110 transition-transform duration-300`}>
                      <card.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-700">{card.count}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">{card.title}</CardTitle>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => navigate('/admin/blogs')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 h-auto flex-col gap-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FileText className="h-6 w-6" />
                  <span className="font-semibold">Create New Blog Post</span>
                </Button>
                <Button 
                  onClick={() => navigate('/admin/products')}
                  variant="outline"
                  className="border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 py-4 h-auto flex-col gap-2 rounded-xl transition-all duration-300"
                >
                  <Package className="h-6 w-6" />
                  <span className="font-semibold">Add AC Product</span>
                </Button>
                <Button 
                  onClick={() => navigate('/admin/services')}
                  variant="outline"
                  className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 py-4 h-auto flex-col gap-2 rounded-xl transition-all duration-300"
                >
                  <Settings className="h-6 w-6" />
                  <span className="font-semibold">Add New Service</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">New blog post published</p>
                    <p className="text-sm text-gray-600">AC maintenance guide added successfully</p>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2 bg-green-600 rounded-lg">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">AC product added to marketplace</p>
                    <p className="text-sm text-gray-600">New Gree 1.5 Ton AC unit listed</p>
                  </div>
                  <span className="text-sm text-gray-500">5 hours ago</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2 bg-orange-600 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">New customer inquiry received</p>
                    <p className="text-sm text-gray-600">AC installation request from Islamabad</p>
                  </div>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
