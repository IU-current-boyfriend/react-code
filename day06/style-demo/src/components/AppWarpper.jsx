import { PureComponent } from "react"
import { AppWrapperStyle, HomeWrapperStyle, HomeButtonWrapperStyle } from "./AppWarpperStyle"
import { ThemeProvider } from "styled-components";


export default class AppWarpper extends PureComponent {
  state = {
    titleColor: 'purple'
  }

  setTitleColor() {
    this.setState({
      titleColor: 'red'
    });
  }

  render() {
    // const { titleColor } = this.state;
    return (
      // <AppWrapperStyle titlecolor={titleColor}>
      <ThemeProvider theme={{ color: 'blue' }}>
        {/* <HomeWrapperStyle>
          <div className="header">
            <div className="title">header-title</div>
            <button onClick={this.setTitleColor.bind(this)}>SET TITLECOLOR</button>
          </div>
        </HomeWrapperStyle> */}
        <HomeButtonWrapperStyle>
          <div className="header">
            <div className="title">header-title</div>
            <button onClick={this.setTitleColor.bind(this)}>SET TITLECOLOR</button>
          </div>
        </HomeButtonWrapperStyle>
      </ThemeProvider>
      // </AppWrapperStyle>
    )
  }
}