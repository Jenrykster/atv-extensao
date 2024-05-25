import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {

  return <main className="flex max-w-screen-md mx-auto flex-col p-24">
    {children}
  </main>
}