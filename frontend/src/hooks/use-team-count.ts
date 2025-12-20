import { useGetTeamQuery } from "@/lib/api";

/**
 * Custom hook to get the dynamic count of team members site-wide.
 * Returns { count, isLoading, isError }
 */
export function useTeamCount() {
  const { data, isLoading, isError } = useGetTeamQuery();
  const count = data?.items?.length ?? 0;
  return { count, isLoading, isError };
}
