import RoleLoginCard from '@/components/auth/RoleLoginCard';

const WardAdminLogin = () => {
  return (
    <RoleLoginCard
      role="ward_admin"
      title="Ward Admin Login"
      subtitle="Authorized ward officials only"
      buttonText="Sign in as Ward Admin"
      redirectPath="/ward-admin-dashboard"
      demoCredentials={{
        email: "wardadmin@rohini.gov.in",
        password: "wardadmin123"
      }}
    />
  );
};

export default WardAdminLogin;
