import apiService from './apiService';
import { User, Driver, PickupRequest, Role } from '../types';

export const getUsers = () => apiService.get<User[]>('/admin/users');
export const getDrivers = () => apiService.get<Driver[]>('/admin/drivers');
export const getRequests = () => apiService.get<PickupRequest[]>('/admin/requests');
export const assignRole = (userId: string, role: Role) => apiService.post(`/admin/users/${userId}/assign-role`, { role });
export const createDriver = (driverData: Omit<Driver, 'id'>) => apiService.post<Driver>('/admin/drivers', driverData);
export const updateDriverAvailability = (driverId: string, isAvailable: boolean) => apiService.put(`/admin/drivers/${driverId}/availability`, { isAvailable });
export const assignDriverToRequest = (requestId: string, driverId: string) => apiService.put(`/admin/requests/${requestId}/assign-driver`, { driverId });
export const deleteRequest = (requestId: string) => apiService.delete(`/admin/NEXT_RENDER_BACKEND_URL/${requestId}`);