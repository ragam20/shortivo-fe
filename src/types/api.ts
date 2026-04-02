export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

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
  id: number | string;
};

export type Entity<T> = T & BaseEntity;

export type User = Entity<{
  username: string;
  email: string;
  imgURL?: string | null;
  googleId?: number | null;

  createdAt: string;
  updatedAt: string;
}>;

export type Link = Entity<{
  title: string | null;
  description: string;
  shortUrl: string;
  originalUrl: string;
  expiredAt: string;

  createdAt: string;
}>;
