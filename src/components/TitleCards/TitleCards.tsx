import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

interface TitleCardsProps {
  title?: string;
  category?: string;
}

interface MovieCard {
  id: number;
  backdrop_path: string;
  original_title: string;
}

const TitleCards: React.FC<TitleCardsProps> = ({ title, category }) => {

  const [apiData, setApiData] = useState<MovieCard[]>([]);
  const cardsRef = useRef<HTMLDivElement>(null);

  const options: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0N2Q0MGZhY2JiYzM4OWJjNWFhMmE0Nzc2MmYxYmIzNyIsIm5iZiI6MTcyOTkyMTg0Ni42NTk1NjcsInN1YiI6IjY3MWM4MWY0NWJlOWU4NzU5ZGE3NTY0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XS0CUZ8kd8S6pVBah415GUPcMH2GsNGWWc1nkM2GFoo'
    }
  };

  // Scroll handler
  // const handleWheel = (event: WheelEvent) => {
  //   event.preventDefault();
  //   if (cardsRef.current) {
  //     cardsRef.current.scrollLeft += event.deltaY;
  //   }
  // };

  console.log('category: ', category);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    // if (cardsRef.current) {
    //   cardsRef.current.addEventListener('wheel', handleWheel);
    // }
  }, [category]);

  return (
    <div className={`title-cards my-5 ${title === "Popular on Netflix" ? 'small-card' : ''}`}>
      <h2 className={`mb-5 font-bold ${!category ? 'cardh2-first' : ''}`}>
        {title || "Popular on Netflix"}
      </h2>
      <div className="card-list flex gap-x-5 overflow-x-scroll" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}${card.backdrop_path}`} className="card relative" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`}
              alt={card.original_title}
              className={`rounded-lg cursor-pointer ${!category ? 'titlecard-first' : 'titlecard'}`}
            />
            <p className='movie-name absolute bottom-5 right-5'>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;