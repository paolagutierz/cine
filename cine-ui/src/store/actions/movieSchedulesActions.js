import {
  GET_MOVIESCHEDULES,
  CREATE_MOVIESCHEDULES,
  ADD_MOVIESCHEDULES,
  UPDATE_MOVIESCHEDULES,
  DELETE_MOVIESCHEDULES,
  SELECT_MOVIESCHEDULES,
  SELECT_ALL_MOVIESCHEDULES,
} from "../types";
import movieSchedules from "../reducers/movieSchedules";
import { setAlert } from "./alert";

export const getmovieSchedules = () => async (dispatch) => {
  try {
    const url = "/movieschedules";
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const movieSchedules = await response.json();
    if (response.ok) {
      dispatch({ type: GET_MOVIESCHEDULES, payload: movieSchedules });
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};

export const createmovieSchedules = (newmovieSchedule) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = "/movieschedules";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newmovieSchedule),
    });
    const movieSchedules = await response.json();
    if (response.ok) {
      dispatch({ type: CREATE_MOVIESCHEDULES, payload: movieSchedules });
      if (response.ok) dispatch(setAlert("Horario creado", "success", 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
    return {
      status: "error",
      message: " el horario no fue guardado, intenta de nuevo.",
    };
  }
};

export const addmovieSchedules = (movieSchedules) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = "/movieschedules/";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieSchedules),
    });
    if (response.ok) {
      dispatch({ type: ADD_MOVIESCHEDULES, payload: movieSchedules });
      if (response.ok) {
        dispatch(setAlert("Horario creado", "success", 5000));
        return { status: "success", message: "el horario fue creado" };
      }
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
    return {
      status: "error",
      message: " el horario no pudo ser guardado, intenta de nuevo.",
    };
  }
};

export const updateMovieSchedules =
  (movieschedules, id) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const url = "/movieschedules/" + id;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieschedules),
      });
      if (response.ok) {
        dispatch({ type: UPDATE_MOVIESCHEDULES, payload: movieSchedules });
        if (response.ok) {
          dispatch(setAlert("Horario actualizado", "success", 5000));
          return { status: "success", message: "horario actualizado" };
        }
      }
    } catch (error) {
      dispatch(setAlert(error.message, "error", 5000));
      return {
        status: "error",
        message: " el horario no puedo ser guardado, intenta de nuevo.",
      };
    }
  };

export const deletemovieSchedules = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = "/movieschedules/" + id;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch({ type: DELETE_MOVIESCHEDULES, payload: id });
      dispatch(setAlert("horario eliminado", "success", 5000));
      dispatch(getmovieSchedules());
      return { status: "success", message: "horario eliminado" };
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
    return {
      status: "error",
      message: " el horario no pudo ser eliminado, intenta de nuevo.",
    };
  }
};

export const selectmovieSchedules = (movieSchedules) => ({
  type: SELECT_MOVIESCHEDULES,
  payload: movieSchedules,
});

export const selectAllmovieSchedules = () => ({
  type: SELECT_ALL_MOVIESCHEDULES,
});

export const getMovieSchedules = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = "/movieschedules";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const movieSchedules = await response.json();
    if (response.ok) {
      dispatch({ type: GET_MOVIESCHEDULES, payload: movieSchedules });
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};
