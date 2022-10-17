import Head from 'next/head';
import ArticleList from '../components/ArticleList';

type HomeProps = {
  articles: any;
};

const Home = ({ articles }: HomeProps) => {
  console.log('articles', articles);
  return (
    <div>
      <Head>
        <title>Character Maker Maker</title>
        <meta name='keywords' content='art web3 nft character_maker' />
      </Head>
      <ArticleList articles={articles}></ArticleList>
    </div>
  );
};

//TODO: 37:00

export const getStaticProps = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=6`
  );
  const articles = await res.json();

  return {
    props: {
      articles,
    },
  };
};

export default Home;
