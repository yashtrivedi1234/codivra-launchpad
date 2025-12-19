import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "/";

export interface ContactPayload {
  name: string;
  email: string;
  service: string;
  message: string;
  phone?: string;
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

export interface PageSection {
  _id: string;
  page: string;
  key: string;
  data: any;
  created_at?: string;
  updated_at?: string;
}

export interface AdminSignupPayload {
  email: string;
  password: string;
  name: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
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
  }),
  tagTypes: ["JobApplications", "Pages"],
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
    adminSignup: builder.mutation<
      { token: string; user: AdminUser },
      AdminSignupPayload
    >({
      query: (body) => ({
        url: "/api/admin/signup",
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
  }),
});

export const {
  useSubmitContactMutation,
  useSubmitApplicationMutation,
  useAdminLoginMutation,
  useAdminSignupMutation,
  useGetJobApplicationsQuery,
  useDeleteJobApplicationMutation,
  useGetPageQuery,
  useAdminListPagesQuery,
  useAdminUpsertPageSectionMutation,
  useAdminDeletePageSectionMutation,
} = api;

