import { Fragment, useEffect } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import useContextState from '../../context/UseStateContext';
import { useRouter } from 'next/router';
import getData from '../../utils/getData';
import { Spinner } from '../../components/Spinner';

export default function Translations() {
  const [state, setState] = useContextState();
  const router = useRouter();
  const { id } = router.query;
  const { language } = state;
  const wolof = language ? wolof : 'Baobab';

  useEffect(() => {
    id &&
      getData().then((languageArray) => {
        setState((prevState) => ({
          ...prevState,
          language: languageArray[id],
        }));
      });
  }, [id]);

  const cardList = [];

  language &&
    Object.keys(language).forEach(function (lang) {
      const translation = language[lang];
      cardList.push(
        <Card key={translation} card={translation} prefix={lang} />
      );
    });

  return (
    <Fragment>
      <Layout pageTitle={wolof} seoTitle={wolof}>
        <div className='mt-10'>
          <h4 className='mb-6 text-3xl font-bold'>Translation</h4>
          {language ? cardList : <Spinner />}
        </div>
      </Layout>
    </Fragment>
  );
}
