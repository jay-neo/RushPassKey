/// <reference types="vite/client" />

type GeneratePassword = {
  accountName: string;
  websiteUrl: string;
  email: string;
  username: string;
  phone: string;
  alphabet: boolean;
  number: boolean;
  symbols: boolean;
  casingEnabled: boolean;
  casing: "small" | "capital";
  minPasswordValue: number;
  maxPasswordValue: number;
};
