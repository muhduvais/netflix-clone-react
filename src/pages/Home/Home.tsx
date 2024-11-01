import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import './Home.css';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

// interface ApiBackdrop {
//   file_path: string;
//   [key: string]: any;
// }

export const Home: React.FC = () => {
  // Define state with types. 'apiData' is an array of objects, and 'randomIndex' is a number.
  // const [apiData, setApiData] = useState<ApiBackdrop[]>([]);
  // const [randomIndex, setRandomIndex] = useState<number>(0);

  // const options: RequestInit = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: 'Bearer <your_token>'
  //   }
  // };

  // useEffect(() => {
  //   fetch('https://api.themoviedb.org/3/movie/1184918/images', options)
  //     .then((res) => res.json())
  //     .then((res) => setApiData(res.backdrops))
  //     .catch((err) => console.error(err));
  // }, []);

  // useEffect(() => {
  //   if (apiData.length > 0) {
  //     setRandomIndex(Math.floor(Math.random() * apiData.length));
  //   }
  // }, [apiData]);

  // Console log for debugging purposes
  // console.log('apiData length: ', apiData.length);
  // console.log('apiData: ', apiData);

  // Image path for API images
  // `https://image.tmdb.org/t/p/w500` + apiData[randomIndex]?.file_path

  return (
    <div className='home'>
      <Navbar />
      <div className="hero relative">
        <img src={hero_banner} alt="" className='banner-img'/>
        <div className="hero-caption absolute bottom-0 w-full">
          <img src={hero_title} alt="" className='caption-img mb-5'/>
          <p className='text-md max-w-3xl mb-10'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt cupiditate, fuga minima fugiat quibusdam
            molestiae cum iure suscipit architecto aspernatur hic ex maiores incidunt ipsum ipsa saepe in eos? Nostrum.
          </p>
          <div className="hero-btns flex gap-3 mb-10 text-black">
            <button className='btn'><img src={play_icon} alt="" />Play</button>
            <button className='btn dark-btn text-white'><img src={info_icon} alt="" />More Info</button>
          </div>
          <TitleCards />
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Popular on Netflix"} category={"now_playing"}/>
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
        <TitleCards title={"Only on Netflix"} category={"popular"}/>
        <TitleCards title={"Upcoming"} category={"upcoming"}/>
        <TitleCards title={"Top picks for you"} category={"now_playing"}/>
      </div>
      <Footer />
    </div>
  );
};

export default Home;