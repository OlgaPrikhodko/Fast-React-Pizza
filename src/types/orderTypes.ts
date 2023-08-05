export interface Cart {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
// todo add status type
export interface Order {
  id: string;
  customer: string;
  estimatedDelivery: string;
  orderPrice: number;
  priority: boolean;
  priorityPrice: number;
  status: string;
  cart: Cart[];
}

// phone: string;
// address: string;
// position: string;
