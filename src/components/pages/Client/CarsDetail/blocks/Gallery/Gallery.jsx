import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Carousel, { Modal, ModalGateway } from 'react-images';

import _get from 'lodash/get';
import _debounce from 'lodash/debounce';

import { withLayoutContext } from '../../../../../../utilities/layoutContext';

import styles from './Gallery.module.scss';

const WIDE_DESKTOP_IMAGE_WIDTH = 500;
const DESKTOP_IMAGE_WIDTH = 400;
const TABLET_IMAGE_WIDTH = 300;

class Gallery extends PureComponent {
  static propsTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number,
        src: PropTypes.string,
      })
    ),
  };

  static defaultProps = {
    images: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      wrapperWidth: '100%',
      currentImage: 0,
      fullScreenImage: 0,
      nextTrigger: 2,
      imageWidth: (() => {
        switch (true) {
          case props.viewportWidth > 1299: {
            return WIDE_DESKTOP_IMAGE_WIDTH;
          }
          case props.viewportWidth > 999 && props.viewportWidth < 1300: {
            return DESKTOP_IMAGE_WIDTH;
          }
          default: {
            return TABLET_IMAGE_WIDTH;
          }
        }
      })(),
    };

    this.carouselRef = React.createRef();
    this.galleryRef = React.createRef();
    this.debouncedResizeHandler = _debounce(this.handleResize, 300);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.debouncedResizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedResizeHandler);
  }

  handleResize = () => {
    const { viewportWidth, layout } = this.props;
    const gallery = this.galleryRef.current;
    if (window === undefined || !gallery || layout.isMobile) {
      return;
    }

    const { wrapperWidth: currentWrapperWidth, imageWidth } = this.state;

    const galleryRect = gallery.getBoundingClientRect();
    const wrapperWidth = viewportWidth - galleryRect.left;

    if (wrapperWidth !== currentWrapperWidth) {
      this.setState({ wrapperWidth });
    }

    if (viewportWidth > 1299 && imageWidth !== WIDE_DESKTOP_IMAGE_WIDTH) {
      this.setState({ imageWidth: WIDE_DESKTOP_IMAGE_WIDTH });
    }
    if (viewportWidth > 999 && viewportWidth < 1300 && imageWidth !== DESKTOP_IMAGE_WIDTH) {
      this.setState({ imageWidth: DESKTOP_IMAGE_WIDTH });
    }
    if (!layout.isMobile && viewportWidth < 1000 && imageWidth !== TABLET_IMAGE_WIDTH) {
      this.setState({ imageWidth: TABLET_IMAGE_WIDTH });
    }
  };

  handleOpenFullScreen = (event, index) => {
    event.preventDefault();

    const { layout } = this.props;
    let currentIndex = index;

    if (layout.isMobile) {
     const carouselRef = this.carouselRef.current;

     const navNode = _get(carouselRef, 'container.childNodes[0].childNodes[1]');
     if (navNode && navNode.contains(event.target)) {
       return;
     }

     currentIndex = carouselRef.state.currentIndex;
    }

    this.setState({
      fullScreenOpen: true,
      fullScreenImage: currentIndex,
    });
  };

  handleCloseFullScreen = () => this.setState({ fullScreenOpen: false });

  handleImageClick = index => (event) => {
    const { currentImage, nextTrigger } = this.state;
    const { images } = this.props;

    if (currentImage + nextTrigger === index) {
      this.setState({ currentImage: currentImage + 1 });
      return;
    }

    if (!index && currentImage + nextTrigger === images.length) {
      this.setState({ currentImage: index });
      return;
    }

    this.handleOpenFullScreen(event, index);
  };

  renderMobileCarousel() {
    const { images } = this.props;

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div className={styles.mobileWrapper} onClick={this.handleOpenFullScreen}>
        <Carousel
          ref={this.carouselRef}
          currentIndex={0}
          styles={{
            footer: () => ({
              display: 'none',
            }),
          }}
          views={images}
          frameProps={{ autoSize: 'height' }}
        />
      </div>
    );
  }

  renderDesktopCarousel() {
    const { images } = this.props;
    const { wrapperWidth, currentImage, nextTrigger, imageWidth } = this.state;
    const imageCount = images.length;
    const widthFactor = imageCount > nextTrigger ? imageCount + 1 : imageCount;

    return (
      <div
        className={styles.wrapper}
        style={{
          width: wrapperWidth,
        }}
      >
        <div
          className={styles.track}
          style={{
            width: widthFactor * (imageWidth + 20) - 20,
            transform: `translate3d(${-(imageWidth + 20) * currentImage}px, 0px, 0px)`,
          }}
        >
          {images.map((image, index) => {
            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <div key={image.index} className={styles.item} onClick={this.handleImageClick(index)}>
                <img className={styles.image} src={image.src} alt="" />
              </div>
            );
          })}
          {widthFactor > nextTrigger && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div key={images.length} className={styles.item} onClick={this.handleImageClick(0)}>
              <img className={styles.image} src={images[0].src} alt="" />
            </div>
          )}
        </div>
      </div>
    );
  }

  render() {
    const { images, layout } = this.props;
    const { fullScreenOpen, fullScreenImage } = this.state;

    return (
      <div className={styles.Gallery} ref={this.galleryRef}>
        {layout.isMobile ? this.renderMobileCarousel() : this.renderDesktopCarousel()}
        <ModalGateway>
          {fullScreenOpen ? (
            <Modal
              closeOnBackdropClick={false}
              onClose={this.handleCloseFullScreen}
              styles={{
                blanket: StyleObj => ({ ...StyleObj, zIndex: 5, touchAction: 'none' }),
                positioner: StyleObj => ({ ...StyleObj, zIndex: 5, touchAction: 'none' }),
              }}
            >
              <Carousel
                currentIndex={fullScreenImage}
                views={images}
                frameProps={{ autoSize: 'height' }}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }
}

export default withLayoutContext(Gallery);
