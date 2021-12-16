import Movie from "../components/Movie";
import Page from "../components/Page";
import MovieListings from "./MovieListings";

const Home = () => {
  return (
    <Page>
      <Movie />
      <MovieListings />
    </Page>
  );
};

export default Home;
