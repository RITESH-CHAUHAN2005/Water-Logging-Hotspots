import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  CheckCircle,
  Clock,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { UserReport } from '@/types';

const FieldWorkerAnalytics = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [myReports, setMyReports] = useState<UserReport[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/field-worker/login');
      return;
    }
    if (user?.role !== 'field_worker') {
      navigate('/');
      return;
    }

    loadMyReports();
  }, [isAuthenticated, user, navigate]);

  const loadMyReports = () => {
    const allReports = JSON.parse(localStorage.getItem('userReports') || '[]') as UserReport[];
    const myReports = allReports.filter(
      (r: UserReport) => r.assignedWorkerId === user?.id
    );
    setMyReports(myReports);
  };

  if (!user || user.role !== 'field_worker') {
    return null;
  }

  // Calculate statistics
  const totalCompleted = myReports.filter(
    r => r.status === 'Work Completed' || r.status === 'Resolved'
  ).length;

  const totalInProgress = myReports.filter(r => r.status === 'In Progress').length;
  const totalAssigned = myReports.filter(r => r.status === 'Assigned').length;

  // Calculate average resolution time (for completed tasks)
  const completedWithTime = myReports.filter(
    r => r.workerStartedAt && r.workerCompletedAt
  );

  let avgResolutionTime = 0;
  if (completedWithTime.length > 0) {
    const totalTime = completedWithTime.reduce((acc, r) => {
      const start = new Date(r.workerStartedAt!).getTime();
      const end = new Date(r.workerCompletedAt!).getTime();
      return acc + (end - start);
    }, 0);
    avgResolutionTime = totalTime / completedWithTime.length / (1000 * 60 * 60); // Convert to hours
  }

  // Group by date for simple chart
  const tasksByDate: Record<string, number> = {};
  myReports.forEach(report => {
    if (report.workerCompletedAt) {
      const date = new Date(report.workerCompletedAt).toLocaleDateString();
      tasksByDate[date] = (tasksByDate[date] || 0) + 1;
    }
  });

  const chartData = Object.entries(tasksByDate)
    .slice(-7)
    .map(([date, count]) => ({ date, count }));

  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/30">
              <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">My Performance</h1>
              <p className="text-muted-foreground">Track your work statistics</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{myReports.length}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{totalCompleted}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {myReports.length > 0
                  ? `${((totalCompleted / myReports.length) * 100).toFixed(0)}% completion rate`
                  : 'No tasks yet'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
              <Clock className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">
                {avgResolutionTime > 0 ? avgResolutionTime.toFixed(1) : '0'}h
              </div>
              <p className="text-xs text-muted-foreground mt-1">Per task</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {totalInProgress + totalAssigned}
              </div>
              <p className="text-xs text-muted-foreground mt-1">In progress + assigned</p>
            </CardContent>
          </Card>
        </div>

        {/* Simple Chart - Tasks Completed by Date */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Completions (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No completed tasks to display yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {chartData.map((data, index) => (
                  <motion.div
                    key={data.date}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-24 text-sm text-muted-foreground">{data.date}</div>
                    <div className="flex-1 relative">
                      <div
                        className="h-8 bg-green-500 dark:bg-green-600 rounded transition-all duration-500"
                        style={{ width: `${(data.count / Math.max(...chartData.map(d => d.count))) * 100}%` }}
                      />
                      <span className="absolute right-2 top-1 text-xs font-medium text-white">
                        {data.count} {data.count === 1 ? 'task' : 'tasks'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Priority Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tasks by Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Critical', 'High', 'Medium', 'Low'].map(priority => {
                  const count = myReports.filter(r => r.priority === priority).length;
                  const percentage = myReports.length > 0 ? (count / myReports.length) * 100 : 0;
                  const colorClass =
                    priority === 'Critical'
                      ? 'bg-red-500'
                      : priority === 'High'
                      ? 'bg-orange-500'
                      : priority === 'Medium'
                      ? 'bg-yellow-500'
                      : 'bg-blue-500';

                  return (
                    <div key={priority}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{priority}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${colorClass} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tasks by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { status: 'Assigned', color: 'bg-purple-500' },
                  { status: 'In Progress', color: 'bg-amber-500' },
                  { status: 'Work Completed', color: 'bg-green-500' },
                  { status: 'Resolved', color: 'bg-emerald-500' },
                ].map(({ status, color }) => {
                  const count = myReports.filter(r => r.status === status).length;
                  const percentage = myReports.length > 0 ? (count / myReports.length) * 100 : 0;

                  return (
                    <div key={status}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{status}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${color} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FieldWorkerAnalytics;
