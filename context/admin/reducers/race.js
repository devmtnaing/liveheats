export function race(state, action) {
  switch (action.type) {
    case "ADDED_RACE":
      return {
        ...state,
        races: [action.payload, ...state.races],
      };
    case "ASSIGNED_RANK":
      var race = state.races.find((obj) => obj.id == action.payload.race_id);
      var lane = race.lanes.find((obj) => obj.id == action.payload.lane_id);
      lane.rank = action.payload.rank;
      return {
        ...state,
      };
    default:
      return state;
  }
}
