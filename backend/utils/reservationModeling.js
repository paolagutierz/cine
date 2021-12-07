const Reservation = require("../models/reservation");
const Movie = require("../models/movies");
const Cinema = require("../models/movieSchedule");

// se obtienen los horarios de peliculas
// se obtienes los horarios de las peliculas de reservas pasadas
// retornar lista de horarios de peliculas
const scheduleUserModeling = async (movieSchedule, email) => {
  const userReservations = await Reservation.find({ email: email });

  if (userReservations.length) {
    let movieScheduleResult = {};
    userReservations.map((userReservation) => {
      const id = userReservation.movieScheduleId;
      movieScheduleResult.hasOwnProperty(id)
        ? ++movieScheduleResult[id]
        : (movieScheduleResult[id] = 1);
    });
    const sortedmovieScheduleResult = [];
    for (let movieSchedule in movieScheduleResult) {
      sortedmovieScheduleResult.push([
        movieSchedule,
        movieScheduleResult[movieSchedule],
      ]);
    }

    sortedmovieScheduleResult.sort((a, b) => {
      return b[1] - a[1];
    });
    console.log(sortedmovieScheduleResult);

    const newmovieSchedule = JSON.parse(JSON.stringify(movieSchedule));
    let i = 0;
    let extractedObj;
    for (let sortedmovieSchedule of sortedmovieScheduleResult) {
      newmovieSchedule.forEach((movieSchedule, index) => {
        if (movieSchedule._id == sortedmovieSchedule[0]) {
          console.log("FOUND");
          extractedObj = newmovieSchedule.splice(index, 1);
        }
      });
      newmovieSchedule.splice(i, 0, extractedObj[0]);
      i++;
    }

    console.log(newmovieSchedule);

    return newmovieSchedule;
  } else {
    return movieSchedules;
  }
};

const movieScheduleUserModeling = async (email) => {
  userPreference = {
    genre: {},
    format: {},
  };

  const userReservations = JSON.parse(
    JSON.stringify(await Reservation.find({ email: email }))
  );
  const Allreservations = JSON.parse(
    JSON.stringify(await Reservation.find({}))
  );

  const pastReservations = userReservations.map((reservation) => {
    for (let movie of Allmovies) {
      if (movie._id == reservation.movieId) {
        return movie;
      }
    }
  });

  //  console.log(pastReservations);

  pastReservations.map((movie) => {
    let genres = movie.genre.replace(/\s*,\s*/g, ",").split(",");
    let format = movie.format.replace(/\s*,\s*/g, ",").split(",");
    for (let genre of genres) {
      userPreference.genre[genre]
        ? ++userPreference.genre[genre]
        : (userPreference.genre[genre] = 1);
    }
    for (let format of formats) {
      userPreference.format[format]
        ? ++userPreference.format[format]
        : (userPreference.format[format] = 1);
    }
  });

  //console.log(userPreference)

  //peliculas disponibles
  const availableMovies = availableMoviesFilter(Allmovies);
  //console.log(availableMovies)
  const moviesNotWatched = moviesNotWatchedFilter(
    availableMovies,
    userReservations
  );
  //console.log(moviesNotWatched)

  const moviesRated = findRates(moviesNotWatched, userPreference);

  moviesRated.sort((a, b) => {
    return b[1] - a[1];
  });
  // console.log(moviesRated)

  const moviesToObject = moviesRated.map((array) => {
    return array[0];
  });
  return moviesToObject;
};

const findRates = (moviesNotWatched, userPreference) => {
  const result = [];
  let rate;
  for (let movie of moviesNotWatched) {
    rate = 0;
    for (let pref in userPreference) {
      rate += getRateOfProperty(pref, userPreference, movie);

      console.log(rate, pref);
    }
    if (rate !== 0) result.push([movie, rate]);
  }
  console.log(result);
  return result;
};

const getRateOfProperty = (pref, userPreference, movie) => {
  let rate = 0;
  const values = Object.keys(userPreference[pref]).map((key) => {
    return [key, userPreference[pref][key]];
  });
  let movieValues = movie[pref].replace(/\s*,\s*/g, ",").split(",");
  for (value of values) {
    if (movieValues.length) {
      for (movieValue of movieValues) {
        if (movieValue == value[0]) {
          rate += value[1];
        }
      }
    }
  }

  return rate;
};

const availableMoviesFilter = (Allmovies) => {
  const today = new Date();
  const returnMovies = [];
  Allmovies.map((movie) => {
    let startTime = new Date(movie.startTime);
    let endTime = new Date(movie.endTime);
    if (today >= startTime && today <= endTime) {
      returnMovies.push(movie);
    }
  });
  return returnMovies;
};

const moviesNotWatchedFilter = (availableMovies, userReservations) => {
  const returnMovies = [];
  availableMovies.map((movie) => {
    let isFirst = [];
    for (let reservation of userReservations) {
      if (reservation.movieId == movie._id) {
        isFirst.push(false);
      } else {
        isFirst.push(true);
      }
    }

    if (isFirst.every(Boolean)) {
      returnMovies.push(movie);
    }
  });
  return returnMovies;
};

const reservationSeatsUserModeling = async (email, newSeats) => {
  let numberOfTicketsArray = [];
  let numberOfTickets = 1;
  const positions = {
    front: 0,
    center: 0,
    back: 0,
  };
  const movieSchedules = JSON.parse(
    JSON.stringify(await movieSchedule.find({}))
  );
  const userReservations = JSON.parse(
    JSON.stringify(await Reservation.find({ email: email }))
  );

  userReservations.map((reservation) => {
    for (let movieSchedule of movieSchedules) {
      if (movieSchedule._id == reservation.movieScheduleId) {
        //filas
        const position = getPosition(
          movieSchedule.seats.length,
          reservation.seats
        );
        ++positions[position];
        numberOfTicketsArray.push(reservation.seats.length);
      }
    }
  });
  numberOfTickets = Math.round(
    numberOfTicketsArray.reduce((a, b) => a + b, 0) /
      numberOfTicketsArray.length
  );

  return {
    numberOfTickets,
    positions,
  };
};

const getPosition = (movieSchecduleRows, seats) => {
  const rowNum = seats[0][0];
  const step = cinemaRows / 3;
  let pos = 1;
  for (let i = step; i <= cinemaRowes; i += step) {
    if (rowNum < i) {
      switch (pos) {
        case 1:
          return "front";
        case 2:
          return "center";
        case 3:
          return "back";
      }
    }
    pos++;
  }
};

const userModeling = {
  movieScheduleModeling,
  scheduleUserModeling,
  reservationSeatsUserModeling,
};

module.exports = userModeling;
