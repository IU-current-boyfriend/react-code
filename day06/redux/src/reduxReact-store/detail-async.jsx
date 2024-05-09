import { PureComponent } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import {
  COMMENTS_ACTION,
  BANNERS_ACTION
} from './actionType';
import {
  createBannersAction,
  createCommentsAction
} from './createActions';

class DetailAsync extends PureComponent {

  componentDidMount() {
    axios.get('http://localhost:3000/get_list').then(res => {
      const { comments, banners } = res.data.data;
      // setTimeout(() => {
      this.props.getBannersAction(BANNERS_ACTION, comments);
      this.props.getCommentsAction(COMMENTS_ACTION, banners);
      // }, 2000);
    })
  }

  render() {
    const { banners, comments } = this.props;
    return (
      <div className="detail-async-container">
        <div className="banners-container">
          <h2>banners list: </h2>
          <ul className="banners-lists">
            {banners.length > 0 ? banners.map(banner => (
              <li key={banner.id}>
                {banner.name}
              </li>
            )) : <span>暂无数据</span>}
          </ul>
        </div>
        <div className="comments-container">
          <h2>comments list: </h2>
          <ul className="comments-lists">
            {
              comments.length > 0 ? comments.map(comment => (
                <li key={comment.id}>
                  {comment.name}
                </li>
              )) : <span>暂无数据</span>
            }
          </ul>
        </div>
      </div>
    );
  }
}


const mapStatesToProps = (state) => {
  return {
    banners: state.banners,
    comments: state.comments
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    getBannersAction(type, banners) {
      dispatch(createBannersAction({
        type,
        pyload: banners
      }));
    },
    getCommentsAction(type, comments) {
      dispatch(createCommentsAction({
        type,
        pyload: comments
      }));
    }
  }
}

export default connect(mapStatesToProps, mapActionsToProps)(DetailAsync);