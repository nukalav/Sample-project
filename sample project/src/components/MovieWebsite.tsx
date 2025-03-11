import React, { useState, useEffect } from 'react';
import './MovieWebsite.css';

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
  popularity: number;
  vote_count: number;
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
        // Using TMDB-style image paths for better visuals
        const mockMovies: Movie[] = [
          {
            id: 1,
            title: "Dune",
            overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
            poster_path: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
            backdrop_path: "https://image.tmdb.org/t/p/original/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg",
            vote_average: 8.4,
            release_date: "2021-09-15",
            genre_ids: [878, 12],
            popularity: 2341.802,
            vote_count: 5869
          },
          {
            id: 2,
            title: "The Batman",
            overview: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
            poster_path: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
            backdrop_path: "https://image.tmdb.org/t/p/original/5P8SmMzSNYikXpxil6BYzJ16611.jpg",
            vote_average: 7.8,
            release_date: "2022-03-01",
            genre_ids: [28, 80, 9648],
            popularity: 1972.452,
            vote_count: 4863
          },
          {
            id: 3,
            title: "Spider-Man: No Way Home",
            overview: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
            poster_path: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
            backdrop_path: "https://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
            vote_average: 8.1,
            release_date: "2021-12-15",
            genre_ids: [28, 12, 878],
            popularity: 3456.845,
            vote_count: 12789
          }
        ];

        const mockGenres: Genre[] = [
          { id: 28, name: "Action" },
          { id: 12, name: "Adventure" },
          { id: 16, name: "Animation" },
          { id: 35, name: "Comedy" },
          { id: 80, name: "Crime" },
          { id: 18, name: "Drama" },
          { id: 14, name: "Fantasy" },
          { id: 878, name: "Science Fiction" },
          { id: 53, name: "Thriller" },
          { id: 9648, name: "Mystery" }
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
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading amazing movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="movie-website">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">
            <span className="logo-icon">🎬</span>
            <span className="logo-text">CinemaVerse</span>
          </div>
          <div className="nav-controls">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearchChange}
                aria-label="Search movies"
              />
              <span className="search-icon">🔍</span>
            </div>
            <div className="nav-links">
              <a href="#" className="nav-link">Home</a>
              <a href="#" className="nav-link">New Releases</a>
              <a href="#" className="nav-link">Top Rated</a>
              <a href="#" className="nav-link">My List</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Featured Movie Banner */}
      {featured && (
        <div className="featured-movie">
          <div className="featured-backdrop" style={{ backgroundImage: `url(${featured.backdrop_path})` }}>
            <div className="featured-overlay"></div>
          </div>
          <div className="featured-content">
            <div className="featured-poster">
              <img 
                src={featured.poster_path} 
                alt={featured.title}
                onLoad={() => handleImageLoad(featured.id)}
                className={imagesLoaded[featured.id] ? 'loaded' : ''}
              />
              {!imagesLoaded[featured.id] && <div className="poster-placeholder" />}
            </div>
            <div className="featured-info">
              <h1>{featured.title}</h1>
              <div className="movie-meta">
                <span className="rating">{featured.vote_average.toFixed(1)}</span>
                <span className="year">{new Date(featured.release_date).getFullYear()}</span>
                <div className="genres">
                  {featured.genre_ids.slice(0, 3).map(genreId => (
                    <span 
                      key={genreId} 
                      className="genre-tag"
                      onClick={() => handleGenreSelect(genreId)}
                    >
                      {getGenreName(genreId)}
                    </span>
                  ))}
                </div>
              </div>
              <p className="overview">{featured.overview}</p>
              <div className="action-buttons">
                <button className="watch-button">
                  <span>▶</span> Watch Now
                </button>
                <button className="list-button">
                  + Add to List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Genre Filter */}
      <div className="genre-filter">
        <button
          className={`genre-button ${selectedGenre === null ? 'active' : ''}`}
          onClick={() => handleGenreSelect(null)}
        >
          All
        </button>
        {genres.map(genre => (
          <button
            key={genre.id}
            className={`genre-button ${selectedGenre === genre.id ? 'active' : ''}`}
            onClick={() => handleGenreSelect(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Movie Grid */}
      <div className="movie-grid">
        {filteredMovies.map(movie => (
          <div 
            key={movie.id}
            className="movie-card"
            onClick={() => handleMovieClick(movie)}
          >
            <div className="movie-poster">
              <img
                src={movie.poster_path}
                alt={movie.title}
                onLoad={() => handleImageLoad(movie.id)}
                className={imagesLoaded[movie.id] ? 'loaded' : ''}
              />
              {!imagesLoaded[movie.id] && <div className="poster-placeholder" />}
              <div className="movie-info-overlay">
                <h3>{movie.title}</h3>
                <div className="movie-stats">
                  <span className="star">★</span>
                  <span className="rating">{movie.vote_average.toFixed(1)}</span>
                  <span className="year">({new Date(movie.release_date).getFullYear()})</span>
                </div>
                <div className="movie-genres">
                  {movie.genre_ids.slice(0, 2).map(genreId => (
                    <span key={genreId} className="genre-tag-small">{getGenreName(genreId)}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieWebsite; 