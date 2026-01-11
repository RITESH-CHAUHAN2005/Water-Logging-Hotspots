import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  FileText, 
  AlertTriangle, 
  MapPin,
  CheckCircle,
  LogOut,
  BarChart3,
  Building2,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { wards, alerts, stats } from '@/data/mockData';

interface Report {
  id: number;
  userId: string;
  user: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  date: string;
  image?: string | null;
}

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [allHotspots, setAllHotspots] = useState<unknown[]>([]);

  // Redirect if not logged in or not super admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.role !== 'super_admin') {
      navigate('/');
      return;
    }

    const loadData = () => {
      const reports = JSON.parse(localStorage.getItem('userReports') || '[]');
      const hotspots = JSON.parse(localStorage.getItem('markedHotspots') || '[]');
      
      setAllReports(reports);
      setAllHotspots(hotspots);
    };

    loadData();
    window.addEventListener('reportsUpdated', loadData);
    return () => window.removeEventListener('reportsUpdated', loadData);
  }, [isAuthenticated, user, navigate]);

  if (!user || user.role !== 'super_admin') {
    return null;
  }

  // City-wide statistics (ALL WARDS)
  const cityStats = {
    totalWards: wards.length,
    totalHotspots: stats.totalHotspots,
    highRiskWards: wards.filter(w => w.readiness < 60).length,
    activeAlerts: alerts.filter(a => !a.isRead).length,
    totalReports: allReports.length,
    pendingReports: allReports.filter(r => r.status === 'Pending').length,
    inProgressReports: allReports.filter(r => r.status === 'In Progress').length,
    resolvedReports: allReports.filter(r => r.status === 'Resolved').length,
    averageReadiness: Math.round(wards.reduce((acc, w) => acc + w.readiness, 0) / wards.length),
  };

  const criticalAlerts = alerts.filter(a => a.severity === 'Critical' || a.severity === 'High');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome, {user.name}</p>
              <p className="text-xs text-muted-foreground">City-Level Oversight & Monitoring</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Super Admin Badge */}
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3">
          <Shield className="h-5 w-5 text-primary" />
          <div>
            <p className="font-semibold text-sm">Super Administrator Access</p>
            <p className="text-xs text-muted-foreground">City-wide monitoring and strategic oversight - Not responsible for individual issue resolution</p>
          </div>
        </div>

        {/* City Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Total Wards</p>
                  <p className="text-2xl font-bold">{cityStats.totalWards}</p>
                  <p className="text-xs text-muted-foreground">{cityStats.highRiskWards} high-risk</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/20">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold">{cityStats.activeAlerts}</p>
                  <p className="text-xs text-success flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    City-wide
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/20">
                  <MapPin className="h-5 w-5 text-warning" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Total Hotspots</p>
                  <p className="text-2xl font-bold">{cityStats.totalHotspots}</p>
                  <p className="text-xs text-muted-foreground">Across all wards</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/20">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Avg Readiness</p>
                  <p className="text-2xl font-bold">{cityStats.averageReadiness}%</p>
                  <p className="text-xs text-success flex items-center gap-1">
                    {cityStats.averageReadiness >= 70 ? (
                      <><TrendingUp className="h-3 w-3" /> Excellent</>
                    ) : cityStats.averageReadiness >= 60 ? (
                      <><TrendingUp className="h-3 w-3" /> Good</>
                    ) : (
                      <><TrendingDown className="h-3 w-3" /> Needs Attention</>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ward Performance */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Ward Performance Overview
              </span>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/wards">View All</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wards.map((ward, index) => (
                <motion.div
                  key={ward.wardNo}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{ward.name} Ward</h4>
                      <p className="text-xs text-muted-foreground">Ward No. {ward.wardNo}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={ward.readiness >= 60 ? "default" : "destructive"}>
                        {ward.readiness}% Ready
                      </Badge>
                      <Badge variant="outline">
                        {ward.hotspots} Hotspots
                      </Badge>
                    </div>
                  </div>
                  <Progress value={ward.readiness} className="h-2" />
                  <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <div>Pumps: {ward.resources.pumps}</div>
                    <div>Personnel: {ward.resources.personnel}</div>
                    <div>Vehicles: {ward.resources.vehicles}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reports Overview & Critical Alerts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Reports Summary */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                City-Wide Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5">
                  <span className="text-sm font-medium">Total Reports</span>
                  <span className="text-lg font-bold">{cityStats.totalReports}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-warning/5">
                  <span className="text-sm font-medium">Pending</span>
                  <span className="text-lg font-bold text-warning">{cityStats.pendingReports}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5">
                  <span className="text-sm font-medium">In Progress</span>
                  <span className="text-lg font-bold text-primary">{cityStats.inProgressReports}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/5">
                  <span className="text-sm font-medium">Resolved</span>
                  <span className="text-lg font-bold text-success">{cityStats.resolvedReports}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Ward admins handle individual report verification
              </p>
            </CardContent>
          </Card>

          {/* Critical Alerts */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Critical Alerts (City-Wide)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {criticalAlerts.length > 0 ? (
                  criticalAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-xs">
                            {alert.severity}
                          </Badge>
                          {alert.ward && (
                            <Badge variant="outline" className="text-xs">
                              {alert.ward}
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm">{alert.location}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No critical alerts at the moment
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Strategic Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/analytics">
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-sm">View Analytics</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/wards">
                  <Building2 className="h-5 w-5" />
                  <span className="text-sm">Ward Overview</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/alerts">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-sm">Monitor Alerts</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/map">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm">City Map</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default SuperAdminDashboard;
