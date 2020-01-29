import React, { useCallback, useState, useEffect, useRef } from 'react';
import cls from 'classnames';
import { Map, Placemark, YMaps } from 'react-yandex-maps';

import { useLayoutContext } from '../../../../../../utilities/layoutContext';
import useCloseOnOutsideEvents from '../../../../../../utilities/useCloseOnOutsideEvents';

import PinIcon from '../../../../../icons/PinIcon';
// import RatingIcon from '../../../../../icons/RatingIcon';

import styles from './DealerMap.module.scss';

const DealerMap = React.forwardRef((props, ref) => {
  const { name, address, /* rating, */ location, phone } = props;

  const dealerInfoRef = useRef(null);
  const {
    layout: { isMobile },
  } = useLayoutContext();
  const [dealerInfoVisible, toggleDealerInfoVisibility] = useState(!isMobile);
  const [bottomPos, setBottomPos] = useState(220);

  useEffect(() => {
    const handleResize = () => {
      if (isMobile && dealerInfoVisible) {
        toggleDealerInfoVisibility(false);
      }
      if (!isMobile && !dealerInfoVisible) {
        toggleDealerInfoVisibility(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile, dealerInfoVisible]);

  useCloseOnOutsideEvents({
    ref: dealerInfoRef,
    callback: useCallback(() => {
      if (isMobile) {
        toggleDealerInfoVisibility(false);
      }
    }, [isMobile, toggleDealerInfoVisibility]),
    isOpen: dealerInfoVisible,
  });

  const handleClickByPin = useCallback(() => {
    if (!isMobile) {
      return;
    }

    const container = ref.current;
    if (container) {
      setBottomPos(container.clientHeight / 2 + 60 || 220);
    }

    if (!dealerInfoVisible) {
      toggleDealerInfoVisibility(true);
    }
  }, [isMobile, ref, dealerInfoVisible]);

  const formatPhone = text => {
    try {
      const cleaned = text.toString().replace(/\D/g, '');
      const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
      return `${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    } catch (e) {
      return '';
    }
  };

  return (
    <div className={styles.DealerMap} ref={ref}>
      <YMaps>
        <Map
          width="100%"
          height="100%"
          defaultState={{
            center: [+location.x, +location.y],
            zoom: 14,
            behaviors: ['scrollZoom'],
          }}
        >
          <Placemark
            onClick={handleClickByPin}
            geometry={[+location.x, +location.y]}
            options={{
              iconLayout: 'default#image',
              iconImageHref: '/images/map-mark.svg',
              iconImageSize: [40, 50],
              iconImageOffset: [-20, -50],
            }}
          />
        </Map>
      </YMaps>
      <div
        ref={dealerInfoRef}
        style={{ bottom: bottomPos }}
        className={cls(styles.dealerInfo, dealerInfoVisible && styles.visible)}
      >
        <div className={styles.pinWrap}>
          <PinIcon />
        </div>
        <div className={styles.content}>
          <h3 className={styles.name}>{name}</h3>
          {/* <div className={styles.rating}> */}
          {/*  {Array.from(Array(5).keys()).map(index => ( */}
          {/*    <RatingIcon key={index} className={styles.ratingIcon} active={index < rating} /> */}
          {/*  ))} */}
          {/* </div> */}
          <p className={styles.address}>{address}</p>
          {phone && (
            <a href={`tel: ${phone}`} className={styles.phone}>
              {formatPhone(phone)}
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

export default DealerMap;
