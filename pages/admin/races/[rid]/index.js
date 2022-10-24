import Link from "next/link";
import AdminLayout from "../../../../components/admin_layout";
import NoDataFound from "../../../../components/no_data_found";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AdminContext } from "../../../../context/admin";

function RaceDetailView(data) {
  return (
    <div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {data.name}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              Number
            </dd>
          </div>
        </dl>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <Link href="/admin/races">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Back
            </button>
          </Link>
          <Link href={`/admin/races/${data.id}/edit`}>
            <button
              type="button"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RacesShow() {
  const router = useRouter();
  const { rid } = router.query;
  const { state } = useContext(AdminContext);
  const data = state.races.find((obj) => obj.id == rid);

  return (
    <main className="flex-1">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Races Dashboard
          </h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {data ? RaceDetailView(data) : NoDataFound("/admin/races")}
        </div>
      </div>
    </main>
  );
}

RacesShow.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
