/// <reference types="vite/client" />

interface Window {
  localStorage: Storage;
}

interface HTMLInputElement {
  name: string;
  value: string;
}
