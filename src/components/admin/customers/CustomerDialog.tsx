
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomerForm, { CustomerFormValues } from "./CustomerForm";
import { Customer } from "@/types/customer";

interface CustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CustomerFormValues) => void;
  currentCustomer: Customer | null;
}

const CustomerDialog: React.FC<CustomerDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentCustomer,
}) => {
  const defaultValues: CustomerFormValues = currentCustomer
    ? {
        name: currentCustomer.name,
        email: currentCustomer.email,
        phone: currentCustomer.phone,
        address: currentCustomer.address,
        status: currentCustomer.status,
      }
    : {
        name: "",
        email: "",
        phone: "",
        address: "",
        status: "active",
      };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{currentCustomer ? 'Edit Customer' : 'Add New Customer'}</DialogTitle>
          <DialogDescription>
            {currentCustomer 
              ? 'Update customer information below.' 
              : 'Enter customer details to add a new customer.'}
          </DialogDescription>
        </DialogHeader>
        <CustomerForm 
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          onCancel={onClose}
          isEditing={!!currentCustomer}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDialog;
