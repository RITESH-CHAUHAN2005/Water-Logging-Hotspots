import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  HardHat,
  ClipboardList,
  Clock,
  CheckCircle,
  MapPin,
  AlertTriangle,
  Upload,
  Image as ImageIcon,
  PlayCircle,
  Navigation
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { UserReport } from '@/types';

const FieldWorkerDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [assignedReports, setAssignedReports] = useState<UserReport[]>([]);
  const [uploadingProof, setUploadingProof] = useState<number | null>(null);

  // Redirect if not logged in or not field worker
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/field-worker/login');
      return;
    }
    if (user?.role !== 'field_worker') {
      navigate('/');
      return;
    }

    loadAssignedReports();
  }, [isAuthenticated, user, navigate]);

  const loadAssignedReports = () => {
    const allReports = JSON.parse(localStorage.getItem('userReports') || '[]') as UserReport[];
    
    // Filter reports assigned to this field worker
    const myReports = allReports.filter(
      (r: UserReport) => r.assignedWorkerId === user?.id
    );
    
    setAssignedReports(myReports);
  };

  if (!user || user.role !== 'field_worker') {
    return null;
  }

  // Start working on a task
  const startTask = (reportId: number) => {
    const allReports = JSON.parse(localStorage.getItem('userReports') || '[]');
    const updatedReports = allReports.map((r: UserReport) =>
      r.id === reportId
        ? {
            ...r,
            status: 'In Progress' as const,
            workerStartedAt: new Date().toISOString(),
          }
        : r
    );
    localStorage.setItem('userReports', JSON.stringify(updatedReports));
    window.dispatchEvent(new Event('reportsUpdated'));
    loadAssignedReports();
    toast.success('Task marked as In Progress', { duration: 2000 });
  };

  // Upload completion proof
  const uploadProof = (reportId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingProof(reportId);

    // Simulate image upload and convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      
      const allReports = JSON.parse(localStorage.getItem('userReports') || '[]');
      const updatedReports = allReports.map((r: UserReport) =>
        r.id === reportId
          ? { ...r, completionProofUrl: base64 }
          : r
      );
      localStorage.setItem('userReports', JSON.stringify(updatedReports));
      window.dispatchEvent(new Event('reportsUpdated'));
      loadAssignedReports();
      
      setUploadingProof(null);
      toast.success('Completion proof uploaded', { duration: 2000 });
    };
    reader.readAsDataURL(file);
  };

  // Mark task as completed
  const completeTask = (reportId: number) => {
    const report = assignedReports.find(r => r.id === reportId);
    if (!report?.completionProofUrl) {
      toast.error('Please upload completion proof first');
      return;
    }

    const allReports = JSON.parse(localStorage.getItem('userReports') || '[]');
    const updatedReports = allReports.map((r: UserReport) =>
      r.id === reportId
        ? {
            ...r,
            status: 'Work Completed' as const,
            workerCompletedAt: new Date().toISOString(),
          }
        : r
    );
    localStorage.setItem('userReports', JSON.stringify(updatedReports));
    window.dispatchEvent(new Event('reportsUpdated'));
    loadAssignedReports();
    toast.success('Task marked as completed! Awaiting admin verification', { duration: 3000 });
  };

  // Calculate stats
  const assigned = assignedReports.filter(r => r.status === 'Assigned').length;
  const inProgress = assignedReports.filter(r => r.status === 'In Progress').length;
  const completed = assignedReports.filter(r => r.status === 'Work Completed' || r.status === 'Resolved').length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950/30 dark:text-red-300';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/30 dark:text-orange-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-950/30 dark:text-yellow-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/30 dark:text-blue-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Assigned': return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/30 dark:text-purple-300';
      case 'In Progress': return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/30 dark:text-amber-300';
      case 'Work Completed': return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-950/30 dark:text-green-300';
      case 'Resolved': return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/30 dark:text-emerald-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-950/30 dark:text-gray-300';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950/30">
              <HardHat className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Field Worker Dashboard</h1>
              <p className="text-muted-foreground">
                {user.name} • {user.ward} Ward
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Assigned Tasks</CardTitle>
              <ClipboardList className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{assigned}</div>
              <p className="text-xs text-muted-foreground mt-1">Waiting to start</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">{inProgress}</div>
              <p className="text-xs text-muted-foreground mt-1">Currently working</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{completed}</div>
              <p className="text-xs text-muted-foreground mt-1">Tasks finished</p>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Reports List */}
        <Card>
          <CardHeader>
            <CardTitle>My Assigned Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {assignedReports.length === 0 ? (
              <div className="text-center py-12">
                <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No tasks assigned yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {assignedReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">Task #{report.id}</h3>
                          {report.image && <ImageIcon className="h-4 w-4 text-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{report.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className={getStatusColor(report.status)} variant="outline">
                          {report.status}
                        </Badge>
                        <Badge className={getPriorityColor(report.priority)} variant="outline">
                          {report.priority}
                        </Badge>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {/* View on Map */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/map?reportId=${report.id}&lat=${report.latitude}&lng=${report.longitude}`)}
                        className="h-8 text-xs"
                      >
                        <Navigation className="h-3 w-3 mr-1" />
                        View on Map
                      </Button>

                      {/* Start Task */}
                      {report.status === 'Assigned' && (
                        <Button
                          size="sm"
                          onClick={() => startTask(report.id)}
                          className="h-8 text-xs bg-amber-600 hover:bg-amber-700"
                        >
                          <PlayCircle className="h-3 w-3 mr-1" />
                          Start Task
                        </Button>
                      )}

                      {/* Upload Proof */}
                      {report.status === 'In Progress' && (
                        <>
                          <label htmlFor={`proof-${report.id}`}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs"
                              onClick={() => document.getElementById(`proof-${report.id}`)?.click()}
                              disabled={uploadingProof === report.id}
                            >
                              <Upload className="h-3 w-3 mr-1" />
                              {report.completionProofUrl ? 'Update Proof' : 'Upload Proof'}
                            </Button>
                          </label>
                          <input
                            id={`proof-${report.id}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => uploadProof(report.id, e)}
                          />

                          {report.completionProofUrl && (
                            <Button
                              size="sm"
                              onClick={() => completeTask(report.id)}
                              className="h-8 text-xs bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Mark Completed
                            </Button>
                          )}
                        </>
                      )}

                      {/* Show proof if uploaded */}
                      {report.completionProofUrl && (
                        <div className="w-full mt-2 p-2 border rounded-lg bg-muted/30">
                          <p className="text-xs text-muted-foreground mb-1">Completion Proof:</p>
                          <img
                            src={report.completionProofUrl}
                            alt="Completion proof"
                            className="w-full h-32 object-cover rounded"
                          />
                        </div>
                      )}
                    </div>

                    {/* Timestamps */}
                    <div className="mt-3 pt-3 border-t text-xs text-muted-foreground space-y-1">
                      <p>📅 Assigned: {new Date(report.date).toLocaleString()}</p>
                      {report.workerStartedAt && (
                        <p>▶️ Started: {new Date(report.workerStartedAt).toLocaleString()}</p>
                      )}
                      {report.workerCompletedAt && (
                        <p>✅ Completed: {new Date(report.workerCompletedAt).toLocaleString()}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FieldWorkerDashboard;
