import React, { useCallback, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import warning from 'warning';
import _debounce from 'lodash/debounce';
import { mobile, tablet, desktop, touchDevice } from 'is_js';

export const deviceInfo = {
  isMobile: mobile(),
  isTablet: tablet(),
  isDesktop: desktop(),
  isTouchDevice: !desktop() && touchDevice(),
};

export const LAYOUTS = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
  DESKTOP_WIDE: 'desktopWide',
};

// shared consts styles @media mixins, don't forget to sync changes
export const MIN_MOBILE_SCREEN = 320;
export const MIN_TABLET_SCREEN = 768;
export const MIN_DESKTOP_SCREEN = 1200;
export const MIN_DESKTOP_WIDE_SCREEN = 1440;

export const BREAKPOINTS = {
  [LAYOUTS.MOBILE]: { MIN: MIN_MOBILE_SCREEN, MAX: MIN_TABLET_SCREEN - 1 },
  [LAYOUTS.TABLET]: { MIN: MIN_TABLET_SCREEN, MAX: MIN_DESKTOP_SCREEN - 1 },
  [LAYOUTS.DESKTOP]: { MIN: MIN_DESKTOP_SCREEN, MAX: MIN_DESKTOP_WIDE_SCREEN - 1 },
  [LAYOUTS.DESKTOP_WIDE]: { MIN: MIN_DESKTOP_WIDE_SCREEN },
};

const RESIZE_DEBOUNCE_DELAY_MS = 100;

// same breakpoints for width and height, as they are interchangeable in landscape/portrait mode
export const determineDeviceByClientSize = dimension => {
  if (dimension <= BREAKPOINTS[LAYOUTS.MOBILE].MAX) {
    return LAYOUTS.MOBILE;
  }
  if (dimension <= BREAKPOINTS[LAYOUTS.TABLET].MAX) {
    return LAYOUTS.TABLET;
  }
  if (dimension <= BREAKPOINTS[LAYOUTS.DESKTOP].MAX) {
    return LAYOUTS.DESKTOP;
  }
  return LAYOUTS.DESKTOP_WIDE;
};

const {
  isMobile: isMobileDevice,
  isTablet: isTabletDevice,
  isDesktop: isDesktopDevice,
  isTouchDevice,
} = deviceInfo;

const measureWindowViewport = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  // https://www.quirksmode.org/mobile/viewports2.html -- in article mentioned that
  // clientWidth/Height provide same values, that applied to calc @media queries constraints
  const {
    clientHeight: viewportHeight,
    clientWidth: viewportWidth,
  } = window.document.documentElement;

  return {
    viewportWidth,
    viewportHeight,
  };
};

export const determineLayoutContext = (
  { viewportWidth, viewportHeight } = measureWindowViewport()
) => {
  if (!viewportWidth && !viewportHeight) {
    return {
      viewportWidth: 0,
      viewportHeight: 0,

      // fallback for ssr, consider desktop as default device to avoid ambiguity
      isDesktopLayout: true,
      isDesktopDevice: true,
    };
  }

  const deviceByWidth = determineDeviceByClientSize(viewportWidth);
  const isMobileLayout = deviceByWidth === LAYOUTS.MOBILE;
  const isTabletLayout = deviceByWidth === LAYOUTS.TABLET;
  const isDesktopLayout = !isMobileLayout && !isTabletLayout;
  const isDesktopWideLayout = deviceByWidth === LAYOUTS.DESKTOP_WIDE;

  return {
    viewportWidth,
    viewportHeight,

    layout: {
      isMobile: isMobileLayout,
      isTablet: isTabletLayout,
      isDesktop: isDesktopLayout,
      isDesktopWide: isDesktopWideLayout,
    },

    device: {
      isMobile: isMobileDevice,
      isTablet: isTabletDevice,
      isDesktop: isDesktopDevice,
      isTouch: isTouchDevice,
    }
  };
};

// default context will only be used if LayoutContextProvider is missing in components tree
export const LayoutContext = React.createContext({
  ...determineLayoutContext(),
  hasNoProvider: true,
});

export function LayoutContextProvider({ children }) {
  const [layoutContext, setLayoutContext] = useState(() => determineLayoutContext());

  const handleWindowSizeChange = useCallback(
    _debounce(() => {
      setLayoutContext(determineLayoutContext());
    }, RESIZE_DEBOUNCE_DELAY_MS),
    []
  );

  useEffect(
    () => {
      if (typeof window === 'undefined') {
        return; // bail out for ssr
      }
      window.addEventListener('resize', handleWindowSizeChange);
      // useEffect accept but not require return function
      // eslint-disable-next-line consistent-return
      return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
      };
    },
    [handleWindowSizeChange]
  );

  return <LayoutContext.Provider value={layoutContext}>{children}</LayoutContext.Provider>;
}

LayoutContextProvider.propTypes = {
  children: PropTypes.node,
};

LayoutContextProvider.defaultProps = {
  children: '',
};

let wasWarnedAboutProvider = false;
const sanityCheck = layoutState => {
  const { hasNoProvider } = layoutState;
  if (hasNoProvider && !wasWarnedAboutProvider) {
    warning(
      false,
      'Missing LayoutContextProvider in rendered components hierarchy. ' +
      'Currently layoutState will not update on resize events. ' +
      'To fix that, please add LayoutContextProvider as parent in component tree.' +
      'For example in App.jsx or Root.jsx: ' +
      'export default () => <LayoutContextProvider><AppRoutes /></LayoutContextProvider>'
    );
    wasWarnedAboutProvider = true;
  }
  return layoutState;
};

export const withLayoutContext = Component =>
  function LayoutContextWrapper(props) {
    return (
      <LayoutContext.Consumer>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {layoutState => <Component {...props} {...sanityCheck(layoutState)} />}
      </LayoutContext.Consumer>
    );
  };

export const useLayoutContext = () => sanityCheck(useContext(LayoutContext));
