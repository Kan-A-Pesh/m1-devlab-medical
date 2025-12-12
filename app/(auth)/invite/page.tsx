import { Suspense } from "react";
import { InviteContent } from "./_components";

function InvitePageSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-4 text-center lg:text-left">
        <div className="h-10 bg-slate-200 rounded-lg w-3/4 mx-auto lg:mx-0" />
        <div className="h-5 bg-slate-200 rounded w-1/2 mx-auto lg:mx-0" />
      </div>
      <div className="space-y-5">
        <div className="h-12 bg-slate-200 rounded-xl" />
        <div className="h-12 bg-slate-200 rounded-xl" />
        <div className="h-12 bg-slate-200 rounded-xl" />
        <div className="h-12 bg-slate-200 rounded-xl" />
        <div className="h-12 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}

export default function InvitePage() {
  return (
    <Suspense fallback={<InvitePageSkeleton />}>
      <InviteContent />
    </Suspense>
  );
}
