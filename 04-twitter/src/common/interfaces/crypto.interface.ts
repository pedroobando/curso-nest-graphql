export interface ICryptoAdapter {
  hash(password: string): string;
  compare(password: string, hash: string): boolean;
}
