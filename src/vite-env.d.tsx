/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY_COUNTRY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}