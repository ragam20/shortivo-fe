export const PLAN = {
  FREE: "free",
  PLUS: "plus",
} as const;

export type PlanEnum = (typeof PLAN)[keyof typeof PLAN];
