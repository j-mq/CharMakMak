import React from 'react';
import articleStyles from '../styles/Article.module.css';
import ArticleItem from './ArticleItem';

type ArticleListProps = {
  articles?: any;
};

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <div className={articleStyles.grid}>
      {articles.map((article: any) => (
        <ArticleItem article={article} key={article.id}></ArticleItem>
      ))}
    </div>
  );
};

export default ArticleList;
