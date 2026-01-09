import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Shield, CloudRain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

interface RoleLoginCardProps {
  role: 'user' | 'ward_admin' | 'super_admin';
  title: string;
  description?: string;
  subtitle?: string;
  buttonText: string;
  redirectPath: string;
  demoCredentials?: {
    email: string;
    password: string;
  };
}

export default function RoleLoginCard({
  role,
  title,
  description,
  subtitle,
  buttonText,
  redirectPath,
  demoCredentials,
}: RoleLoginCardProps) {
  const navigate = useNavigate();
  const { login, isAuthenticated, user: currentUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Redirect if already logged in
  if (isAuthenticated && currentUser) {
    if (currentUser.role === 'super_admin') {
      navigate('/super-admin-dashboard');
    } else if (currentUser.role === 'ward_admin') {
      navigate('/ward-admin-dashboard');
    } else if (currentUser.role === 'field_worker') {
      navigate('/field-worker');
    } else {
      navigate('/user-dashboard');
    }
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }

    setIsLoading(true);
    
    const success = await login(formData.email, formData.password, role);
    
    setIsLoading(false);

    if (success) {
      // Redirect to specified path
      setTimeout(() => {
        navigate(redirectPath);
      }, 500);
    }
  };

  const getRoleIcon = () => {
    if (role === 'user') return <User className="h-5 w-5 text-blue-600" />;
    return <Shield className="h-5 w-5 text-blue-600" />;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-3">
            {/* Logo Image with Rounded Corners */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/30 transition-all duration-300"></div>
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 shadow-2xl group-hover:shadow-primary/25 transition-all duration-300">
                <CloudRain className="h-16 w-16 text-blue-600" />
              </div>
            </div>
            
            {/* App Name */}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Delhi WaterWatch
              </h1>
              <p className="text-muted-foreground text-sm mt-1">Sign in to access your account</p>
            </div>
          </Link>
        </div>

        <Card className="glass-card">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              {getRoleIcon()}
            </div>
            <CardTitle className="text-2xl text-center">{title}</CardTitle>
            {description && (
              <CardDescription className="text-center">
                {description}
              </CardDescription>
            )}
            {subtitle && (
              <p className="text-sm text-muted-foreground text-center mt-2 font-medium">
                {subtitle}
              </p>
            )}
          </CardHeader>
          <CardContent>
            {/* Demo Credentials Banner */}
            {demoCredentials && (
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 mb-4">
                <p className="text-xs text-primary flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Demo: {demoCredentials.email} / {demoCredentials.password}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={
                      role === 'user' 
                        ? "user@example.com" 
                        : role === 'ward_admin'
                        ? "wardadmin@example.gov.in"
                        : "admin@delhi.gov.in"
                    }
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              {role === 'user' && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">Forgot password?</a>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full gradient-primary text-primary-foreground" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : buttonText}
              </Button>
            </form>

            {role === 'user' && (
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}
