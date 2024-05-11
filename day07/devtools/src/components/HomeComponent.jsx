import {
  PureComponent
} from 'react';

import {
  FETCH_HOME_DATA
} from '../store/home/actionTypes';

import {
  createFetchHomeData
} from '../store/home/actions';



import { connect } from 'react-redux';



class HomeComponent extends PureComponent {

  componentDidMount() {
    this.props.fetchHomeData(FETCH_HOME_DATA);
  }

  render() {
    const { homeBanners, homeAsides } = this.props;
    return (
      <div className="home-contianer">
        <div className='banners-container'>
          <div className="title">banners:</div>
          <div className='banners'>
            {
              homeBanners.map(banner => (
                <div className='list' key={banner.id}>
                  {banner.name}
                </div>
              ))
            }
          </div>
        </div>
        <div className='asides-container'>
          {
            homeAsides.map(aside => (
              <div className='list' key={aside.id}>
                {
                  aside.name
                }
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
    homeBanners: state.home.homeBanners,
    homeAsides: state.home.homeAsides
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    fetchHomeData(type) {
      dispatch(createFetchHomeData(type));
    }
  }
}

export default connect(mapStatesToProps, mapActionsToProps)(HomeComponent);