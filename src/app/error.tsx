'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold">Something went wrong!</h2>
            <p className="mt-4">{error.message}</p>
            <button
                onClick={() => reset()}
                className="mt-6 rounded-md bg-red-600 px-4 py-2 text-white"
            >
                Try again
            </button>
        </main>
    );
}