import './slide-show.scss';

import React from 'react';
import PropTypes from 'prop-types';

import previousImage from 'Images/components/slider-previous.png';
import nextImage from 'Images/components/slider-next.png';

const propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      imageUrl: PropTypes.string,
      linkUrl: PropTypes.string,
      isExternalLink: PropTypes.bool
    })
  )
};

class SlideShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {currentIndex: 0};
  }

  componentDidMount() {
    this.startSliderTimer();
  }

  componentWillUnmount() {
    this.clearSliderTimer();
  }

  clearSliderTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  startSliderTimer() {
    this.timerId = setInterval(() => {
      this.setState({
        currentIndex: this.state.currentIndex < this.props.slides.length - 1 ? this.state.currentIndex + 1 : 0
      });
    }, 4000);
  }

  resetSlider() {
    this.clearSliderTimer();
    this.startSliderTimer();
  }

  handleOnNextSlideClick() {
    this.setState({
      currentIndex: this.state.currentIndex < this.props.slides.length - 1 ? this.state.currentIndex + 1 : 0
    });
    this.resetSlider();
  }

  handleOnPreviousSlideClick() {
    this.setState({
      currentIndex: this.state.currentIndex > 0 ? this.state.currentIndex - 1 : this.props.slides.length - 1
    });
  }

  renderPreviousButton() {
    if (this.props.slides.length > 1) {
      return (
        <>
          <button type="button" className="previous-slide" onClick={() => this.handleOnPreviousSlideClick()}>
            <img src={previousImage} alt="" />
          </button>
        </>
      );
    } else return null;
  }

  renderNextButton() {
    if (this.props.slides.length > 1) {
      return (
        <>
          <button type="button" className="next-slide" onClick={() => this.handleOnNextSlideClick()}>
            <img src={nextImage} alt="" />
          </button>
        </>
      );
    } else return null;
  }

  renderSlides() {
    if (this.props.slides.length > 0) {
      return (this.props.slides.map((slide, index) => {
        const tabIndexProp = index !== this.state.currentIndex ? {tabIndex: -1} : {};
        const anchorProps = slide.isExternalLink ? null : {
          target: 'blank',
          rel: 'noopener noreferrer'
        };

        return (
          <a key={slide.imageUrl}
            title={slide.label}
            className={index === this.state.currentIndex ? "slide displayed" : "slide"}
            href={slide.linkUrl}
            {...anchorProps}
            {...tabIndexProp}
          >
            <img src={slide.imageUrl} alt="" />
          </a>
        );
      }));
    } else return null;
  }

  render() {
    return (
      <div className="slider">
        <div className="wrapper">
          <div>
            {this.renderPreviousButton()}
            {this.renderSlides()}
            {this.renderNextButton()}
          </div>
        </div>
      </div>
    );
  }
}

SlideShow.propTypes = propTypes;

export default SlideShow;
