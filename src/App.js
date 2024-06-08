import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: 'Guest', 
      weight: 90, 
      height: 180, 
      bmi: 27, 
      message: '', 
      optimalweight: '', 
      time: new Date().toLocaleTimeString(),
      showWelcomePage: true // State to control the display of the welcome page
    };
    this.submitMe = this.submitMe.bind(this);
    this.heightchange = this.heightchange.bind(this);
    this.weightchange = this.weightchange.bind(this);
    this.change = this.change.bind(this);
    this.ticker = this.ticker.bind(this);
    this.blur = this.blur.bind(this);
    this.calculateBMI = this.calculateBMI.bind(this);
    this.startApp = this.startApp.bind(this); // Bind the new method
  }

  heightchange(e) {
    this.setState({ height: e.target.value });
    e.preventDefault();
  }

  blur(e) {
    this.calculateBMI();
  }

  weightchange(e) {
    this.setState({ weight: e.target.value });
    e.preventDefault();
  }

  calculateBMI() {
    var heightSquared = (this.state.height / 100) * (this.state.height / 100);
    var bmi = this.state.weight / heightSquared;
    var low = Math.round(18.5 * heightSquared);
    var high = Math.round(24.99 * heightSquared);
    var message = "";
    if (bmi >= 18.5 && bmi <= 24.99) {
      message = "You are in a healthy weight range";
    } else if (bmi >= 25 && bmi <= 29.9) {
      message = "You are overweight";
    } else if (bmi >= 30) {
      message = "You are obese";
    } else if (bmi < 18.5) {
      message = "You are underweight";
    }
    this.setState({ message: message });
    this.setState({ optimalweight: "Your suggested weight range is between " + low + " - " + high });
    this.setState({ bmi: Math.round(bmi * 100) / 100 });
  }

  submitMe(e) {
    e.preventDefault();
    this.calculateBMI();
  }

  ticker() {
    this.setState({ time: new Date().toLocaleTimeString() });
  }

  componentDidMount() {
    setInterval(this.ticker, 60000);
  }

  change(e) {
    e.preventDefault();
    console.log(e.target);
    this.setState({ name: e.target.value });
  }

  startApp() {
    this.setState({ showWelcomePage: false });
  }

  render() {
    if (this.state.showWelcomePage) {
      return (
        <div className="WelcomePage">
          <h1>Welcome to the BMI Calculator</h1>
          <p>This application helps you calculate your Body Mass Index (BMI) and provides recommendations for a healthy weight range.</p>
          <div className="Carousel">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <button onClick={this.startApp}>Get Started</button>
          <div className="Waves"></div>
        </div>
      );
    }
    return (
      <div className="App">
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="App-header">
          <h2>BMI Calculator</h2>
        </div>
        <form onSubmit={this.submitMe} className="animatedForm">
          <label>
            Please enter your name
          </label>
          <input type="text" name="name" value={this.state.name} onBlur={this.blur} onChange={this.change} />
          <label>
            Enter your height in cm:
          </label>
          <input type="text" name="height" value={this.state.height} onBlur={this.blur} onChange={this.heightchange} />
          <label>
            Enter your weight in kg :
          </label>
          <input type="text" name="weight" value={this.state.weight} onChange={this.weightchange} />
          <label>
            Hello {this.state.name}, It's currently {this.state.time}. Your BMI is {this.state.bmi}.
          </label>
          <label>{this.state.message}</label>
          <label>{this.state.optimalweight}</label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
