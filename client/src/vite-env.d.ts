/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TRPC_SERVER: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
