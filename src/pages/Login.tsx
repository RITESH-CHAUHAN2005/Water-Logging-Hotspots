import RoleLoginCard from '@/components/auth/RoleLoginCard';

const Login = () => {
  return (
    <RoleLoginCard
      role="user"
      title="Citizen Login"
      description="Report water-logging issues and stay informed"
      buttonText="Sign in as Citizen"
      redirectPath="/user-dashboard"
    />
  );
};

export default Login;
