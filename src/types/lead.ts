export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  resourceId: string;
  resourceTitle: string;
  createdAt: string; // ISO String
  isPaid?: boolean;
  amountPaid?: number;
  paymentRef?: string;
}
