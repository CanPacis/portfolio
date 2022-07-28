export type Environmet = "development" | "production" | "preview";

export function useEnvironment(): Environmet {
  return process.env.NEXT_PUBLIC_VERCEL_ENV! as Environmet;
}
