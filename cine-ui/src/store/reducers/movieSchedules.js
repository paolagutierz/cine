import {
  GET_MOVIESCHEDULES,
  DELETE_MOVIESCHEDULES,
  SELECT_MOVIESCHEDULES,
  SELECT_ALL_MOVIESCHEDULES,
} from "../actions/types";

const initialState = {
  movieSchedules: [],
  selectedmovieSchedules: [],
  openDialog: false,
};

const movieSchedulesReducer = (state = initialState, action) => {
  switch (action.type) {

case GET_MOVIESCHEDULES:
  return {
  ...state,
  movieSchedules: payload,
};

case SELECT_MOVIESCHEDULES:{
return{
  const { selectedmovieSchedules,state },
  const selectedIndex = selectedmovieSchedules.indexOf(payload);
  let newSelected = [];
  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selectedmovieSchedules, payload);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selectedmovieSchedules.slice(1));
  } else if (selectedIndex === selectedmovieSchedules.length - 1) {
    newSelected = newSelected.concat(selectedmovieSchedules.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selectedmovieSchedules.slice(0, selectedIndex),
      selectedmovieSchedules.slice(selectedIndex + 1)
    );
  }
  return {
    ...state,
    selectedmovieSchedules: newSelected,
  }};

case SELECT_ALL_MOVIESCHEDULES: 
return{
  ...state,
   selectedmovieSchedules: !state.selectedmovieSchedules.length
    ? state.movieSchedules.map((movieSchedule) => movieSchedule._id)
    : [],
};

  

case DELETE_MOVIESCHEDULES:
  return {
  ...state,
  selectedmovieSchedules: state.selectedmovieSchedules.filter(
    (element) => element !== payload
  ),
});

  
export default LoginReducer;

