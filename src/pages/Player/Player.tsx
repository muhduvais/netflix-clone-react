import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

interface ApiData {
  name: string;
  key: string;
  published_at: string;
  type: string;
}

const Player: React.FC = () => {
  const { id, thumbnail } = useParams<Record<string, string | undefined>>();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState<ApiData>({
    name: '',
    key: '',
    published_at: '',
    type: ''
  });

  const options: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0N2Q0MGZhY2JiYzM4OWJjNWFhMmE0Nzc2MmYxYmIzNyIsIm5iZiI6MTcyOTkyMTg0Ni42NTk1NjcsInN1YiI6IjY3MWM4MWY0NWJlOWU4NzU5ZGE3NTY0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XS0CUZ8kd8S6pVBah415GUPcMH2GsNGWWc1nkM2GFoo'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className='player h-screen flex flex-col justify-center items-center'>
      <div
        className="video-banner w-screen h-screen bg-cover relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${thumbnail})`
        }}
      >
        <img
          src={back_arrow_icon}
          alt="Back"
          className='cursor-pointer absolute z-30'
          onClick={() => navigate(-2)}
        />
        <div className="cover-background absolute top-0 left-0 right-0 bottom-0 bg-black bg-black/50 backdrop-blur-sm z-10"></div>
        
        <iframe
          width="80%"
          height="80%"
          className='absolute z-20'
          src={`https://youtube.com/embed/${apiData.key}`}
          title='trailer'
          frameBorder="0"
          allowFullScreen
        ></iframe>

        <div className="player-info flex items-center justify-between py-3 absolute z-30">
          <p>{apiData.published_at.slice(0, 10)}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </div>
      </div>
    </div>
  );
};

export default Player;