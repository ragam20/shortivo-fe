export function formatDateToString(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function toDateRange(value: string): { from: Date; to: Date } {
  const to = new Date();
  const from = new Date();

  const amount = parseInt(value);
  const unit = value.replace(/[0-9]/g, "");

  switch (unit) {
    case "h":
      from.setHours(from.getHours() - amount);
      break;
    case "d":
      from.setDate(from.getDate() - amount);
      break;
  }

  return { from, to };
}

export function formatDateMMYY(dateStr: string) {
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${month}/${day}`;
}

export function isValidDateRange(
  from: Date | undefined | null,
  to: Date | undefined | null,
): boolean {
  if (!from || !to) {
    return true;
  }

  const diffInMs = to.getTime() - from.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays <= 90;
}
