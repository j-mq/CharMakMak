import React from 'react';
import articleStyles from '../styles/Article.module.css';

type ArticleListProps = {
  articles?: any;
};

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <div className={articleStyles.grid}>
      {articles.map((article: any) => (
        <div key={article.id}>
          <h3>{article.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
