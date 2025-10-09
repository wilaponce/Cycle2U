export interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
  }
  
  export interface Driver {
    id: string;
    name: string;
    isAvailable: boolean;
    location?: {
      latitude: number;
      longitude: number;
    };
  }
  
  export interface PickupRequest {
    id: string;
    userId: string;
    driverId?: string;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    location: {
      latitude: number;
      longitude: number;
    };
    createdAt: string;
  }
  
  export type Role = 'Admin' | 'User' | 'Driver';
  