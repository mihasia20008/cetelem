import { createBrowserHistory } from 'history';
import qhistory from 'qhistory';
import { stringify, parse } from 'qs';

export const basename = '';

const historyParams = {
  basename,
};

function createHistory(params) {
  const scrollTo = (x, y) => setTimeout(window.scrollTo(x, y), 0);
  const history = createBrowserHistory(params);

  history.listen((location, action) => {
    if (action === 'POP') {
      return;
    }
    if (location.state && location.state.ignoreScroll) {
      return;
    }
    scrollTo(0, 0);
  });

  return history;
}

export default qhistory(createHistory(historyParams), stringify, parse);
