/// <reference types="vite/client" />

type AccountServer = {
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

type AccountClient = {
  account_name: string;
  website_url: string;
  last_updated: Date;
  last_used?: Date;
  email: string;
  username: string;
  phone: string;
  password: string;
};
