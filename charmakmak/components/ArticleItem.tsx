import Link from 'next/link';
import articleStyles from '../styles/Article.module.css';

type ArticleItemProps = {
  article?: any;
};

const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <Link legacyBehavior href={`/article/${article.id}`}>
      <a className={articleStyles.card}>
        <h3>{article.title} &rarr;</h3>
        <p>{article.body}</p>
      </a>
    </Link>
  );
};

export default ArticleItem;
