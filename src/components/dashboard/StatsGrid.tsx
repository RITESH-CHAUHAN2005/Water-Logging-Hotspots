import { MapPin, CheckCircle, AlertTriangle, Activity } from 'lucide-react';
import { StatCard } from './StatCard';
import { stats } from '@/data/mockData';

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <StatCard
        title="Total Hotspots"
        value={stats.totalHotspots}
        subtitle="In Rohini ward"
        icon={MapPin}
        gradient="primary"
        delay={0}
        trend="stable"
        trendValue="No change"
      />
      <StatCard
        title="High Risk Zones"
        value={stats.highRiskZones}
        subtitle="Requiring immediate attention"
        icon={AlertTriangle}
        gradient="destructive"
        delay={0.1}
        trend="up"
        trendValue="+1 this week"
        isPriority={true}
      />
      <StatCard
        title="Ward Readiness"
        value={`${stats.wardReadiness}%`}
        subtitle="Flood response capacity"
        icon={CheckCircle}
        gradient="success"
        delay={0.2}
        trend="up"
        trendValue="+5% improved"
      />
      <StatCard
        title="Active Alerts"
        value={stats.activeAlerts}
        subtitle="In your ward"
        icon={Activity}
        gradient="warning"
        delay={0.3}
        isBlinking={stats.activeAlerts > 0}
        trend="up"
        trendValue="+2 new"
        isPriority={true}
      />
    </div>
  );
}