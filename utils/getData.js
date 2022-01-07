import axios from 'axios';
import { mapTranslations } from './helpers';

const getData = async () => {
  const baobabData = JSON.parse(localStorage.getItem('baobabData'));

  if (baobabData) {
    return mapTranslations(baobabData);
  } else {
    try {
      const res = await axios.get('/api/googleAPI');

      if (res.status === 200) console.log(res.status);

      const data = res.data.data;
      console.log('axios');
      localStorage.setItem('baobabData', JSON.stringify(data));

      return mapTranslations(data);
    } catch (error) {
      console.error(error);
    }
  }
};

export default getData;
