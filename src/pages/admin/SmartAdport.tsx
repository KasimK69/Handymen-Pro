
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
import { Pencil, Trash2, Plus, Eye, EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from '@/hooks/use-toast';

interface AdportItem {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  type: 'banner' | 'popup' | 'sidebar';
  active: boolean;
  impressions: number;
  clicks: number;
  startDate: string;
  endDate: string;
}

// Sample Smart Adport data
const initialAdportItems: AdportItem[] = [
  {
    id: "1",
    title: "Summer AC Service Special",
    imageUrl: "https://images.unsplash.com/photo-1581275299888-536227aac860",
    linkUrl: "/services/ac-repair",
    type: "banner",
    active: true,
    impressions: 1240,
    clicks: 85,
    startDate: "2025-04-01",
    endDate: "2025-05-31",
  },
  {
    id: "2",
    title: "New Customer Discount",
    imageUrl: "https://images.unsplash.com/photo-1581275299888-536227aac860",
    linkUrl: "/booking",
    type: "popup",
    active: true,
    impressions: 980,
    clicks: 120,
    startDate: "2025-04-01",
    endDate: "2025-04-30",
  },
  {
    id: "3",
    title: "Maintenance Package",
    imageUrl: "https://images.unsplash.com/photo-1581275299888-536227aac860",
    linkUrl: "/services",
    type: "sidebar",
    active: false,
    impressions: 450,
    clicks: 28,
    startDate: "2025-03-15",
    endDate: "2025-05-15",
  },
];

const SmartAdport = () => {
  const [adportItems, setAdportItems] = useState<AdportItem[]>(initialAdportItems);

  const toggleActive = (id: string) => {
    setAdportItems(adportItems.map(item => 
      item.id === id 
        ? { ...item, active: !item.active } 
        : item
    ));
    
    toast({
      title: "Status updated",
      description: "Smart Adport item status has been updated",
    });
  };

  const deleteAdportItem = (id: string) => {
    setAdportItems(adportItems.filter(item => item.id !== id));
    
    toast({
      title: "Item deleted",
      description: "The Smart Adport item has been removed successfully",
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Smart Adport</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your promotional banners, popups, and sidebar ads
          </p>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue/90">
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Smart Adport Items</CardTitle>
          <CardDescription>
            Active items are currently displayed on the website based on their type.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adportItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{item.linkUrl}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      item.type === 'banner' ? 'default' : 
                      item.type === 'popup' ? 'destructive' : 'outline'
                    }>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="font-medium">{item.impressions.toLocaleString()}</span> impressions
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{item.clicks.toLocaleString()}</span> clicks
                      </div>
                      <div className="text-sm text-gray-500">
                        CTR: {((item.clicks / item.impressions) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch 
                      checked={item.active} 
                      onCheckedChange={() => toggleActive(item.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        {item.active ? 
                          <Eye className="h-4 w-4 text-green-500" /> : 
                          <EyeOff className="h-4 w-4" />
                        }
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteAdportItem(item.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default SmartAdport;
