import './articles.scss';

import React from 'react';
import PropTypes from 'prop-types';

import ArticleListItem from './ArticleListItem';

const propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
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
  ),
  articlesCount: PropTypes.number,
  loading: PropTypes.bool,
  onMoreNewsClick: PropTypes.func
};

const ArticleList = ({articles, articlesCount, loading, onMoreNewsClick}) => {
  const renderShowMore = () => {
    if (articles.length < articlesCount) {
      const className = loading ? 'show-more loading' : 'show-more';
      return (<button className={className}
        type="button"
        onClick={onMoreNewsClick}>
          Show More
      </button>);
    } else return null;
  };

  return (
    <div className="box p-re">
      {articles.map((article) => <ArticleListItem key={article.id} article={article} />)}
      {renderShowMore()}
    </div>
  );
};

ArticleList.propTypes = propTypes;

export default ArticleList;

/*
<asp:UpdateProgress ID="UpdateProgress1" runat="server" AssociatedUpdatePanelID="panelContent">
<ProgressTemplate>
<div class="ProgressBar">
<img class="ProgressImage" src="/Images/Loading.gif" />
</div>
</ProgressTemplate>
</asp:UpdateProgress>

<footer>
<a runat="server" id="btnMoreRows" class="MoreRows ExtraLargeTopMargin">More News</a>
</footer>
</ContentTemplate>
</asp:UpdatePanel>
</div>
</div>
*/
