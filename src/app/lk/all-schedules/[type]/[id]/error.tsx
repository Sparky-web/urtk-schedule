'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import InitializationErrorCard from '~/app/_lib/components/errors/initialization-error-card';
import { Button } from '~/components/ui/button';
// import ErrorBoundary from '~/app/_lib/utils/error-boundary';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='grid gap-4'>
      <InitializationErrorCard message={error.message} />
        <Link href="/lk/all-schedules" className='w-full'>
          <Button variant={'tenary'} className='w-full'>Все расписания</Button>
        </Link>
        <Button onClick={() => reset()} variant={'tenary'}>Перезагрузить</Button>
    </div>
  );
}