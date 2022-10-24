import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, Fragment, useState } from "react";
import AdminLayout from "../../../components/admin_layout";
import { AdminContext } from "../../../context/admin";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  PlusIcon,
  MinusIcon,
  XMarkIcon,
  // XCircleIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import { classNames } from "../../../utils/helpers";

const RaceCreateSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

function NoLaneContent(values, setFieldValue) {
  return (
    <div className="py-4">
      <button
        type="button"
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => addLane(values, setFieldValue)}
      >
        <PlusIcon
          className="mx-auto h-7 w-7 text-gray-400"
          aria-hidden="true"
        />

        <span className="mt-2 block text-sm font-medium text-gray-900">
          Add new lane
        </span>
      </button>
    </div>
  );
}

NewLane.propTypes = {
  id: PropTypes.number,
  setOpen: PropTypes.func,
  setLane: PropTypes.func,
};

function NewLane({ id, setOpen, setLane }) {
  return (
    <li className="flex items-center justify-between py-3">
      <div className="flex items-center">
        <div className="flex min-w-0 flex-1 items-center">
          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <div className="pt-3 pb-3">
                <p className="text-sm text-gray-900">Lane {id}</p>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => {
                  setOpen(true);
                  setLane(id);
                }}
              >
                <p className="flex items-center text-sm text-gray-500 rounded-md border-2 border-dashed border-gray-300 px-10 pt-2 pb-2">
                  <svg
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    />
                  </svg>
                  <span className="truncate">Assign a participant</span>
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

LaneWithParticipants.propTypes = {
  students: PropTypes.array,
  id: PropTypes.number,
  participant_id: PropTypes.number,
};

function LaneWithParticipants({ students, id, participant_id }) {
  const student = students.find((obj) => obj.id == participant_id);

  return (
    <li className="flex items-center justify-between py-3">
      <div className="flex items-center">
        <div className="flex min-w-0 flex-1 items-center">
          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <div className="pt-3 pb-3">
                <p className="text-sm text-gray-900">Lane {id}</p>
              </div>
            </div>
            <div>
              <p className="truncate text-sm font-medium text-indigo-600">
                {student.name}
                {/* <button type="button">
                  <XCircleIcon
                    className="mx-auto h-5 w-5 text-red-900"
                    aria-hidden="true"
                    // onClick={() => unassignLaneParticipant(id, values)}
                  />
                </button> */}
              </p>
              <p className="mt-2 flex items-center text-sm text-gray-500">
                <svg
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z"></path>
                  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z"></path>
                </svg>
                <span className="truncate">{student.email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function addLane(values, setFieldValue) {
  values.lanes.push({ id: values.lanes.length + 1 });
  setFieldValue("lanes", values.lanes);
}

function removeLane(values, setFieldValue) {
  values.lanes.pop();
  setFieldValue("lanes", values.lanes);
}

function assignLaneParticipant(
  student,
  lane_id,
  values,
  setSelected,
  setAssignedParticipants
) {
  var lane_index = values.lanes.findIndex((lane) => lane.id == lane_id);
  values.lanes[lane_index] = {
    ...values.lanes[lane_index],
    participant_id: student.id,
  };
  setAssignedParticipants((preAssignParticipants) => [
    ...preAssignParticipants,
    student.id,
  ]);
  setSelected(null);
}

// function unassignLaneParticipant(lane_id, values) {
//   var lane_index = values.lanes.findIndex((lane) => lane.id == lane_id);
//   values.lanes[lane_index] = {
//     ...values.lanes[lane_index],
//     participant_id: null,
//   };
// }

export default function RacesCreate() {
  const { state, dispatch } = useContext(AdminContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedLane, setLane] = useState(0);
  const [selectedStudent, setSelected] = useState();
  const [assignedParticipants, setAssignedParticipants] = useState([]);
  const [query, setQuery] = useState("");
  console.log(assignedParticipants);

  const filteredStudents =
    query === ""
      ? state.students.filter(
          (student) => !assignedParticipants.includes(student.id)
        )
      : state.students.filter((student) =>
          student.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

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
              lanes: [],
            }}
            validationSchema={RaceCreateSchema}
            onSubmit={(values) => {
              dispatch({
                type: "ADDED_RACE",
                payload: {
                  id: state.races.length + 1,
                  ...values,
                },
              });
              router.push("/admin/races");
              setAssignedParticipants([]);
            }}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form className="space-y-6" action="#" method="POST">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                  <div className="flex justify-start pb-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Race Details
                    </h3>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Name
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
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
                </div>

                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                  <div className="flex justify-start pb-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Lane Details
                    </h3>
                  </div>
                  <div className="sm:grid sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <ul
                      role="list"
                      className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200"
                    >
                      {values.lanes.length == 0
                        ? NoLaneContent(values, setFieldValue)
                        : null}
                      {values.lanes.map((lane) =>
                        lane.participant_id ? (
                          <LaneWithParticipants
                            key={lane.id}
                            id={lane.id}
                            participant_id={lane.participant_id}
                            students={state.students}
                            values={values}
                          />
                        ) : (
                          <NewLane
                            key={lane.id}
                            id={lane.id}
                            setOpen={setOpen}
                            setLane={setLane}
                          />
                        )
                      )}
                    </ul>
                    {values.lanes.length == 0 ? null : (
                      <div className="flex items-center justify-between py-2">
                        <button
                          type="button"
                          className="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          onClick={() => removeLane(values, setFieldValue)}
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-red-300 text-red-400">
                            <MinusIcon
                              className="h-5 w-5 text-red-400"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="ml-4 text-sm font-medium text-red-600 group-hover:text-red-500">
                            Remove Lane
                          </span>
                        </button>
                        <button
                          type="button"
                          className="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          onClick={() => addLane(values, setFieldValue)}
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-indigo-300 text-indigo-400">
                            <PlusIcon
                              className="h-5 w-5 text-indigo-400"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                            Add Lane
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

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
                <Transition.Root show={open} as={Fragment}>
                  <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          enterTo="opacity-100 translate-y-0 sm:scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:pb-60">
                            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                              <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only">Close</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                            <div className="sm:flex sm:items-start">
                              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <div className="mt-2">
                                  <Combobox
                                    as="div"
                                    value={selectedStudent}
                                    onChange={setSelected}
                                  >
                                    <Combobox.Label className="block text-sm font-medium text-gray-700">
                                      Assigned to
                                    </Combobox.Label>
                                    <div className="relative mt-1">
                                      <Combobox.Input
                                        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                        onChange={(event) =>
                                          setQuery(event.target.value)
                                        }
                                        displayValue={(student) =>
                                          student?.name
                                        }
                                      />
                                      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                        <ChevronUpDownIcon
                                          className="h-5 w-5 text-gray-400"
                                          aria-hidden="true"
                                        />
                                      </Combobox.Button>

                                      {filteredStudents.length > 0 && (
                                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                          {filteredStudents.map((student) => (
                                            <Combobox.Option
                                              key={student.id}
                                              value={student}
                                              className={({ active }) =>
                                                classNames(
                                                  "relative cursor-default select-none py-2 pl-3 pr-9",
                                                  active
                                                    ? "bg-indigo-600 text-white"
                                                    : "text-gray-900"
                                                )
                                              }
                                            >
                                              {({
                                                active,
                                                selectedStudent,
                                              }) => (
                                                <>
                                                  <span
                                                    className={classNames(
                                                      "block truncate",
                                                      selectedStudent &&
                                                        "font-semibold"
                                                    )}
                                                  >
                                                    {student.name}
                                                  </span>

                                                  {selectedStudent && (
                                                    <span
                                                      className={classNames(
                                                        "absolute inset-y-0 right-0 flex items-center pr-4",
                                                        active
                                                          ? "text-white"
                                                          : "text-indigo-600"
                                                      )}
                                                    >
                                                      <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                      />
                                                    </span>
                                                  )}
                                                </>
                                              )}
                                            </Combobox.Option>
                                          ))}
                                        </Combobox.Options>
                                      )}
                                    </div>
                                  </Combobox>
                                </div>
                              </div>
                              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left px-10 pt-5">
                                <div className="mt-2">
                                  {selectedStudent ? (
                                    <button
                                      type="button"
                                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                      onClick={() => {
                                        assignLaneParticipant(
                                          selectedStudent,
                                          selectedLane,
                                          values,
                                          setSelected,
                                          setAssignedParticipants
                                        );
                                        setOpen(false);
                                      }}
                                    >
                                      Assign
                                    </button>
                                  ) : (
                                    <button
                                      disabled
                                      type="button"
                                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-25"
                                    >
                                      Assign
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition.Root>
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
