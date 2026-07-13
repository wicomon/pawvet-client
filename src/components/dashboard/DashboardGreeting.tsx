type DashboardGreetingProps = {
  firstName: string;
};

export default function DashboardGreeting({ firstName }: DashboardGreetingProps) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-heading text-2xl font-extrabold text-wv-navy">
        Buenos días, {firstName}
      </h1>
      <p className="text-[14.5px] font-semibold text-wv-muted-2">
        Esto es lo que pasa hoy en tu clínica.
      </p>
    </div>
  );
}
