export interface IStorageHandler {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  clear(): void;
  remove(key: string): void;
}
