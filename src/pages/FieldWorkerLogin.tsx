import RoleLoginCard from '@/components/auth/RoleLoginCard';

export default function FieldWorkerLogin() {
  return (
    <RoleLoginCard
      role="field_worker"
      title="Field Worker Login"
      subtitle="Access your assigned tasks and manage field operations"
      buttonText="Sign in as Field Worker"
      redirectPath="/field-worker"
      demoCredentials={{
        email: "worker@rohini.gov.in",
        password: "worker123"
      }}
    />
  );
}
