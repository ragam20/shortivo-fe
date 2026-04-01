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
      getHref: () => "/app",
    },
    home: {
      path: "",
      getHref: () => "/app",
    },
    links: {
      path: "links",
      getHref: () => `${paths.app.root.getHref()}/links`,
      edit: {
        path: "links/:linkId/edit",
        getHref: (linkId: string | number) =>
          `${paths.app.root.getHref()}/links/${linkId}/edit`,
      },
    },
    analytics: {
      path: "analytics",
      getHref: () => `${paths.app.root.getHref()}/analytics`,

      dashboard: {
        path: "analytics/dashboard",
        getHref: () => `${paths.app.root.getHref()}/analytics/dashboard`,
      },
    },

    settings: {
      path: "settings",
      getHref: () => `${paths.app.root.getHref()}/settings`,
    },
  },
} as const;
