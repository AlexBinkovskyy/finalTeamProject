import axios from 'axios';
import { useEffect, useState } from 'react';
import css from './HappyCostumers.module.css';

const fetchUrl =
  'https://finalteamproject-backend.onrender.com/api/users/getusers';

export default function HappyCostumers() {
  const [randomAvatars, setRandomAvatars] = useState([]);

  useEffect(() => {
    axios
      .get(fetchUrl)
      .then(res => {
        setRandomAvatars( res.data.userAvatars);
      })
      .catch(error => console.error('Error fetching data:', error));
  },[]);

  return (
    <div className={css.wrapper}>
      {randomAvatars.map((avatar, index) => (
        <img
          className={css.image}
          key={index}
          src={avatar.avatarUrl}
          alt="Happy user`s avatar"
        />
      ))}
    </div>
  );
}
