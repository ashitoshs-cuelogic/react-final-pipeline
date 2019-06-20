import React, { Component } from "react";
import RouterComponent from "./UI/Router/Router";
// import MenuBar from "./UI/Menu/MenuBar";
import Spinner from "./UI/Spinner";
import logo from "./assets/logo.png";

import "./App.css";
import "./bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  // need to remove this
  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    var AppPage = (
      <div className="App">
        <div className="header-div">
          <img src={logo} alt="Home" className="img-logo" />
          <h2 className="h2-title">
            <strong>This is my first My App my app</strong>
          </h2>
        </div>

        {/* <MenuBar /> */}
        <br />
        <RouterComponent />
      </div>
    );

    if (this.state.loading) {
      AppPage = <Spinner />;
    }

    return AppPage;
  }
}

export default App;
