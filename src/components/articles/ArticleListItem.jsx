import './articles.scss';

import React from 'react';
import PropTypes from 'prop-types';

import {getLongDate} from 'Source/utils/date-format';
import { formatPublicUrl } from 'Source/utils/url-format';

const propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number,
    header: PropTypes.string,
    useDefaultSubHeader: PropTypes.bool,
    subHeader: PropTypes.string,
    summary: PropTypes.string,
    thumbnailHash: PropTypes.string,
    showReadMore: PropTypes.bool,
    readMoreUrl: PropTypes.string,
    isExternalLink: PropTypes.bool,
    publishedOn: PropTypes.string,
    publishedBy: PropTypes.string
  })
};

const ArticleListItem = ({article}) => {
  const publishedOn = getLongDate(new Date(article.publishedOn));
  const summary = {__html: article.summary};

  const anchorProps = {};
  if (article.showReadMore) {
    anchorProps.href = article.isExternalLink ? article.readMoreUrl : `/article/${article.id}`;
    if (article.isExternalLink) {
      anchorProps.target = '_blank';
      anchorProps.rel = 'noopener noreferrer';
    }
  }

  const renderImage = (article, anchorProps) => {
    if (article.thumbnailHash !== null) {
      const imageUrl = formatPublicUrl(`/api/articles/${article.id}/thumbnail/${article.thumbnailHash}`);
      return (<a className="article-body-image-block" {...anchorProps}>
        <img src={imageUrl} alt="" />
      </a>);
    } else {
      return null;
    }
  };

  const renderTags = () => {
    // TODO replace with real articles and add the href to search for news with a specific tag
    const tags = [{id: 1, name: "Best of D&D"}];

    return (
      <div className="flex-container align-items-center m-t-xl">
        <h3>Tags:</h3>
        {tags.map((tag) => (
          <a key={tag.id} className="button article-tag">
            {tag.name}
          </a>
        ))}
      </div>
    );
  };

  const renderReadMoreButton = (article, anchorProps) => {
    return article.showReadMore ? (
      <div className="m-t-xl">
        <a className="button article-read-more" {...anchorProps}>
          Read More
        </a>
      </div>) : null;
  };

  return (
    <div className="blog-article">
      <a className="block" {...anchorProps}>
        <h1>{article.header}</h1>
      </a>
      <div className="article-subtitle">
        {article.useDefaultSubHeader ?
          `Posted by ${article.publishedBy} on ${publishedOn}` :
          article.subHeader
        }
      </div>
      <div className="m-t-md article-summary">
        {renderImage(article, anchorProps)}
        <span className="article-summary" dangerouslySetInnerHTML={summary} />
        <div className={article.showReadMore ? 'clear-both article-gradient-transient' : 'clear-both'} />
        {renderTags()}
        {renderReadMoreButton(article, anchorProps)}
      </div>
    </div>
  );
};

ArticleListItem.propTypes = propTypes;

export default ArticleListItem;
