import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-bold mb-4">Home Page</h1>
            <p className="mb-4">This is the home page.</p>
            <Link href="/search" className="text-blue-500 hover:underline">
                Go to Search
            </Link>
        </div>
    );
}
