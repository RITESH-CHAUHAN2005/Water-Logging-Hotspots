import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { WardGrid } from '@/components/wards/WardGrid';
import { HotspotsList } from '@/components/wards/HotspotsList';
import { Building2, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CURRENT_WARD } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const Wards = () => {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'super_admin';

  const pageTitle = isSuperAdmin
    ? 'Ward Management - City-Wide - Delhi WaterWatch'
    : `${CURRENT_WARD} Ward Monsoon Preparedness - Delhi WaterWatch`;

  const pageHeading = isSuperAdmin
    ? 'City-Wide Ward Management'
    : `${CURRENT_WARD} Ward Monsoon Preparedness`;

  const pageDescription = isSuperAdmin
    ? 'Monitor all wards across Delhi - readiness scores, resource allocation, and performance metrics'
    : "Monitor flood response readiness and resource allocation for your ward's water-logging hotspots";

  const alertDescription = isSuperAdmin
    ? 'City Overview: Compare ward readiness across Delhi. Each ward is scored based on hotspots, alerts, and available resources. Identify underperforming wards and strategic resource allocation opportunities.'
    : 'Ward Readiness Score: Measures your ward\'s capacity to handle water-logging incidents based on identified flood hotspots, active alerts, and available response resources (pumps, personnel, vehicles). Higher scores indicate better monsoon preparedness.';

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
            <Building2 className="h-7 w-7 text-primary" />
            {pageHeading}
          </h1>
          <p className="text-muted-foreground">{pageDescription}</p>
        </div>

        {/* Explanatory Banner */}
        <Alert className="glass-card border-primary/20">
          <Info className="h-4 w-4 text-primary" />
          <AlertDescription className="text-sm">
            <strong>{isSuperAdmin ? 'City-Wide Overview:' : 'Ward Readiness Score:'}</strong> {alertDescription}
          </AlertDescription>
        </Alert>

        <WardGrid userRole={user?.role} userWard={user?.ward} />

        {/* Marked Hotspots Section - Only for Ward Admin/User */}
        {!isSuperAdmin && (
          <div className="mt-8">
            <HotspotsList />
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default Wards;
