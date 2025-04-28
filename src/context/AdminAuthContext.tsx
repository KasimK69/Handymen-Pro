
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

// Define admin user type
type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
};

// Mock admin users for demo purposes
const MOCK_ADMIN_USERS = [
  { id: '1', email: 'admin@example.com', password: 'admin123', name: 'Admin User', role: 'admin' as const },
  { id: '2', email: 'editor@example.com', password: 'editor123', name: 'Editor User', role: 'editor' as const }
];

type AdminAuthContextType = {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    const storedUser = localStorage.getItem('adminUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = MOCK_ADMIN_USERS.find(
      user => user.email === email && user.password === password
    );
    
    setIsLoading(false);
    
    if (foundUser) {
      // Remove password before storing user data
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('adminUser', JSON.stringify(userWithoutPassword));
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/admin');
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
