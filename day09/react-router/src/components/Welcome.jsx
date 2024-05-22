import { PureComponent } from 'react';

export default class Welcome extends PureComponent {
  constructor(props) {
    super(props);
    this.navList = [
      {
        id: 1,
        name: 'Home',
        url: 'http://localhost:5173/home'
      },
      {
        id: 2,
        name: 'About',
        url: 'http://localhost:5173/about'
      },
      {
        id: 3,
        name: 'Product',
        url: 'http://localhost:5173/product'
      },
    ]
  }
  render() {
    const { navList } = this;
    return (
      <div className="welcome-container">
        <div className="nav-container">
          {
            navList && navList.map(nav => (
              <span style={{ marginLeft: '10px' }} key={nav.id}>
                <a href={nav.url}>
                  {nav.name}
                </a>
              </span>
            ))
          }
        </div>
      </div>
    );
  }
}