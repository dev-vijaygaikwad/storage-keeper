import { IStorageHandler } from "./interfaces/IStorageHandler";

export type TStorageType = "local" | "session";
class StorageHandler implements IStorageHandler {
  storage: Storage;

  constructor(storageType?: TStorageType) {
    if (storageType === "session") {
      this.storage = sessionStorage;
    } else {
      this.storage = localStorage;
    }
  }

  set(key: string, value: any, ttl: number | null = null): void {
    if (ttl) {
      const now = new Date();
      // Create an object to store the value along with the expiration time
      const item = {
        value: value,
        expiry: now.getTime() + ttl,
      };
      this.storage.setItem(key, JSON.stringify(item));
    } else this.storage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    const value = this.storage.getItem(key);
    if (value) {
      const item = JSON.parse(value);
      if (item.expiry) {
        const now = new Date();

        // If the item has an expiry and has expired, remove it and return null
        if (now.getTime() > item.expiry) {
          localStorage.removeItem(key);
          return null;
        }
        return item.value;
      } else {
        return item;
      }
    } else {
      return null;
    }
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

export default StorageHandler;
