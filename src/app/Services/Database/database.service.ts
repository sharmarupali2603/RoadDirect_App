import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

// Define the structure of the table
export interface vehicleItem {
  id?: number; // Auto-incremented ID
  data: any; // API response data
}
export interface clientItem {
  id?: number; // Auto-incremented ID
  data: any; // API response data
}
export interface userItem {
  id?: number; // Auto-incremented ID
  data: any; // API response data
}
export interface jobItem {
  id?: number; // Auto-incremented ID
  data: any; // API response data
}
@Injectable({
  providedIn: 'root',
})
export class DatabaseService extends Dexie {
  vehicle!: Table<vehicleItem, number>;
  client!: Table<clientItem, number>;
  user!: Table<userItem, number>;
  job!: Table<jobItem, number>;

  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      client: '++id',
      user:'++id',
      vehicle: '++id', // Auto-increment ID
      job: '++id'
    });
  }

  // Add API response to database
  async saveClientData(data: any): Promise<number> {
    return await this.client.add({ data });
  }

  // Retrieve all data
  async getAllClientData(): Promise<clientItem[]> {
    return await this.client.toArray();
  }

  // Clear database
  async clearclientData(): Promise<void> {
    await this.client.clear();
  }
  
  // Add API response to database
  async saveUserData(data: any): Promise<number> {
    return await this.user.add({ data });
  }

  // Retrieve all data
  async getAllUserData(): Promise<clientItem[]> {
    return await this.user.toArray();
  }

  // Clear database
  async clearUserData(): Promise<void> {
    await this.user.clear();
  }

  // Add API response to database
  async saveVehicleData(data: any): Promise<number> {
    return await this.vehicle.add({ data });
  }

  // Retrieve all data
  async getAllVehicleData(): Promise<clientItem[]> {
    return await this.vehicle.toArray();
  }

  // Clear database
  async clearVehicleData(): Promise<void> {
    await this.vehicle.clear();
  }

   // Add API response to database
   async saveJobData(data: any): Promise<number> {
    return await this.job.add({ data });
  }

  // Retrieve all data
  async getAllJobData(): Promise<clientItem[]> {
    return await this.job.toArray();
  }

  // Clear database
  async clearJobData(): Promise<void> {
    await this.job.clear();
  }
}
