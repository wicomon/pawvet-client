import { redirect } from "next/navigation";

// No patient list UI exists yet (the source design only had a single sample
// record). Redirect to it so the sidebar's "Pacientes" link is functional
// instead of a dead end.
export default function PatientsIndexPage() {
  redirect("/dashboard/patients/rocky");
}
