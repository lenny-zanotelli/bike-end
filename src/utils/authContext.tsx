import React, {
  createContext, useState, useEffect, useCallback, ReactNode, useMemo,
} from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = useCallback((token: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  }, []);

  const authContextValue = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
