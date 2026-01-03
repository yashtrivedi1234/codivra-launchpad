import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Use only env variable for API base URL. Must be set in .env files.
const baseUrl = import.meta.env.VITE_API_URL;

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = typeof window !== "undefined"
      ? window.localStorage.getItem("admin_token")
      : null;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  // If unauthorized, clear token and send user to admin login
  if (result.error?.status === 401 && typeof window !== "undefined") {
    window.localStorage.removeItem("admin_token");
    window.localStorage.removeItem("admin_email");

    if (window.location.pathname.startsWith("/admin")) {
      window.location.href = "/admin/login";
    }
  }

  return result;
};

export interface ContactPayload {
  name: string;
  email: string;
  service: string;
  message: string;
  phone?: string;
}

export interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  phone?: string;
  read?: boolean;
  created_at?: string;
}

export interface CareersApplicationPayload {
  job_title: string;
  name: string;
  email: string;
  phone?: string | null;
  linkedin_url?: string | null;
  portfolio_url?: string | null;
  cover_letter?: string | null;
}

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface AdminUser {
  email: string;
  role: string;
  name?: string | null;
}

export interface JobApplication {
  _id: string;
  job_title: string;
  name: string;
  email: string;
  phone?: string | null;
  linkedin_url?: string | null;
  portfolio_url?: string | null;
  cover_letter?: string | null;
  created_at?: string;
}

