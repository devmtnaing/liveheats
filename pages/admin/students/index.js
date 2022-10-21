import Link from 'next/link'
import { useContext } from 'react'
import AdminLayout from '../../../components/admin_layout'
import { classNames } from '../../../utils/helpers'
import { AdminContext } from '../../../context/admin'

export default function StudentsIndex() {
  const { state, dispatch } = useContext(AdminContext);

  return (
    <main className="flex-1">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Students Dashboard</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
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
                      <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                            >
                              First Name
                            </th>
                            <th
                              scope="col"
                              className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                            >
                              Last Name
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
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {state.students.map((student, studentIdx) => (
                            <tr key={student.id}>
                              <td
                                className={classNames(
                                  studentIdx !== state.students.length - 1 ? 'border-b border-gray-200' : '',
                                  'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                )}
                              >
                                {student.name}
                              </td>
                              <td
                                className={classNames(
                                  studentIdx !== state.students.length - 1 ? 'border-b border-gray-200' : '',
                                  'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                                )}
                              >
                                {student.title}
                              </td>
                              <td
                                className={classNames(
                                  studentIdx !== state.students.length - 1 ? 'border-b border-gray-200' : '',
                                  'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell'
                                )}
                              >
                                {student.email}
                              </td>
                              <td
                                className={classNames(
                                  studentIdx !== state.students.length - 1 ? 'border-b border-gray-200' : '',
                                  'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8'
                                )}
                              >
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                  Edit<span className="sr-only">, {student.name}</span>
                                </a>
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
        </div>
      </div>
    </main>
  )
}

StudentsIndex.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}