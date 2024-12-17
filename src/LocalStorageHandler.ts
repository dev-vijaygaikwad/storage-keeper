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

  set(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

export default StorageHandler;
