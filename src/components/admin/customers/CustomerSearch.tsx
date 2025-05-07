
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomerSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearSearch?: () => void;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              className="pl-10"
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          {searchTerm && onClearSearch && (
            <Button 
              variant="outline" 
              onClick={onClearSearch}
              size="sm"
              className="text-gray-500 h-10"
            >
              Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerSearch;
