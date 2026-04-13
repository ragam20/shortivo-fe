export const PLAN = {
  FREE: "free",
  PLUS: "plus",
} as const;

export type PlanEnum = (typeof PLAN)[keyof typeof PLAN];

export type DateRange = {
  from: string;
  to: string;
};
