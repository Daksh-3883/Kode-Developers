/// <reference types="vite/client" />

declare module "*.html?raw" {
  const value: string;
  export default value;
}

declare module "*.json" {
  const value: any;
  export default value;
}
