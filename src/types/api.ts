import type { ISOStringFormat } from "date-fns";
import { number } from "zod";

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export type Meta = {
  page: number;
  limit: number;
  totalItem: number;
  totalPage: number;
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

  createdAt: ISOStringFormat;
  updatedAt: ISOStringFormat;
}>;

export type Plan = Entity<{
  code: string;
  title: string;
  monthlyLimit: number;
  analyticsEnabled: boolean;
  customDomainEnabled: boolean;
}>;

export type Account = {
  user: User;
  plan: Plan | null;
};

export type Link = Entity<{
  title: string | null;
  description: string | null;
  shortURL: string;
  clickCount: number;
  uniqueClick: number;
  originalURL: string;
  expiredAt: string;

  createdAt: string;
  updatedAt: string;
}>;

export type MonthLimit = {
  monthlyLimit: number;
  currLimit: number;
};

export type GetClicks = {
  totalClick: number;
  uniqueClick: number;
};

export type GetTotalEngagementByDevice = {
  device: string;
  clicks: number;
};

export type GetTotalEngagementByReferer = {
  referer: string;
  clicks: number;
};

export type GetTotalEngagementByOvertime = {
  date: string;
  clicks: number;
};

export type GetTotalCreatedLink = {
  totalLink: number;
};
