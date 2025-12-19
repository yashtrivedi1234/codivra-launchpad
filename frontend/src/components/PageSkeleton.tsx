import { Skeleton } from "@/components/ui/skeleton";

export const HeroSkeleton = () => (
  <div className="py-20 px-4">
    <div className="container mx-auto max-w-4xl text-center space-y-6">
      <Skeleton className="h-6 w-32 mx-auto" />
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-12 w-2/3 mx-auto" />
      <Skeleton className="h-6 w-full max-w-xl mx-auto" />
      <Skeleton className="h-6 w-4/5 max-w-lg mx-auto" />
      <div className="flex justify-center gap-4 pt-4">
        <Skeleton className="h-12 w-36" />
        <Skeleton className="h-12 w-36" />
      </div>
    </div>
  </div>
);

export const CardGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="container mx-auto px-4 py-16">
    <div className="text-center mb-12 space-y-4">
      <Skeleton className="h-5 w-24 mx-auto" />
      <Skeleton className="h-10 w-64 mx-auto" />
      <Skeleton className="h-5 w-96 mx-auto" />
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card rounded-2xl p-6 space-y-4">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const TeamSkeleton = () => (
  <div className="container mx-auto px-4 py-16">
    <div className="text-center mb-12 space-y-4">
      <Skeleton className="h-5 w-24 mx-auto" />
      <Skeleton className="h-10 w-48 mx-auto" />
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-card rounded-2xl p-6 text-center space-y-4">
          <Skeleton className="h-24 w-24 rounded-full mx-auto" />
          <Skeleton className="h-5 w-32 mx-auto" />
          <Skeleton className="h-4 w-24 mx-auto" />
          <Skeleton className="h-3 w-full" />
        </div>
      ))}
    </div>
  </div>
);

export const PageLoadingSkeleton = () => (
  <div className="min-h-screen animate-pulse">
    <div className="h-20 bg-card border-b border-border" />
    <HeroSkeleton />
    <CardGridSkeleton count={3} />
  </div>
);
