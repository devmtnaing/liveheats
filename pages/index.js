import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Home page</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <Link href="/admin/">
              <a href="#" className="group block flex-shrink-0 text-blue-600">
                Click here to go to Dashboard page
              </a>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

Home.getLayout = function getLayout(page) {
  return <>{page}</>;
};
