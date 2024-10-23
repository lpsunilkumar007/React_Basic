// src/client_api/apiClient/index.ts
// this file serves as entry point to api
// src/client_api/apiClient/index.ts
import { Client } from './ApiClient';
export function createApiClient() {
  return new Client();
}