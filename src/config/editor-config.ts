export const DEFAULT_TRUSTED_ORIGINS =
  (process.env.NEXT_PUBLIC_TRUSTED_ORIGINS ?? 'http://localhost:5173,https://companion-1xa.pages.dev')
    .split(',').map((s) => s.trim()).filter(Boolean);
