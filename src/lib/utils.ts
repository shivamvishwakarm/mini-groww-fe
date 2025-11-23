import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setAuthCookie(token: string) {
  document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Strict; Secure`;
}

export function getAuthCookie(): string | null {
  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  if (match) return match[2];
  return null;
}

export function removeAuthCookie() {
  document.cookie = 'token=; path=/; max-age=0; SameSite=Strict; Secure';
}
