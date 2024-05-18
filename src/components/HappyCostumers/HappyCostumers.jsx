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
        const users = res.data.userAvatars;
        const defaultUrl =
          'https://finalteamproject-backend.onrender.com/icon/defaultAvatar.png';

          const originalAvatars = users.filter(item => item.avatarUrl !== defaultUrl);
          
          const count = Math.min(3, originalAvatars.length);
          const chosenAvatars = [];
          while (chosenAvatars.length < count) {
            const index = Math.floor(Math.random() * originalAvatars.length);
            const avatar = originalAvatars[index];
            if (!chosenAvatars.includes(avatar)) {
              chosenAvatars.push(avatar);
            }
          }
        setRandomAvatars(chosenAvatars);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
