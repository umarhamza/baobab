import { useEffect, useState } from 'react';
import List from '../components/List';
import Search from '../components/Search';
import Layout from '../components/Layout';
import useContextState from '../context/UseStateContext';
import getData from '../utils/getData';
import { Spinner } from '../components/Spinner';

export default function Home() {
  const [filteredData, setFilteredData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useContextState();
  const { languages } = state;

  useEffect(() => {
    getData().then((languageArray) => {
      if (languageArray) {
        setFilteredData(languageArray);

        setState((prevState) => ({
          ...prevState,
          languages: languageArray,
          alert: null,
          loading: false,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          alert: {
            msg: 'There was an error loading translations.',
            type: 'error',
          },
        }));
      }
    });
  }, [setState]);

  useEffect(() => {
    if (languages) {
      const newData = languages.filter((row) => {
        const english = row.english ? row.english : '';
        return english.toLowerCase().includes(searchTerm.toLowerCase());
      });

      setFilteredData(newData);

      if (searchTerm.trim() === '') {
        setSearchTerm('');
      }
    }
  }, [searchTerm, languages]);

  return (
    <Layout showBackButton={false}>
      {filteredData ? (
        <List list={filteredData} originalList={languages} />
      ) : (
        <Spinner />
      )}
      <Search
        className='bottom-0'
        onChange={({ target: { value } }) => setSearchTerm(value)}
      />
    </Layout>
  );
}
