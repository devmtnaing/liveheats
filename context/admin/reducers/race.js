export function race(state, action) {
  switch (action.type) {
    case "ADDED_RACE":
      return { 
        ...state,
        races: [action.payload, ...state.races] 
      }
    default:
      return state;
  }
}