import { useReducer, createContext } from "react";
import { student } from "./reducers/student";
import { race } from "./reducers/race";
import PropTypes from "prop-types";

const initialState = {
  students: [],
  races: [],
};

const AdminContext = createContext({});

const combineReducers =
  (...reducers) =>
  (state, action) => {
    for (let i = 0; i < reducers.length; i++)
      state = reducers[i](state, action);
    return state;
  };

const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    combineReducers(student, race),
    initialState
  );
  const value = { state, dispatch };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

AdminProvider.propTypes = {
  children: PropTypes.element,
};

export { AdminContext, AdminProvider };