export interface JobPosting {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  is_active?: boolean;
  order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PageSection {
  _id: string;
  page: string;
  key: string;
  data: any;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  _id: string;
  title: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PortfolioItem {
  _id: string;
  title: string;
  category: string;
  image?: string;
  link?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  category: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SubscriptionPayload {
  email: string;
  source?: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["JobApplications", "Jobs", "Pages", "Services", "Team", "Portfolio", "Blog"],
  endpoints: (builder) => ({
    submitContact: builder.mutation<
      { status: string; message?: string },
      ContactPayload
    >({
      query: (body) => ({
        url: "/api/contact",
        method: "POST",
        body,
      }),
    }),
    adminListContacts: builder.query<{ items: ContactSubmission[]; success?: boolean }, void>({
      query: () => ({
        url: "/api/admin/contacts",
        method: "GET",
      }),
      providesTags: ["Pages"],
    }),
    adminDeleteContact: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/api/admin/contacts/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          api.util.updateQueryData("adminListContacts", undefined, (draft: any) => {
            draft.items = draft.items.filter((c: ContactSubmission) => c._id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
    adminToggleContactRead: builder.mutation<
      { success: boolean; data: ContactSubmission },
      string
    >({
      query: (id) => ({
        url: `/api/admin/contacts/${id}/toggle-read`,
        method: "PUT",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          api.util.updateQueryData("adminListContacts", undefined, (draft: any) => {
            const item = draft.items.find((c: ContactSubmission) => c._id === id);
            if (item) item.read = !item.read;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
    submitApplication: builder.mutation<
      { status: string; message?: string; id?: string },
      CareersApplicationPayload
    >({
      query: (body) => ({
        url: "/api/careers/applications",
        method: "POST",
        body,
      }),
    }),
    adminLogin: builder.mutation<
      { token: string; user: AdminUser },
      AdminLoginPayload
    >({
      query: (body) => ({
        url: "/api/admin/login",
        method: "POST",
        body,
      }),
    }),
    getJobApplications: builder.query<{ items: JobApplication[] }, void>({
      query: () => ({
        url: "/api/admin/job-applications",
        method: "GET",
      }),
    }),
    deleteJobApplication: builder.mutation<
      { status: string },
      string
    >({
      query: (id) => ({
        url: `/api/admin/job-applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) =>
        result && !error ? [{ type: "JobApplications", id }] : [],
    }),
    // Careers job postings
    getJobs: builder.query<{ items: JobPosting[] }, void>({
      query: () => ({
        url: "/api/careers/jobs",
        method: "GET",
      }),
      providesTags: ["Jobs"],
    }),
    adminListJobs: builder.query<{ items: JobPosting[] }, void>({
      query: () => ({
        url: "/api/admin/careers/jobs",
        method: "GET",
      }),
      providesTags: ["Jobs"],
    }),
    createJob: builder.mutation<
      { status: string; message: string; data: JobPosting },
      Omit<JobPosting, "_id" | "created_at" | "updated_at">
    >({
      query: (body) => ({
        url: "/api/admin/careers/jobs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Jobs"],
    }),
    updateJob: builder.mutation<
      { status: string; message: string; data: JobPosting },
      { id: string; data: Partial<Omit<JobPosting, "_id" | "created_at" | "updated_at">> }
    >({
      query: ({ id, data }) => ({
        url: `/api/admin/careers/jobs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    deleteJob: builder.mutation<{ status: string; message?: string }, string>({
      query: (id) => ({
        url: `/api/admin/careers/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
    getPage: builder.query<{ page: string; sections: PageSection[] }, string>({
      query: (page) => ({
        url: `/api/pages/${page}`,
        method: "GET",
      }),
      providesTags: (result, error, page) =>
        result && !error ? [{ type: "Pages", id: page }] : [],
    }),
    adminListPages: builder.query<{ sections: PageSection[] }, void>({
      query: () => ({
        url: "/api/admin/pages",
        method: "GET",
      }),
      providesTags: ["Pages"],
    }),
    adminUpsertPageSection: builder.mutation<
      { status: string; upsertedId: string | null },
      { page: string; key: string; data: any }
    >({
      query: (body) => ({
        url: "/api/admin/pages",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Pages"],
    }),
    adminDeletePageSection: builder.mutation<{ status: string }, string>({
      query: (id) => ({
        url: `/api/admin/pages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pages"],
    }),
    // Services endpoints
    getServices: builder.query<{ items: Service[] }, void>({
      query: () => ({
        url: "/api/services",
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    createService: builder.mutation<
      { status: string; message: string; data: Service },
      FormData | { title: string; icon?: string }
    >({
      query: (body) => ({
        url: "/api/admin/services",
        method: "POST",
        body,
      }),
      async onQueryStarted(newService, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getServices", undefined, (draft) => {
              draft.items.unshift(data.data);
            })
          );
        } catch {}
      },
    }),
    updateService: builder.mutation<
      { status: string; message: string },
      { id: string; data: FormData | { title?: string; icon?: string } }
    >({
      query: ({ id, data }) => ({
        url: `/api/admin/services/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getServices", undefined, (draft) => {
            const service = draft.items.find((s) => s._id === id);
            if (service && !(data instanceof FormData)) {
              Object.assign(service, data);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteService: builder.mutation<{ status: string; message: string }, string>({
      query: (id) => ({
        url: `/api/admin/services/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getServices", undefined, (draft) => {
            draft.items = draft.items.filter((s) => s._id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    // Team endpoints
    getTeam: builder.query<{ items: TeamMember[] }, void>({
      query: () => ({
        url: "/api/team",
        method: "GET",
      }),
      providesTags: ["Team"],
    }),
    createTeamMember: builder.mutation<
      { status: string; message: string; data: TeamMember },
      FormData | Omit<TeamMember, "_id" | "created_at" | "updated_at">
    >({
      query: (body) => ({
        url: "/api/admin/team",
        method: "POST",
        body,
      }),
      async onQueryStarted(newMember, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getTeam", undefined, (draft) => {
              draft.items.unshift(data.data);
            })
          );
        } catch {}
      },
    }),
    updateTeamMember: builder.mutation<
      { status: string; message: string },
      { id: string; data: FormData | Partial<Omit<TeamMember, "_id" | "created_at" | "updated_at">> }
    >({
      query: ({ id, data }) => ({
        url: `/api/admin/team/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTeam", undefined, (draft) => {
            const member = draft.items.find((m) => m._id === id);
            if (member && !(data instanceof FormData)) {
              Object.assign(member, data);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTeamMember: builder.mutation<{ status: string; message: string }, string>({
      query: (id) => ({
        url: `/api/admin/team/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTeam", undefined, (draft) => {
            draft.items = draft.items.filter((m) => m._id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    // Portfolio endpoints
    getPortfolio: builder.query<{ items: PortfolioItem[] }, void>({
      query: () => ({
        url: "/api/portfolio",
        method: "GET",
      }),
      providesTags: ["Portfolio"],
    }),
    createPortfolioItem: builder.mutation<
      { status: string; message: string; data: PortfolioItem },
      FormData | Omit<PortfolioItem, "_id" | "created_at" | "updated_at">
    >({
      query: (body) => ({
        url: "/api/admin/portfolio",
        method: "POST",
        body,
      }),
      async onQueryStarted(newItem, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getPortfolio", undefined, (draft) => {
              draft.items.unshift(data.data);
            })
          );
        } catch {}
      },
    }),
    updatePortfolioItem: builder.mutation<
      { status: string; message: string },
      { id: string; data: FormData | Partial<Omit<PortfolioItem, "_id" | "created_at" | "updated_at">> }
    >({
      query: ({ id, data }) => ({
        url: `/api/admin/portfolio/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getPortfolio", undefined, (draft) => {
            const item = draft.items.find((p) => p._id === id);
            if (item && !(data instanceof FormData)) {
              Object.assign(item, data);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deletePortfolioItem: builder.mutation<{ status: string; message: string }, string>({
      query: (id) => ({
        url: `/api/admin/portfolio/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getPortfolio", undefined, (draft) => {
            draft.items = draft.items.filter((p) => p._id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    // Blog endpoints
    getBlog: builder.query<{ items: BlogPost[] }, void>({
      query: () => '/api/blog',
      providesTags: ['Blog'],
    }),
    getBlogById: builder.query<{ data: BlogPost }, string>({
      query: (id) => `/api/blog/${id}`,
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    createBlogPost: builder.mutation<
      { status: string; message: string; data: BlogPost },
      FormData | Omit<BlogPost, "_id" | "created_at" | "updated_at">
    >({
      query: (body) => {
        if (!(body instanceof FormData)) {
          const cleanBody: any = { ...body };
          if (cleanBody.image === "") delete cleanBody.image;
          return {
            url: "/api/admin/blog",
            method: "POST",
            body: cleanBody,
          };
        }
        return {
          url: "/api/admin/blog",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getBlog", undefined, (draft) => {
              draft.items.unshift(data.data);
            })
          );
        } catch {}
      },
    }),
    updateBlogPost: builder.mutation<
      { status: string; message: string },
      { id: string; data: FormData | Partial<Omit<BlogPost, "_id" | "created_at" | "updated_at">> }
    >({
      query: ({ id, data }) => {
        if (!(data instanceof FormData)) {
          const cleanData: any = { ...data };
          if (cleanData.image === "") delete cleanData.image;
          return {
            url: `/api/admin/blog/${id}`,
            method: "PUT",
            body: cleanData,
          };
        }
        return {
          url: `/api/admin/blog/${id}`,
          method: "PUT",
          body: data,
        };
      },
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getBlog", undefined, (draft) => {
            const post = draft.items.find((b) => b._id === id);
            if (post && !(data instanceof FormData)) {
              Object.assign(post, data);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteBlogPost: builder.mutation<{ status: string; message: string }, string>({
      query: (id) => ({
        url: `/api/admin/blog/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getBlog", undefined, (draft) => {
            draft.items = draft.items.filter((b) => b._id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    // Newsletter subscription
    submitSubscription: builder.mutation<
      { status: string; message?: string },
      SubscriptionPayload
    >({
      query: (body) => ({
        url: "/api/subscribe",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSubmitContactMutation,
  useAdminListContactsQuery,
  useAdminDeleteContactMutation,
  useAdminToggleContactReadMutation,
  useSubmitApplicationMutation,
  useAdminLoginMutation,
  useGetJobApplicationsQuery,
  useDeleteJobApplicationMutation,
  useGetJobsQuery,
  useAdminListJobsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetPageQuery,
  useAdminListPagesQuery,
  useAdminUpsertPageSectionMutation,
  useAdminDeletePageSectionMutation,
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetTeamQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useGetPortfolioQuery,
  useCreatePortfolioItemMutation,
  useUpdatePortfolioItemMutation,
  useDeletePortfolioItemMutation,
  useGetBlogQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useDeleteBlogPostMutation,
  useSubmitSubscriptionMutation,
  useGetBlogByIdQuery, // Add this
} = api;

