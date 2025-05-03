
import React from "react";
import { Customer } from "@/types/customer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, UserCog, UserX, UserCheck } from "lucide-react";

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  if (customers.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="text-center py-8">
          No customers found matching your search.
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableBody>
      {customers.map((customer) => (
        <TableRow key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <TableCell>
            <div className="font-medium">{customer.name}</div>
            <div className="text-sm text-gray-500">{customer.id}</div>
          </TableCell>
          <TableCell>
            <div>{customer.email}</div>
            <div className="text-sm text-gray-500">{customer.phone}</div>
          </TableCell>
          <TableCell>{customer.joinDate}</TableCell>
          <TableCell>{customer.orderCount}</TableCell>
          <TableCell>
            <Badge variant={customer.status === "active" ? "default" : "outline"} className="capitalize">
              {customer.status === "active" ? "Active" : "Inactive"}
            </Badge>
          </TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={() => onToggleStatus(customer.id)}>
                {customer.status === "active" ?
                  <UserX className="h-4 w-4 text-blue-500" /> :
                  <UserCheck className="h-4 w-4 text-green-500" />
                }
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onEdit(customer)}>
                <Pencil className="h-4 w-4 text-blue-500" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDelete(customer.id)}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CustomerTable;
