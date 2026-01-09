import RoleLoginCard from '@/components/auth/RoleLoginCard';

const SuperAdminLogin = () => {
  return (
    <RoleLoginCard
      role="super_admin"
      title="City Administrator Login"
      subtitle="City-level monitoring & governance"
      buttonText="Sign in as City Admin"
      redirectPath="/super-admin-dashboard"
      demoCredentials={{
        email: "superadmin@delhi.gov.in",
        password: "superadmin123"
      }}
    />
  );
};

export default SuperAdminLogin;
