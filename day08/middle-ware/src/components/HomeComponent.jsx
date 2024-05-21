import { PureComponent } from "react";
import { connect } from 'react-redux';
import { FETCHHOMEDATAACTION } from '../store/home/contants';
import { asyncCreateHomeAction } from '../store/home/createAction';

class HomeComponent extends PureComponent {

  componentDidMount() {
    this.props.fetchHomeDataAction();
  }

  render() {
    const { banners, comments } = this.props;
    return (
      <div className="home-component-container">
        <div className="banners-list">
          <h2 className="title">banners list container:</h2>
          <div className="banner-list">
            {
              banners && banners.map(banner => (
                <div className="list"
                  key={banner.id}>
                  {
                    banner.name
                  }
                </div>
              ))
            }
          </div>
        </div>
        <div className="comments-list">
          <h2 className="title">comments list container:</h2>
          <div className="comment-list">
            {
              comments && comments.map(comment => (
                <div className="list" key={comment.id}>
                  {
                    comment.name
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = (state) => {

  return {
    banners: state.home.banners,
    comments: state.home.comments
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    fetchHomeDataAction() {
      // dispatch(createHomeAction({
      //   type: FETCHHOMEDATAACTION
      // }));

      // 想打印某些日志信息

      dispatch(asyncCreateHomeAction({
        type: FETCHHOMEDATAACTION
      }))
    }
  }
}


export default connect(mapStatesToProps, mapActionsToProps)(HomeComponent);