'use client'

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='m-auto flex flex-col gap-6 items-center'>
      <h2 className="text-xl text-red-400 text-center">Não foi possível realizar esta ação! <br />{error.message}</h2>
      <button
        className="bg-gray-600 px-4 py-3 text-sm text-white"
        onClick={
          () => reset()
        }
      >
        Tentar novamente
      </button>
    </div>
  )
}