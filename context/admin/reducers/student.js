export function student(state, action) {
  switch (action.type) {
    case "ADDED_STUDENT":
      return {
        ...state,
        students: [action.payload, ...state.students],
      };
    case "UPDATED_STUDENT":
      var student_index = state.students.findIndex(
        (student) => student.id == action.payload.id
      );
      state.students[student_index] = action.payload;
      return {
        ...state,
        students: [...state.students],
      };
    default:
      return state;
  }
}
