
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  orderCount: number;
  status: 'active' | 'inactive';
  // Added fields for AC services
  lastServiceDate?: string;
  preferredServices?: ('installation' | 'repair' | 'gasRefill')[];
  acModels?: string[];
  notes?: string;
}
