import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

// Define the structure of the table
export interface DataItem {
  id?: number;  // Auto-incremented ID
  data: any;    // API response data
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService extends Dexie {
  items!: Table<DataItem, number>;

  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      items: '++id',  // Auto-increment ID
    });
  }

  // Add API response to database
  async saveData(data: any): Promise<number> {
    return await this.items.add({ data });
  }

  // Retrieve all data
  async getAllData(): Promise<DataItem[]> {
    return await this.items.toArray();
  }

  // Clear database
  async clearData(): Promise<void> {
    await this.items.clear();
  }
}
