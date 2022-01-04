import { useEffect, useState } from 'react';
import { google } from 'googleapis';
import Title from '../../components/Title';
import Layout from '../../components/Layout';
import { mapTranslations } from '../../utils/helpers';
import Card from '../../components/Card';

export async function getServerSideProps({ query }) {
  const { id } = query;
  const rowNumber = parseInt(id) + 1;

  const auth = await google.auth.getClient({
    credentials: {
      client_email: process.env.client_email,
      private_key: process.env.private_key,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const range = `Data!A${rowNumber}:C${rowNumber}`;

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

export default function Translations({ data }) {
  const [language, setLanguage] = useState({});

  useEffect(() => {
    const languageArray = mapTranslations(data)[0];
    setLanguage(languageArray);
  }, [data]);

  const cardList = [];

  Object.keys(language).forEach(function (lang) {
    const translation = language[lang];
    cardList.push(<Card key={translation} card={translation} prefix={lang} />);
  });

  return (
    <Layout pageTitle={language.wolof} seoTitle={language.wolof}>
      <div className='mt-10'>
        <h4 className='mb-6 text-3xl font-bold'>Translation</h4>
        {cardList}
      </div>
    </Layout>
  );
}
