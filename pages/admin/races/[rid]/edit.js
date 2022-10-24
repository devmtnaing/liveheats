import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import AdminLayout from "../../../../components/admin_layout";
import NoDataFound from "../../../../components/no_data_found";
import { AdminContext } from "../../../../context/admin";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const StudentUpdateSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  address: Yup.string().min(2, "Too short!"),
});

function StudentEditView(data, dispatch, router) {
  return (
    <Formik
      initialValues={{
        name: data.name,
        email: data.email,
        address: data.address,
      }}
      validationSchema={StudentUpdateSchema}
      onSubmit={(values) => {
        dispatch({
          type: "UPDATED_STUDENT",
          payload: {
            id: data.id,
            ...values,
          },
        });
        router.push("/admin/races");
      }}
    >
      {({ errors, touched }) => (
        <Form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200">
            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.name && touched.name ? (
                      <div>{errors.name}</div>
                    ) : null}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
                    ) : null}
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <Field
                      id="address"
                      name="address"
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.address && touched.address ? (
                      <div>{errors.address}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <Link href="/admin/races">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default function RacesEdit() {
  const { state, dispatch } = useContext(AdminContext);
  const router = useRouter();
  const { rid } = router.query;
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
          {data
            ? StudentEditView(data, dispatch, router)
            : NoDataFound("/admin/races")}
        </div>
      </div>
    </main>
  );
}

RacesEdit.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
