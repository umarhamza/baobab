import { useEffect, useState } from 'react';
import { google } from 'googleapis';
import List from '../components/List';
import Search from '../components/Search';
import Layout from '../components/Layout';
import { mapTranslations } from '../utils/helpers';

export async function getServerSideProps() {
  const auth = await google.auth.getClient({
    credentials: {
      client_email: process.env.client_email,
      private_key: process.env.private_key,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const range = `Data!A2:C2000`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.sheet_id_1,
    range,
  });

  return {
    props: {
      data: response.data.values,
    },
  };
}

export default function Home({ data }) {
  const [languages, setLanguages] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const languageArray = mapTranslations(data);
    setLanguages(languageArray);
  }, [data]);

  useEffect(() => {
    setFilteredData(languages);
  }, [languages]);

  useEffect(() => {
    const newData = languages.filter((row) =>
      row.english.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(newData);

    if (searchTerm.trim() === '') {
      setSearchTerm('');
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
