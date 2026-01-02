import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'ward_admin' | 'super_admin';
  phone?: string;
  address?: string;
  createdAt: string;
  ward: string;
  wardNo: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: 'user' | 'ward_admin' | 'super_admin') => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'user' | 'ward_admin' | 'super_admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize default admin account and check logged in user
  useEffect(() => {
    // Always ensure admin accounts exist (recreate after cache clear)
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let credentials = JSON.parse(localStorage.getItem('credentials') || '[]');
    
    let updated = false;
    
    // Create Ward Admin for Rohini
    const wardAdminExists = users.some((u: User) => u.email === 'wardadmin@rohini.gov.in');
    if (!wardAdminExists) {
      const wardAdminUser: User = {
        id: 'ward_admin_rohini',
        name: 'Rohini Ward Administrator',
        email: 'wardadmin@rohini.gov.in',
        role: 'ward_admin',
        phone: '+91 11 2345 6789',
        createdAt: new Date().toISOString(),
        ward: 'Rohini',
        wardNo: 8,
      };
      
      const wardAdminCred = {
        email: 'wardadmin@rohini.gov.in',
        password: 'wardadmin123',
        userId: 'ward_admin_rohini',
      };
      
      users.push(wardAdminUser);
      credentials.push(wardAdminCred);
      updated = true;
      
      console.log('✅ Ward Admin account created');
      console.log('📧 Email: wardadmin@rohini.gov.in');
      console.log('🔑 Password: wardadmin123');
    }
    
    // Create Super Admin for city-level oversight
    const superAdminExists = users.some((u: User) => u.email === 'superadmin@delhi.gov.in');
    if (!superAdminExists) {
      const superAdminUser: User = {
        id: 'super_admin_delhi',
        name: 'Delhi City Administrator',
        email: 'superadmin@delhi.gov.in',
        role: 'super_admin',
        phone: '+91 11 1234 5678',
        createdAt: new Date().toISOString(),
        ward: 'Delhi (All Wards)', // City-level, not ward-specific
        wardNo: 0, // 0 indicates city-wide access, not a specific ward
      };
      
      const superAdminCred = {
        email: 'superadmin@delhi.gov.in',
        password: 'superadmin123',
        userId: 'super_admin_delhi',
      };
      
      users.push(superAdminUser);
      credentials.push(superAdminCred);
      updated = true;
      
      console.log('✅ Super Admin account created');
      console.log('📧 Email: superadmin@delhi.gov.in');
      console.log('🔑 Password: superadmin123');
    }
    
    // Only save if accounts were created
    if (updated) {
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('credentials', JSON.stringify(credentials));
      console.log('💾 Admin accounts saved to localStorage');
    }

    // Check if user is logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const signup = async (data: SignupData): Promise<boolean> => {
    try {
      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      if (existingUsers.some((u: User) => u.email === data.email)) {
        toast.error('Email already registered!');
        return false;
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone,
        createdAt: new Date().toISOString(),
        ward: 'Rohini',
        wardNo: 8,
      };

      // Store user credentials (password hashed in real app)
      const credentials = {
        email: data.email,
        password: data.password, // In production: hash this!
        userId: newUser.id,
      };

      // Save to localStorage
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      const existingCredentials = JSON.parse(localStorage.getItem('credentials') || '[]');
      existingCredentials.push(credentials);
      localStorage.setItem('credentials', JSON.stringify(existingCredentials));

      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Signup failed. Please try again.');
      return false;
    }
  };

  const login = async (email: string, password: string, role: 'user' | 'ward_admin' | 'super_admin'): Promise<boolean> => {
    try {
      // Get credentials
      const credentials = JSON.parse(localStorage.getItem('credentials') || '[]');
      const userCredential = credentials.find(
        (c: any) => c.email === email && c.password === password
      );

      if (!userCredential) {
        toast.error('Invalid email or password!');
        return false;
      }

      // Get user data
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userData = users.find((u: User) => u.id === userCredential.userId);

      if (!userData) {
        toast.error('User not found!');
        return false;
      }

      // Check role
      if (userData.role !== role) {
        const roleNames = {
          user: 'User',
          ward_admin: 'Ward Admin',
          super_admin: 'Super Admin'
        };
        toast.error(`This account is not registered as ${roleNames[role]}!`);
        return false;
      }

      // Set current user
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      toast.success(`Welcome back, ${userData.name}!`);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully!');
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Update in users list
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }

    toast.success('Profile updated successfully!');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
