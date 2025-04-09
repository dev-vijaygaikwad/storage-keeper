export interface IStorageHandler {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T, ttl: number | null): void;
  clear(): void;
  remove(key: string): void;
}
