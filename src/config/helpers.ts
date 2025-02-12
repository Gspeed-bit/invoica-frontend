export const isBrowser = () => typeof window !== 'undefined';

export const authTokenKey = 'authToken';
export const userKey = 'user';

export const setAuthToken = (token: string) => {
  if (isBrowser()) {
    localStorage.setItem(authTokenKey, token);
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth-token');
    return token || null;
  }
  return null;
};

export const clearAuthToken = () => {
  if (isBrowser()) {
    localStorage.removeItem(authTokenKey);
  }
};

export const setUser = (user: object) => {
  if (isBrowser()) {
    localStorage.setItem(userKey, JSON.stringify(user));
  }
};

export const getUser = () => {
  if (isBrowser()) {
    const userString = localStorage.getItem(userKey);
    return userString ? JSON.parse(userString) : null;
  }
  return null;
};

export const clearUser = () => {
  if (isBrowser()) {
    localStorage.removeItem(userKey);
  }
};
