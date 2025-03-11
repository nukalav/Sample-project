import React, { useState, useEffect } from 'react';

// Types
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
}

const MovieWebsite: React.FC = () => {
  // State management
  const [movies, setMovies] = useState<Movie[]>([]);
  const [featured, setFeatured] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [imagesLoaded, setImagesLoaded] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        // In a real application, you would fetch this data from an API
        const mockMovies: Movie[] = [
          {
            id: 1,
            title: "Inception",
            overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
            poster_path: "/api/placeholder/300/450",
            backdrop_path: "/api/placeholder/1920/1080",
            vote_average: 8.8,
            release_date: "2010-07-16",
            genre_ids: [28, 878, 53]
          },
          {
            id: 2,
            title: "The Shawshank Redemption",
            overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            poster_path: "/api/placeholder/300/450",
            backdrop_path: "/api/placeholder/1920/1080",
            vote_average: 9.3,
            release_date: "1994-09-23",
            genre_ids: [18, 80]
          },
          {
            id: 3,
            title: "The Dark Knight",
            overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            poster_path: "/api/placeholder/300/450",
            backdrop_path: "/api/placeholder/1920/1080",
            vote_average: 9.0,
            release_date: "2008-07-18",
            genre_ids: [28, 80, 18, 53]
          },
          {
            id: 4,
            title: "Pulp Fiction",
            overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
            poster_path: "/api/placeholder/300/450",
            backdrop_path: "/api/placeholder/1920/1080",
            vote_average: 8.9,
            release_date: "1994-10-14",
            genre_ids: [53, 80]
          },
          {
            id: 5,
            title: "The Lord of the Rings: The Return of the King",
            overview: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
            poster_path: "/api/placeholder/300/450",
            backdrop_path: "/api/placeholder/1920/1080",
            vote_average: 8.9,
            release_date: "2003-12-17",
            genre_ids: [12, 14, 28]
          },
          {
            id: 6,
            title: "Forrest Gump",
            overview: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.",
            poster_path: "/api/placeholder/300/450",
            backdrop_path: "/api/placeholder/1920/1080",
            vote_average: 8.8,
            release_date: "1994-07-06",
            genre_ids: [35, 18, 10749]
          }
        ];

        const mockGenres: Genre[] = [
          { id: 28, name: "Action" },
          { id: 12, name: "Adventure" },
          { id: 16, name: "Animation" },
          { id: 35, name: "Comedy" },
          { id: 80, name: "Crime" },
          { id: 99, name: "Documentary" },
          { id: 18, name: "Drama" },
          { id: 10751, name: "Family" },
          { id: 14, name: "Fantasy" },
          { id: 36, name: "History" },
          { id: 27, name: "Horror" },
          { id: 10402, name: "Music" },
          { id: 9648, name: "Mystery" },
          { id: 10749, name: "Romance" },
          { id: 878, name: "Science Fiction" },
          { id: 10770, name: "TV Movie" },
          { id: 53, name: "Thriller" },
          { id: 10752, name: "War" },
          { id: 37, name: "Western" }
        ];

        if (mounted) {
          setMovies(mockMovies);
          setGenres(mockGenres);
          setFeatured(mockMovies[0]);
          setTimeout(() => setLoading(false), 1000);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleImageLoad = (movieId: number) => {
    setImagesLoaded(prev => ({
      ...prev,
      [movieId]: true
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleGenreSelect = (genreId: number | null) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = movies.filter(movie => {
    const matchesGenre = selectedGenre ? movie.genre_ids.includes(selectedGenre) : true;
    const matchesSearch = searchQuery 
      ? movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        movie.overview.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesGenre && matchesSearch;
  });

  const getGenreName = (id: number): string => {
    const genre = genres.find(g => g.id === id);
    return genre ? genre.name : '';
  };

  const handleMovieClick = (movie: Movie) => {
    setFeatured(movie);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-red-500 text-2xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Navigation Bar */}
      <nav className="bg-black p-4 sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-red-600 mr-2">🎬</span>
            <span className="text-2xl font-bold text-red-600">CinemaHub</span>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search movies..."
              className="bg-gray-800 px-4 py-2 rounded-lg text-white w-64 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search movies"
            />
            <a href="#" className="hover:text-red-600 transition duration-300">Home</a>
            <a href="#" className="hover:text-red-600 transition duration-300">New Releases</a>
            <a href="#" className="hover:text-red-600 transition duration-300">Top Rated</a>
            <a href="#" className="hover:text-red-600 transition duration-300">My List</a>
          </div>
        </div>
      </nav>

      {/* Featured Movie Banner */}
      {featured && (
        <div className="relative h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
          <div 
            className="absolute inset-0 bg-center bg-cover" 
            style={{ backgroundImage: `url(${featured.backdrop_path})` }}
          ></div>
          <div className="container mx-auto flex items-end h-full pb-8 relative z-10">
            <div className="flex w-full">
              <div className="hidden md:block w-1/4 pr-6">
                <img 
                  src={featured.poster_path} 
                  alt={featured.title}
                  onLoad={() => handleImageLoad(featured.id)}
                  className={`w-full rounded-lg shadow-2xl transition-opacity duration-300 ${
                    imagesLoaded[featured.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {!imagesLoaded[featured.id] && (
                  <div className="w-full h-full bg-gray-800 animate-pulse rounded-lg"></div>
                )}
              </div>
              <div className="w-full md:w-3/4 pl-4">
                <h1 className="text-4xl font-bold mb-2">{featured.title}</h1>
                <div className="flex items-center space-x-4 mb-2">
                  <span className="bg-red-600 px-2 py-1 rounded text-sm">{featured.vote_average.toFixed(1)}</span>
                  <span>{new Date(featured.release_date).getFullYear()}</span>
                  <div className="flex space-x-2">
                    {featured.genre_ids.slice(0, 3).map(genreId => (
                      <span 
                        key={genreId} 
                        className="bg-gray-800 px-2 py-1 rounded-full text-xs cursor-pointer hover:bg-gray-700"
                        onClick={() => handleGenreSelect(genreId)}
                      >
                        {getGenreName(genreId)}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 line-clamp-3 md:line-clamp-none">{featured.overview}</p>
                <div className="mt-4 space-x-4">
                  <button 
                    className="bg-red-600 hover:bg-red-700 transition duration-300 px-6 py-2 rounded-lg font-bold flex items-center"
                    onClick={() => console.log('Watch Now clicked')}
                  >
                    <span className="mr-2">▶</span> Watch Now
                  </button>
                  <button 
                    className="bg-gray-800 hover:bg-gray-700 transition duration-300 px-6 py-2 rounded-lg font-bold"
                    onClick={() => console.log('Add to List clicked')}
                  >
                    + My List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Genre Filter */}
      <div className="container mx-auto py-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button
            className={`px-4 py-2 rounded-full ${
              selectedGenre === null ? 'bg-red-600' : 'bg-gray-800'
            } hover:bg-red-700 transition duration-300`}
            onClick={() => handleGenreSelect(null)}
          >
            All
          </button>
          {genres.map(genre => (
            <button
              key={genre.id}
              className={`px-4 py-2 rounded-full ${
                selectedGenre === genre.id ? 'bg-red-600' : 'bg-gray-800'
              } hover:bg-red-700 transition duration-300 whitespace-nowrap`}
              onClick={() => handleGenreSelect(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Grid */}
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map(movie => (
            <div 
              key={movie.id}
              className="relative cursor-pointer transform hover:scale-105 transition duration-300"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="relative aspect-w-2 aspect-h-3">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  onLoad={() => handleImageLoad(movie.id)}
                  className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
                    imagesLoaded[movie.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {!imagesLoaded[movie.id] && (
                  <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-lg">{movie.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieWebsite;