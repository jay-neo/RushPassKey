/// <reference types="vite/client" />

type AccountPassConfig = {
  alphabet: boolean;
  number: boolean;
  symbols: boolean;
  casing_enabled: boolean;
  casing: "small" | "capital";
  min_password_value: number;
  max_password_value: number;
};

type AccountServer = AccountPassConfig & {
  account_name: string;
  website_url: string;
  email: string;
  username: string;
  phone: string;
};

type AccountClient = {
  id: string;
  account_name: string;
  website_url: string;
  last_updated: String;
  last_used: String;
  email: string;
  username: string;
  phone: string;
};

type PasswordResult = {
  password: string;
  last_used: String;
}
