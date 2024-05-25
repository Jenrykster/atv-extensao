'use client';

import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { Roboto } from 'next/font/google';
import Link from 'next/link';

const roboto = Roboto({ weight: ['700', '500', '400'], subsets: ['latin'] });

export default function Header({
  session
}: {
  session: Session | null
}) {

  return <header className={'border-b-2 border-gray-500 border-solid ' + roboto.className}>
    <div className='max-w-screen-lg mx-auto p-8 flex items-center justify-between'>
      <Link href='/posts'>
        <h1 className='font-medium text-2xl'>
          ProtesteAqui
        </h1>
      </Link>

      <div className='flex gap-8'>

        {!session ? <button className='underline' onClick={() => signIn('google')}>
          Login
        </button> : session.user?.name}
        {session && <button className='underline' onClick={() => signOut()}>
          sair
        </button>
        }
      </div>
    </div>
  </header>
}