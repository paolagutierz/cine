import { GET_MOVIES, SELECT_MOVIE, CREATE_MOVIE } from "../types";
import { setAlert } from "./alert";

export const createMovieAction = (image, newMovie) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = "/movies";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });

    const movie = await response.json();
    if (response.ok) {
      dispatch(setAlert("Movie Created", "success", 5000));
      if (image) dispatch(uploadMovieImageAction(movie._id, image));
      dispatch(getMoviesAction());
      return { status: "success", message: "Movie Created" };
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
    return {
      status: "error",
      message: " Movie have not been saved, try again.",
    };
  }
};

export const uploadMovieImageAction = (id, image) => async (dispatch) => {
  try {
    const data = new FormData();
    data.append("file", image);
    const url = "/movies/photo/" + id;
    const response = await fetch(url, {
      method: "POST",
      body: data,
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch(setAlert("Image Uploaded", "success", 5000));
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, "error", 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};

export const getMoviesAction = () => async (dispatch) => {
  try {
    const url = "/movies";
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const movies = await response.json();
    if (response.ok) {
      dispatch({ type: GET_MOVIES, payload: movies });
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};

export const onSelectMovieAction = (movie) => ({
  type: SELECT_MOVIE,
  payload: movie,
});

export const getMovieAction = (id) => async (dispatch) => {
  try {
    const url = "/movies/" + id;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const movie = await response.json();
    if (response.ok) {
      dispatch({ type: SELECT_MOVIE, payload: movie });
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};

export const addMovieAction = (image, newMovie) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = "/movies";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });
    const movie = await response.json();
    if (response.ok) {
      dispatch(setAlert("Movie have been saved!", "success", 5000));
      if (image) dispatch(uploadMovieImageAction(movie._id, image));
      dispatch(getMoviesAction());
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};

export const updateMovieAction =
  (movieId, movie, image) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const url = "/movies/" + movieId;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });
      if (response.ok) {
        dispatch(onSelectMovieAction(null));
        dispatch(setAlert("Movie have been saved!", "success", 5000));
        if (image) dispatch(uploadMovieImageAction(movieId, image));
        dispatch(getMoviesAction());
      }
    } catch (error) {
      dispatch(setAlert(error.message, "error", 5000));
    }
  };

export const removeMovieAction = (movieId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = "/movies/" + movieId;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(getMoviesAction());
      dispatch(onSelectMovieAction(null));
      dispatch(setAlert("Movie have been Deleted!", "success", 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};
