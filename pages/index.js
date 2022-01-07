import { useEffect, useState } from 'react';
import List from '../components/List';
import Search from '../components/Search';
import Layout from '../components/Layout';
import useContextState from '../context/UseStateContext';
import getData from '../utils/getData';

export default function Home() {
  const [filteredData, setFilteredData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useContextState();
  const { languages } = state;

  useEffect(() => {
    getData().then((languageArray) => {
      setFilteredData(languageArray);

      setState((prevState) => ({
        ...prevState,
        languages: languageArray,
      }));
    });
  }, [setState]);

  useEffect(() => {
    if (languages) {
      const newData = languages.filter((row) => {
        return row.english.toLowerCase().includes(searchTerm.toLowerCase());
      });

      setFilteredData(newData);

      if (searchTerm.trim() === '') {
        setSearchTerm('');
      }
    }
  }, [searchTerm, languages]);

  return (
    <Layout showBackButton={false}>
      {filteredData && <List list={filteredData} />}
      <Search
        className='bottom-0'
        onChange={({ target: { value } }) => setSearchTerm(value)}
      />
    </Layout>
  );
}
