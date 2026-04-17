import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold">Avatar Editor</h1>
      <p className="text-sm text-zinc-500">
        头像去背景 + 裁剪工具。此子站通常由 TCF 主站唤起使用。
      </p>
      <div className="flex gap-3">
        <Link className="rounded bg-zinc-900 px-4 py-2 text-sm text-white" href="/standalone">
          独立使用
        </Link>
        <a
          className="rounded border px-4 py-2 text-sm"
          href="https://companion-1xa.pages.dev"
          target="_blank"
          rel="noreferrer"
        >
          前往 TCF
        </a>
      </div>
    </main>
  );
}
