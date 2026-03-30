export const paths = {
  landing: {
    path: "/",
    getHref: () => "/",
  },

  pricing: {
    path: "/pricing",
    getHref: () => "/pricing",
  },

  auth: {
    register: {
      path: "/auth/register",
      getHref: (redirectTo: string | null | undefined) => {
        return `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`;
      },
    },
    login: {
      path: "/auth/login",
      getHref: (redirectTo: string | null | undefined) => {
        return `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`;
      },
    },
  },

  app: {
    root: {
      path: "/app",
      getHref: "/app",
    },
    home: {
      path: "",
      getHref: () => "/app",
    },
    links: {
      path: "links",
      getHref: () => "/app/links",
    },
    analytics: {
      path: "analytics",
      getHref: () => "/app/analytics",
    },
    settings: {
      path: "settings",
      getHref: () => "/app/settings",
    },
  },
} as const;
