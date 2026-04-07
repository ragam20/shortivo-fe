export function getDomainName(url: string): string {
  const hostname = new URL(url).hostname;
  const parts = hostname.split(".");
  return parts.length > 2 ? parts[1] : parts[0];
}
