import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {

  return <main className="flex flex-col max-w-screen-md mx-auto h-full w-full px-10 py-16">
    {children}
  </main>
}