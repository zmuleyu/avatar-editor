import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Avatar Editor',
  description: 'Image editing tool for avatars',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
