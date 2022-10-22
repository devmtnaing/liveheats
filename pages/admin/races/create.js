import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import AdminLayout from "../../../components/admin_layout";
import { AdminContext } from "../../../context/admin";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const StudentCreateSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
});

export default function RacesCreate() {
  const { state, dispatch } = useContext(AdminContext);
  const router = useRouter();

  return (
    <main className="flex-1">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Races Dashboard
          </h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Formik
            initialValues={{
              name: "",
              status: "",
            }}
            validationSchema={StudentCreateSchema}
            onSubmit={(values) => {
              dispatch({
                type: "ADDED_RACE",
                payload: {
                  id: state.races.length + 1,
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
                        Race Information
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
                          htmlFor="status"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Status
                        </label>
                        <div className="mt-1">
                          <Field
                            id="status"
                            name="status"
                            type="text"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors.status && touched.status ? (
                            <div>{errors.status}</div>
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
        </div>
      </div>
    </main>
  );
}

RacesCreate.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
