import Link from "next/link";
import { useContext } from "react";
import AdminLayout from "../../../components/admin_layout";
import { classNames } from "../../../utils/helpers";
import { AdminContext } from "../../../context/admin";

function NoStudentsContent() {
  return (
    <div className="py-4">
      <Link href="/admin/students/create">
        <button
          type="button"
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 28 28"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>

          <span className="mt-2 block text-sm font-medium text-gray-900">
            Create a new student
          </span>
        </button>
      </Link>
    </div>
  );
}

function StudentListView(state) {
  return (
    <div className="py-4">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row flex-row-reverse">
          <Link href="/admin/students/create">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Student
            </button>
          </Link>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="shadow-sm ring-1 ring-black ring-opacity-5">
                <table
                  className="min-w-full border-separate"
                  style={{ borderSpacing: 0 }}
                >
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                      >
                        <span className="sr-only">View</span>
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {state.students.map((student, studentIdx) => (
                      <tr key={student.id}>
                        <td
                          className={classNames(
                            studentIdx !== state.students.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          )}
                        >
                          {student.name}
                        </td>
                        <td
                          className={classNames(
                            studentIdx !== state.students.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell"
                          )}
                        >
                          {student.email}
                        </td>
                        <td
                          className={classNames(
                            studentIdx !== state.students.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell"
                          )}
                        >
                          {student.address}
                        </td>
                        <td
                          className={classNames(
                            studentIdx !== state.students.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8"
                          )}
                        >
                          <Link href={`/admin/students/${student.id}`}>
                            <a className="text-indigo-600 hover:text-indigo-900">
                              View
                              <span className="sr-only">, {student.name}</span>
                            </a>
                          </Link>
                        </td>
                        <td
                          className={classNames(
                            studentIdx !== state.students.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8"
                          )}
                        >
                          <Link href={`/admin/students/${student.id}/edit`}>
                            <a className="text-indigo-600 hover:text-indigo-900">
                              Edit
                              <span className="sr-only">, {student.name}</span>
                            </a>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentsIndex() {
  const { state } = useContext(AdminContext);

  return (
    <main className="flex-1">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Students Dashboard
          </h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {state.students.length == 0
            ? NoStudentsContent()
            : StudentListView(state)}
        </div>
      </div>
    </main>
  );
}

StudentsIndex.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
