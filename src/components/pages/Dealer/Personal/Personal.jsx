import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import * as dealerInfoActions from "../../../../redux/modules/dealer/info/actions";

function PersonalPage(props) {
  const { dispatch } = props;

  useEffect(() => {
    dispatch(dealerInfoActions.getInfo());
  }, [dispatch]);

  return <div>Personal</div>;
}

const mapStateToProps = (state) => {
  return {
    info: state.dealer.info,
  };
};

export default connect(mapStateToProps)(PersonalPage);
