import React, { createContext, useState, useContext, useEffect } from "react";
import { endpoints } from "../config/config";

// Fixed User type to match ACTUAL backend response
type User = {
  _id: string;
  name: string;
  email: string;
  displayName?: string;
  role?: string;
  // Add other actual fields from your backend
  [key: string]: any;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  handleSignup: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
  handleLogin: (email: string, password: string) => Promise<boolean>;
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore auth state on app load
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUserID = localStorage.getItem('userID');
    
    if (savedToken) {
      setToken(savedToken);
      // Fetch fresh user data
      if (savedUserID) {
        getUserData(savedToken).then((userData) => {
          console.log("Restored user:", userData);
          setUser(userData || null);
        }).catch(() => {
          // Invalid token, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('userID');
          setToken(null);
        });
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(endpoints.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("=== FULL LOGIN RESPONSE ===", data);
      console.log("data.user:", data.user);
      console.log("data.data:", data.data);
      
      if (response.ok && data.token) {
        setToken(data.token);
        
        // Try multiple possible user data locations
        const userData = data.user || data.data || data.profile;
        console.log("✅ SETTING USER DATA:", userData);
        
        if (userData && userData._id) {
          setUser(userData);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userID', userData._id);
        } else {
          console.error("❌ No valid user data found in response");
          return false;
        }
        
        return true;
      } else {
        console.error("❌ Login failed:", data.message);
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Failed:', error);
      return false;
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      if (token) {
        await fetch(endpoints.logout, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Always clear state regardless of API result
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
    }
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    handleSignup: async () => false, // Implement as needed
    handleLogin,
    handleLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Fixed getUserData return type
export const getUserData = async (token: string | null): Promise<User | null> => {
  if (!token) return null;
  
  try {
    const response = await fetch(endpoints.fetchProfileData, {
      headers: { "Authorization": `Bearer ${token}` },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data as User;
  } catch (error) {
    console.error("getUserData error:", error);
    return null;
  }
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
