import { server } from '../config/index';
import ArticleList from '../components/ArticleList';

type HomeProps = {
  articles: any;
};

const Home = ({ articles }: HomeProps) => {
  console.log('articles', articles);
  return (
    <div>
      <ArticleList articles={articles}></ArticleList>
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/projects/`);

  console.log('the res', res);

  const articles: string[] = [];

  return {
    props: {
      articles,
    },
  };
};

// export const getStaticProps = async () => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts?_limit=6`
//   );
//   const articles = await res.json();

//   return {
//     props: {
//       articles,
//     },
//   };
// };

export default Home;
