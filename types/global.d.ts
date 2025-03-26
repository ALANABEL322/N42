/// <reference types="vite/client" />
export {};
// Tipos globales para el proyecto
declare global {
  interface Window {
    localStorage: Storage;
  }
}