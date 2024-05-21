import { PureComponent } from 'react';
import HomeComponent from './components/HomeComponent';
import CalCultorComponent from './components/CalCultorComponent';
export default class App extends PureComponent {
  render() {
    return (
      <div className="app-container">
        <HomeComponent />
        <CalCultorComponent />
      </div>
    );
  }
}