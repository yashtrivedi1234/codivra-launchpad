import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGetBlogByIdQuery } from "@/lib/api";

const routeNames: Record<string, string> = {
  services: "Services",
  about: "About Us",
  pricing: "Pricing",
  portfolio: "Portfolio",
  contact: "Contact",
  careers: "Careers",
  blog: "Blog",
};

const PageBreadcrumb = () => {
  const location = useLocation();
  const { id } = useParams();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const { data } = useGetBlogByIdQuery(id || "", { skip: !id });
  const blogTitle = data?.data?.title;

  if (pathSegments.length === 0) return null;

  return (
    <div className="w-full bg-[#0A0F1C] backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 pt-4 sm:pt-6 pb-3 sm:pb-4">
        <Breadcrumb>
          <BreadcrumbList className="bg-transparent">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm sm:text-base">
                  <Home className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathSegments.map((segment, index) => {
              const isLast = index === pathSegments.length - 1;
              const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

              let displayName = routeNames[segment];

              // Blog detail breadcrumb handling
              if (segment === id) {
                displayName = blogTitle;
              }

              // Fallback for normal routes only (never for ID)
              if (!displayName && segment !== id) {
                displayName = segment.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
              }

              return (
                <React.Fragment key={path}>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-white/30" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-[#00D9FF] font-semibold text-sm sm:text-base truncate">
                        {displayName}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={path} className="text-white/60 hover:text-white transition-colors text-sm sm:text-base">
                          {displayName}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default PageBreadcrumb;