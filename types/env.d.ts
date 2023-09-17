declare module "bun" {
  export interface Env {
    NODE_ENV: string;
    PORT: number;
    DATABASE_URL: string;
  }
}
