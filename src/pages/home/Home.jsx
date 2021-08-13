/* eslint-disable max-len */
import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Helmet} from 'react-helmet-async';

import {serverPage} from 'Shell/hoc/server-page';

import ArticleList from 'Source/components/articles/ArticleList';
import SubscribeBox from 'Source/components/sidebars/newsletter/SubscribeBox';

import PromotionService from 'Services/promotion-service';
import ArticlesService from 'Services/articles-services';

import goblinStoneSocialMediaBanner from 'Images/social/goblin-stone-banner.jpg';

import SlideShow from './slide-show/SlideShow';
import FollowUsBox from 'Source/components/sidebars/facebook/FollowUsBox';
import FeaturedProduct from 'Source/components/sidebars/featured-product/FeaturedProduct';
import { formatPublicUrl } from 'Source/utils/url-format';

const propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      linkUrl: PropTypes.string,
      isExternalLink: PropTypes.bool,
      imageHash: PropTypes.string
    })
  ),
  news: PropTypes.arrayOf(
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
  newsCount: PropTypes.number
};

const defaultProps = {
  slides: [],
  news: [],
  newsCount: 0
};

const Home = (props) => {
  const [state, setState] = useState({news: props.news, currentPage: 1, loading: false});
  const {slides, newsCount} = props;
  let {news, currentPage, loading} = state;

  const handleMoreNewsClick = async () => {
    // Exist without loading more rows while fetching new rows
    if (loading) {
      return;
    }

    setState({...state, loading: true});
    currentPage++;
    const moreNews = await ArticlesService.getNews(currentPage);
    news = news.concat(moreNews);
    setState({news, currentPage, loading: false});
  };

  const formattedSlides = slides.map(slide => {
    const imageUrl = formatPublicUrl(`/api/promotion/slides/${slide.id}/image/${slide.imageHash}`);

    return {
      label: slide.label,
      imageUrl,
      linkUrl: slide.linkUrl,
      isExternalLink: slide.isExternalLink
    };
  });

  return (
    <>
      <Helmet>
        <title>{process.env.BUILD_APP_NAME} - Home</title>
        <meta property="fb:app_id" content="1463459677279071" />
        <meta property="og:title" content="Goblin Stone" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.goblinstone.com" />
        <meta property="og:image" content={goblinStoneSocialMediaBanner} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta property="og:description" content="Goblin Stone is a community project that aims to bring D&D fans and professionals together, to make quality 5th edition adventures and supplements." />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@BenoitBernardy" />
        <meta name="twitter:title" content="Goblin Stone" />
        <meta name="twitter:text:description" content="Goblin Stone is a community project that aims to bring D&D fans and professionals together, to make quality 5th edition adventures and supplements." />
        <meta name="twitter:image" content={goblinStoneSocialMediaBanner} />
      </Helmet>

      <div className="flex-container">
        <div className="flex-grow">
          <SlideShow slides={formattedSlides} />
          <div>
            <ArticleList articles={news} articlesCount={newsCount} loading={loading} onMoreNewsClick={handleMoreNewsClick} />
          </div>
        </div>

        <aside className="right-aside for-lg">
          <div className="m-b-re">
            <SubscribeBox />
          </div>
          <div className="m-b-re">
            <FollowUsBox />
          </div>
          <FeaturedProduct />
        </aside>
      </div>
    </>
  );
};

Home.defaultProps = defaultProps;
Home.propTypes = propTypes;

Home.getInitialState = async (/*routeParameters, queryParameters*/) => {
  const slideTask = PromotionService.getSlideShow();
  const newsTask = ArticlesService.getNews(1);
  const newsCountTask = ArticlesService.getNewsCount();

  const result = await Promise.all([slideTask, newsTask, newsCountTask]);

  return {slides: result[0], news: result[1], newsCount: result[2]};
};

export default serverPage(Home);
