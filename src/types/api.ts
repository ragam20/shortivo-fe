export type Meta = {
  page?: number;
  limit?: number;
  totalItem?: number;
  totalPage?: number;
};

export type ApiResponse<T> = {
  status: number;
  message: string;
  timestamp: string;
  data: T;
  meta?: Meta;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type BaseEntity = {
  id: number;
};

export type Entity<T> = T & BaseEntity;

export type User = Entity<{
  username: string;
  email: string;
  googleId?: number;

  createdAt: string;
  updatedAt: string;
}>;
