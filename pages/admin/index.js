import AdminLayout from '../../components/admin_layout'

export default function AdminIndex() {
  return (
    <main className="flex-1">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-indigo-600">Admin Dashboard</h2>
            <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Some cool Analytics should be here.
            </p>
            <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
              Go chase data science team
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

AdminIndex.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}