import { PureComponent } from "react";
import { connect } from 'react-redux';
import { fetchHomeAction } from "../store/home";


class HomeComponent extends PureComponent {

  componentDidMount() {
    this.props.fetchHomeData();
  }

  render() {
    const { banners, comments } = this.props;
    return (

      <div className="home-component-container">
        <div className="banners-container">
          <div className="title">Banners List:</div>
          {
            banners.map(banner => (
              <div className="banners" key={banner.id}>
                {banner.name}
              </div>
            ))
          }
        </div>
        <div className="comments-container">
          <div className="title">Comments List:</div>
          {
            comments.map(comment => (
              <div className="comments" key={comment.id}>
                {comment.name}
              </div>
            ))
          }
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
    fetchHomeData() {
      dispatch(fetchHomeAction({ name: '聪' }));
    }
  }
}

export default connect(mapStatesToProps, mapActionsToProps)(HomeComponent);