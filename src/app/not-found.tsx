import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold">404 - Page Not Found</h2>
            <p className="mt-4">We couldn&apos;t find the page you were looking for.</p>
            <Link href="/" className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white">
                Return Home
            </Link>
        </main>
    );
}