import { Fragment, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import useContextState from '../context/UseStateContext';
import { useRouter } from 'next/router';
import getData from '../utils/getData';
import { Spinner } from '../components/Spinner';
import { v4 as uuid } from 'uuid';

export default function Translations() {
  const [state, setState] = useContextState();
  const router = useRouter();
  const { id } = router.query;
  const { language } = state;
  const wolof = language ? wolof : 'Baobab';

  useEffect(() => {
    id &&
      getData().then((languageArray) => {
        if (languageArray) {
          setState((prevState) => ({
            ...prevState,
            language: languageArray[id - 1],
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
  }, [id, setState]);

  const cardList = [];

  language &&
    Object.keys(language).forEach(function (lang) {
      const translation = language[lang];
      cardList.push(<Card key={uuid()} card={translation} prefix={lang} />);
    });

  return (
    <Fragment>
      <Layout pageTitle={wolof} seoTitle={wolof}>
        <div className='mt-10'>
          <h4 className='mb-6 text-3xl font-bold dark:text-gray-50'>
            Translation
          </h4>
          {language ? cardList : <Spinner />}
        </div>
      </Layout>
    </Fragment>
  );
}
