export function student(state, action) {
  switch (action.type) {
    case "ADDED_STUDENT":
      return { 
        ...state,
        students: [action.payload, ...state.students] 
      }
    default:
      return state;
  }
}