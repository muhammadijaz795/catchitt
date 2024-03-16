// db.ts
import Dexie, { Table } from 'dexie';

export interface Friend {
  id?: number;
  name: string;
  age: number;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  profile!: Table<any>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      profile: '_id' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
