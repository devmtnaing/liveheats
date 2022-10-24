import Link from "next/link";
import { useContext, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AdminLayout from "../../../components/admin_layout";
import { classNames } from "../../../utils/helpers";
import { AdminContext } from "../../../context/admin";
import { XMarkIcon } from "@heroicons/react/24/outline";

function NoRacesContent() {
  return (
    <div className="py-4">
      <Link href="/admin/races/create">
        <button
          type="button"
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span className="mt-2 block text-sm font-medium text-gray-900">
            Create a new race
          </span>
        </button>
      </Link>
    </div>
  );
}

function RaceListView(state, setOpen, setRaceId, setAvailableRanks) {
  return (
    <div className="py-4">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row flex-row-reverse">
          <Link href="/admin/races/create">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Race
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
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                      >
                        Total Lanes
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                      >
                        Total participants
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                      >
                        <span className="sr-only">Details</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {state.races.map((race, raceIdx) => (
                      <tr key={race.id}>
                        <td
                          className={classNames(
                            raceIdx !== state.races.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          )}
                        >
                          {race.name}
                        </td>
                        <td
                          className={classNames(
                            raceIdx !== state.races.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          )}
                        >
                          {race.lanes.length}
                        </td>
                        <td
                          className={classNames(
                            raceIdx !== state.races.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          )}
                        >
                          {
                            race.lanes.filter((obj) => obj.participant_id)
                              .length
                          }
                        </td>
                        <td
                          className={classNames(
                            raceIdx !== state.races.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8"
                          )}
                        >
                          <button
                            onClick={() => {
                              setRaceId(race.id);
                              let ranks = [];
                              let existingRanks = [];
                              let count = 0;
                              race = state.races.find((r) => r.id == race.id);
                              race.lanes.forEach((lane) => {
                                if (lane.participant_id) {
                                  count++;
                                  ranks.push(count);
                                }
                                if (lane.rank) {
                                  existingRanks.push(parseInt(lane.rank));
                                }
                              });
                              console.log("r", ranks);
                              console.log("er", existingRanks);
                              setAvailableRanks(
                                ranks.filter((r) => !existingRanks.includes(r))
                              );
                              setOpen(true);
                            }}
                          >
                            <a className="text-indigo-600 hover:text-indigo-900">
                              View Details
                              <span className="sr-only">, {race.name}</span>
                            </a>
                          </button>
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

export default function RacesIndex() {
  const { state, dispatch } = useContext(AdminContext);
  const [open, setOpen] = useState(false);
  const [raceId, setRaceId] = useState(null);
  const selectedRace = state.races.find((r) => r.id === raceId);
  const [availableRanks, setAvailableRanks] = useState([]);

  return (
    <main className="flex-1">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Races Dashboard
          </h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {state.races.length == 0
            ? NoRacesContent()
            : RaceListView(state, setOpen, setRaceId, setAvailableRanks)}
        </div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <div className="fixed inset-0" />

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                      <form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1">
                          <div className="bg-gray-50 px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between space-x-3">
                              <div className="space-y-1">
                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                  {selectedRace?.name}
                                </Dialog.Title>
                                <p className="text-sm text-gray-500">
                                  Race Details
                                </p>
                              </div>
                              <div className="flex h-7 items-center">
                                <button
                                  type="button"
                                  className="text-gray-400 hover:text-gray-500"
                                  onClick={() => setOpen(false)}
                                >
                                  <span className="sr-only">Close panel</span>
                                  <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>

                          <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                                >
                                  Lane Number
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                  Participant
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                  Ranking
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {selectedRace?.lanes.map((lane) => {
                                let participant = state.students.find(
                                  (obj) => obj.id == lane.participant_id
                                );
                                return (
                                  <tr key={lane.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                      Lane {lane.id}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {participant ? (
                                        <>
                                          <div className="text-gray-900">
                                            {participant?.name}
                                          </div>
                                          <div className="text-gray-500">
                                            {participant?.email}
                                          </div>
                                        </>
                                      ) : (
                                        "Unassigned slot"
                                      )}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                      {lane.participant_id ? (
                                        lane.rank ? (
                                          lane.rank
                                        ) : (
                                          <select
                                            id="location"
                                            name="location"
                                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            defaultValue="default"
                                            onChange={(e) => {
                                              dispatch({
                                                type: "ASSIGNED_RANK",
                                                payload: {
                                                  race_id: selectedRace?.id,
                                                  lane_id: lane.id,
                                                  rank: e.target.value,
                                                },
                                              });
                                              setAvailableRanks(
                                                availableRanks.filter(
                                                  (a) => a != e.target.value
                                                )
                                              );
                                            }}
                                          >
                                            <option value="default" disabled>
                                              Select Rank
                                            </option>
                                            {availableRanks?.map((r) => (
                                              <option key={r} value={r}>
                                                {r}
                                              </option>
                                            ))}
                                          </select>
                                        )
                                      ) : (
                                        <p className="whitespace-nowrap py-2 text-sm text-gray-500">
                                          No Ranking
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </main>
  );
}

RacesIndex.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
