import { Suspense } from "react";
import VisaResults from "./VisaResults";

export const metadata = {
  title: "Visa Requirements Result | 111 Group",
  description: "View detailed visa requirements, document checklist, and processing information for your selected destination.",
};

export default function VisaResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-fg-muted text-sm">Loading requirements…</div>
      </div>
    }>
      <VisaResults />
    </Suspense>
  );
}
