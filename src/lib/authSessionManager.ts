let accessToken: string | null = null;

// in memory auth session manager
export const authSession = {
  getAccessToken: () => {
    return accessToken;
  },
  setAccessToken: (newToken: string) => {
    accessToken = newToken;
  },
  clearAccessToken: () => {
    accessToken = null;
  },
};
