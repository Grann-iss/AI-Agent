// backend/src/service/AuthService.ts
export const authenticate = (token: string) => {
  return token === 'mock-token';
};
