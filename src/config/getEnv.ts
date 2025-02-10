import dotenv from 'dotenv';
dotenv.config();

export function getEnv(key: string, defaultValue?: string): string {
    const value = process.env[key] || defaultValue;
    if (value === undefined) {
      throw new Error(`Environment variable ${key} is missing.`);
    }
    return value;
  }