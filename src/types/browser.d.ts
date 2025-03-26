/// <reference types="vite/client" />

declare global {
  interface Window {
    localStorage: Storage;
  }
}

interface HTMLInputElement {
  name: string;
  value: string;
}
