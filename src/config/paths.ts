export const paths = {
  landing: {
    path: "/",
    getHref: () => "/",
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
      path: "/home",
      getHref: () => "/home",
    },
    links: {
      path: "/links",
      getHref: () => "/links",
    },
    analytics: {
      path: "/analytics",
      getHref: () => "/analytics",
    },
    settings: {
      path: "/settings",
      getHref: () => "/settings",
    },
  },
} as const;
