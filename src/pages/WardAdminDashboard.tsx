import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronRight,
  Eye,
  Image as ImageIcon,
  Navigation,
  Check,
  X as XIcon,
  Clock,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  UserCheck
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { isNearSensitiveArea } from '@/data/mockData';

interface Report {
  id: number;
  userId: string;
  user: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  status: 'Pending' | 'In Progress' | 'Assigned' | 'Work Completed' | 'Resolved' | 'Rejected';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  date: string;
  image?: string | null;
  feedback?: 'positive' | 'negative' | null;
  feedbackDate?: string;
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  completionProofUrl?: string;
  workerStartedAt?: string;
  workerCompletedAt?: string;
}

const WardAdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [wardUsers, setWardUsers] = useState<any[]>([]);
  const [wardReports, setWardReports] = useState<Report[]>([]);
  const [wardHotspots, setWardHotspots] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [fieldWorkers, setFieldWorkers] = useState<any[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [reportToAssign, setReportToAssign] = useState<number | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<string>('');

  // Redirect if not logged in or not ward admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.role !== 'ward_admin') {
      navigate('/');
      return;
    }

    const loadData = () => {
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const allReports = JSON.parse(localStorage.getItem('userReports') || '[]');
      const allHotspots = JSON.parse(localStorage.getItem('markedHotspots') || '[]');
      
      console.log('🔍 Ward Admin - Loading data for ward:', user.ward);
      console.log('📊 Total reports in system:', allReports.length);
      
      // Filter data for current ward only
      const currentWard = user.ward;
      const filteredUsers = allUsers.filter((u: any) => u.ward === currentWard);
      
      // More flexible report filtering - check ward field first, then location
      const filteredReports = allReports.filter((r: any) => {
        const matchesWard = r.ward === currentWard;
        const matchesLocation = r.location?.toLowerCase().includes(currentWard.toLowerCase());
        const match = matchesWard || matchesLocation;
        
        if (match) {
          console.log('✅ Report matches:', { id: r.id, ward: r.ward, location: r.location });
        }
        
        return match;
      });
      
      console.log('📋 Filtered reports for ward:', filteredReports.length);
      
      const filteredHotspots = allHotspots.filter((h: any) => 
        h.wardNo === user.wardNo || h.location?.toLowerCase().includes(currentWard.toLowerCase())
      );
      
      // Get field workers for this ward
      const workers = allUsers.filter((u: any) => 
        u.role === 'field_worker' && u.ward === currentWard
      );
      
      setWardUsers(filteredUsers);
      setWardReports(filteredReports);
      setWardHotspots(filteredHotspots);
      setFieldWorkers(workers);
    };

    loadData();
    window.addEventListener('reportsUpdated', loadData);
    return () => window.removeEventListener('reportsUpdated', loadData);
  }, [isAuthenticated, user, navigate]);

  if (!user || user.role !== 'ward_admin') {
    return null;
  }

  // Accept Report & Show Assignment Modal
  const acceptReport = (reportId: number) => {
    setReportToAssign(reportId);
    setShowAssignModal(true);
  };

  // Assign Report to Field Worker
  const assignToWorker = () => {
    if (!selectedWorker || !reportToAssign) {
      toast.error('Please select a field worker');
      return;
    }

    const worker = fieldWorkers.find(w => w.id === selectedWorker);
    if (!worker) {
      toast.error('Field worker not found');
      return;
    }

    const reports = JSON.parse(localStorage.getItem('userReports') || '[]');
    const updatedReports = reports.map((r: any) => 
      r.id === reportToAssign ? { 
        ...r, 
        status: 'Assigned',
        assignedWorkerId: worker.id,
        assignedWorkerName: worker.name,
        assignedAt: new Date().toISOString()
      } : r
    );
    localStorage.setItem('userReports', JSON.stringify(updatedReports));
    window.dispatchEvent(new Event('reportsUpdated'));
    
    toast.success(`Report assigned to ${worker.name}!`, {
      duration: 3000,
      style: {
        background: '#22c55e',
        color: 'white',
        fontWeight: '600',
      },
    });
    
    setShowAssignModal(false);
    setReportToAssign(null);
    setSelectedWorker('');
    setSelectedReport(null);
  };

  // Reject Report
  const rejectReport = (reportId: number) => {
    const reports = JSON.parse(localStorage.getItem('userReports') || '[]');
    const updatedReports = reports.map((r: Report) => 
      r.id === reportId ? { ...r, status: 'Rejected' as const } : r
    );
    localStorage.setItem('userReports', JSON.stringify(updatedReports));
    window.dispatchEvent(new Event('reportsUpdated'));
    toast.error('Report rejected!');
    setSelectedReport(null);
  };

  // Resolve Report
  const resolveReport = (reportId: number) => {
    const reports = JSON.parse(localStorage.getItem('userReports') || '[]');
    const updatedReports = reports.map((r: Report) => 
      r.id === reportId ? { ...r, status: 'Resolved' as const } : r
    );
    localStorage.setItem('userReports', JSON.stringify(updatedReports));
    window.dispatchEvent(new Event('reportsUpdated'));
    toast.success('Report marked as resolved!');
    setSelectedReport(null);
  };

  // Delete Report
  const deleteReport = (reportId: number) => {
    const reports = JSON.parse(localStorage.getItem('userReports') || '[]');
    const updatedReports = reports.filter((r: Report) => r.id !== reportId);
    localStorage.setItem('userReports', JSON.stringify(updatedReports));
    window.dispatchEvent(new Event('reportsUpdated'));
    toast.success('Report deleted successfully!', {
      duration: 2500,
    });
    setSelectedReport(null);
  };

  const stats = {
    totalUsers: wardUsers.length,
    totalReports: wardReports.length,
    activeAlerts: wardReports.filter(r => r.status === 'Pending' || r.status === 'Assigned' || r.status === 'In Progress' || r.status === 'Work Completed').length,
    resolvedToday: wardReports.filter(r => {
      const reportDate = new Date(r.date);
      const today = new Date();
      return r.status === 'Resolved' && reportDate.toDateString() === today.toDateString();
    }).length,
    positiveFeedback: wardReports.filter(r => r.status === 'Resolved' && r.feedback === 'positive').length,
    negativeFeedback: wardReports.filter(r => r.status === 'Resolved' && r.feedback === 'negative').length,
    resolvedWithFeedback: wardReports.filter(r => r.status === 'Resolved' && r.feedback).length,
    totalResolved: wardReports.filter(r => r.status === 'Resolved').length,
  };

  const recentReports = wardReports
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'High': return 'bg-warning/20 text-warning border-warning/30';
      case 'Medium': return 'bg-primary/20 text-primary border-primary/30';
      default: return 'bg-secondary text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-success/20 text-success border-success/30';
      case 'Work Completed': return 'bg-blue-500/20 text-blue-600 border-blue-500/30';
      case 'Assigned': return 'bg-orange-500/20 text-orange-600 border-orange-500/30';
      case 'In Progress': return 'bg-warning/20 text-warning border-warning/30';
      case 'Pending': return 'bg-primary/20 text-primary border-primary/30';
      case 'Rejected': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-secondary text-muted-foreground';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const viewOnMap = (lat: number, lng: number, reportId?: number) => {
    if (reportId) {
      navigate(`/map?lat=${lat}&lng=${lng}&reportId=${reportId}`);
    } else {
      navigate(`/map?lat=${lat}&lng=${lng}`);
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Ward Banner */}
        <div className="glass-card-elevated rounded-xl p-4 bg-gradient-to-r from-warning/10 to-warning/5 border-l-4 border-warning">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-warning/20 p-2">
              <Building2 className="h-5 w-5 text-warning" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Managing: {user.ward} Ward</h2>
              <p className="text-sm text-muted-foreground">Ward No. {user.wardNo} - Administrator controls and monitoring</p>
            </div>
          </div>
        </div>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-warning/20 flex items-center justify-center">
              <Shield className="h-8 w-8 text-warning" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Ward Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Admin Badge */}
        <div className="p-4 rounded-xl bg-warning/10 border border-warning/20 flex items-center gap-3">
          <Shield className="h-5 w-5 text-warning" />
          <div>
            <p className="font-semibold text-sm">Ward Administrator Access</p>
            <p className="text-xs text-muted-foreground">Managing {user.ward} Ward - You can verify and resolve reports in your ward</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  <p className="text-xs text-muted-foreground">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/20">
                  <FileText className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalReports}</p>
                  <p className="text-xs text-muted-foreground">Total Reports</p>
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
                <div>
                  <p className="text-2xl font-bold">{stats.activeAlerts}</p>
                  <p className="text-xs text-muted-foreground">Active Alerts</p>
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
                <div>
                  <p className="text-2xl font-bold">{stats.resolvedToday}</p>
                  <p className="text-xs text-muted-foreground">Resolved Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-success" />
                  <p className="text-xs text-muted-foreground">Satisfaction</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-bold">
                    {stats.totalResolved > 0 
                      ? Math.round((stats.positiveFeedback / stats.totalResolved) * 100)
                      : 0}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ({stats.positiveFeedback}/{stats.totalResolved})
                  </p>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="text-success flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" /> {stats.positiveFeedback}
                  </span>
                  <span className="text-destructive flex items-center gap-1">
                    <ThumbsDown className="h-3 w-3" /> {stats.negativeFeedback}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Reports */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Recent Reports
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              {recentReports.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
                  <p className="text-sm text-muted-foreground">No reports yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {wardReports.map((report, index) => {
                    // Check if report is near sensitive area
                    const proximityCheck = isNearSensitiveArea(report.latitude, report.longitude, user.ward);
                    const isNearSensitive = proximityCheck.isNear;

                    return (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border transition-colors ${
                        isNearSensitive 
                          ? 'bg-red-50/50 dark:bg-red-950/20 border-red-400 dark:border-red-800 shadow-sm' 
                          : 'bg-secondary/50 border-border/50'
                      } hover:bg-secondary/70`}
                    >
                      {/* Sensitive Area Warning Banner */}
                      {isNearSensitive && (
                        <div className="mb-3 flex items-start gap-2 p-2.5 rounded-lg bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-800">
                          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-red-800 dark:text-red-300">
                              Critical Priority Zone
                            </p>
                            <p className="text-xs text-red-700 dark:text-red-400 mt-0.5">
                              Within 750m of {proximityCheck.nearestArea?.name} • Distance: {(proximityCheck.distance! * 1000).toFixed(0)}m
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                            <MapPin className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-sm">Report #{report.id}</p>
                              {report.image && <ImageIcon className="h-3 w-3 text-primary" />}
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">By: {report.user}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{report.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <Badge className={getStatusColor(report.status)} variant="outline">
                            {report.status}
                          </Badge>
                          <Badge className={getPriorityColor(report.priority)} variant="outline">
                            {report.priority}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                        </span>
                        <span>{new Date(report.date).toLocaleDateString()}</span>
                      </div>

                      {/* Display user feedback for resolved reports */}
                      {report.status === 'Resolved' && report.feedback && (
                        <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-1 text-xs">
                            {report.feedback === 'positive' ? (
                              <>
                                <ThumbsUp className="h-3.5 w-3.5 text-success fill-success" />
                                <span className="text-success font-medium">Citizen satisfied with resolution</span>
                              </>
                            ) : (
                              <>
                                <ThumbsDown className="h-3.5 w-3.5 text-destructive fill-destructive" />
                                <span className="text-destructive font-medium">Citizen unsatisfied with resolution</span>
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Display assigned worker info */}
                      {(report.status === 'Assigned' || report.status === 'In Progress' || report.status === 'Work Completed') && report.assignedWorkerName && (
                        <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                          <UserCheck className="h-3.5 w-3.5 text-orange-600" />
                          <span className="text-xs text-orange-700 dark:text-orange-400 font-medium">
                            Assigned to: {report.assignedWorkerName}
                          </span>
                        </div>
                      )}

                      {/* Show completion proof indicator */}
                      {report.status === 'Work Completed' && report.completionProofUrl && (
                        <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-success/10 border border-success/20">
                          <CheckCircle className="h-3.5 w-3.5 text-success" />
                          <span className="text-xs text-success font-medium">
                            Work completed with proof - Ready for verification
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 mt-3">
                        {report.status === 'Pending' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="default"
                              onClick={() => acceptReport(report.id)}
                              className="h-7 text-xs bg-success hover:bg-success/90"
                            >
                              <UserCheck className="h-3 w-3 mr-1" />
                              Assign Worker
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => rejectReport(report.id)}
                              className="h-7 text-xs"
                            >
                              <XIcon className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        {report.status === 'Work Completed' && (
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => resolveReport(report.id)}
                            className="h-7 text-xs bg-success hover:bg-success/90"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verify & Resolve
                          </Button>
                        )}
                        {report.status === 'In Progress' && (
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => resolveReport(report.id)}
                            className="h-7 text-xs bg-success hover:bg-success/90"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Mark Resolved
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedReport(report)}
                          className="h-7 text-xs flex-1"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => viewOnMap(report.latitude, report.longitude, report.id)}
                          className="h-7 text-xs flex-1"
                        >
                          <Navigation className="h-3 w-3 mr-1" />
                          Map
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => deleteReport(report.id)}
                          className="h-7 text-xs border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </motion.div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/alerts">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-sm">Manage Alerts</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/wards">
                  <Building2 className="h-5 w-5" />
                  <span className="text-sm">Ward Management</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/analytics">
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-sm">View Analytics</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/map">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm">Hotspot Map</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Report Details Modal */}
      <AnimatePresence>
        {selectedReport && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setSelectedReport(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl glass-card rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Report Details #{selectedReport.id}</h3>
                    <p className="text-sm text-muted-foreground">Submitted by {selectedReport.user}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedReport(null)}>
                    <XIcon className="h-5 w-5" />
                  </Button>
                </div>

                {selectedReport.image && (
                  <div className="mb-6 rounded-xl overflow-hidden border border-border/50">
                    <img src={selectedReport.image} alt="Report" className="w-full h-64 object-cover" />
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Description</p>
                    <p className="text-sm">{selectedReport.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Latitude</p>
                      <p className="text-sm font-mono">{selectedReport.latitude}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Longitude</p>
                      <p className="text-sm font-mono">{selectedReport.longitude}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Status</p>
                      <Badge className={getStatusColor(selectedReport.status)}>{selectedReport.status}</Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Priority</p>
                      <Badge className={getPriorityColor(selectedReport.priority)}>{selectedReport.priority}</Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Submitted On</p>
                    <p className="text-sm">{new Date(selectedReport.date).toLocaleString()}</p>
                  </div>

                  {/* Show assigned worker info */}
                  {selectedReport.assignedWorkerName && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Assigned To</p>
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-orange-600" />
                        <p className="text-sm font-medium">{selectedReport.assignedWorkerName}</p>
                      </div>
                    </div>
                  )}

                  {/* Show work timeline */}
                  {selectedReport.workerStartedAt && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Work Started</p>
                      <p className="text-sm">{new Date(selectedReport.workerStartedAt).toLocaleString()}</p>
                    </div>
                  )}

                  {selectedReport.workerCompletedAt && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Work Completed</p>
                      <p className="text-sm">{new Date(selectedReport.workerCompletedAt).toLocaleString()}</p>
                    </div>
                  )}

                  {/* Show completion proof for Work Completed reports */}
                  {selectedReport.status === 'Work Completed' && selectedReport.completionProofUrl && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Completion Proof</p>
                      <div className="rounded-xl overflow-hidden border-2 border-success/30 shadow-lg">
                        <img 
                          src={selectedReport.completionProofUrl} 
                          alt="Completion Proof" 
                          className="w-full h-64 object-cover" 
                        />
                      </div>
                      <div className="mt-2 p-3 rounded-lg bg-success/10 border border-success/20">
                        <p className="text-xs text-success font-medium flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Field worker has uploaded proof of work completion. Please review and verify.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    {selectedReport.status === 'Pending' && (
                      <>
                        <Button className="flex-1 bg-success hover:bg-success/90" onClick={() => acceptReport(selectedReport.id)}>
                          <UserCheck className="h-4 w-4 mr-2" />
                          Assign Worker
                        </Button>
                        <Button variant="destructive" className="flex-1" onClick={() => rejectReport(selectedReport.id)}>
                          <XIcon className="h-4 w-4 mr-2" />
                          Reject Report
                        </Button>
                      </>
                    )}
                    {selectedReport.status === 'Work Completed' && (
                      <Button className="flex-1 bg-success hover:bg-success/90" onClick={() => resolveReport(selectedReport.id)}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Verify & Resolve
                      </Button>
                    )}
                    {selectedReport.status === 'In Progress' && (
                      <Button className="flex-1 bg-success hover:bg-success/90" onClick={() => resolveReport(selectedReport.id)}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Resolved
                      </Button>
                    )}
                    <Button onClick={() => viewOnMap(selectedReport.latitude, selectedReport.longitude, selectedReport.id)}>
                      <Navigation className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Field Worker Assignment Modal */}
      <AnimatePresence>
        {showAssignModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => {
                setShowAssignModal(false);
                setReportToAssign(null);
                setSelectedWorker('');
              }}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md glass-card rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Assign Field Worker</h3>
                    <p className="text-sm text-muted-foreground">Select a field worker to assign this report</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                      setShowAssignModal(false);
                      setReportToAssign(null);
                      setSelectedWorker('');
                    }}
                  >
                    <XIcon className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Available Field Workers</p>
                    {fieldWorkers.length === 0 ? (
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <p className="text-sm text-muted-foreground">No field workers available in {user.ward} ward</p>
                      </div>
                    ) : (
                      <Select value={selectedWorker} onValueChange={setSelectedWorker}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a field worker" />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldWorkers.map((worker) => (
                            <SelectItem key={worker.id} value={worker.id}>
                              <div className="flex items-center gap-2">
                                <UserCheck className="h-4 w-4" />
                                <div>
                                  <p className="font-medium">{worker.name}</p>
                                  <p className="text-xs text-muted-foreground">{worker.email}</p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      className="flex-1" 
                      variant="outline" 
                      onClick={() => {
                        setShowAssignModal(false);
                        setReportToAssign(null);
                        setSelectedWorker('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 bg-success hover:bg-success/90" 
                      onClick={assignToWorker}
                      disabled={!selectedWorker || fieldWorkers.length === 0}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Assign
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default WardAdminDashboard;
