import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Resume from './Components/Resume';
import Portfolio from './Components/Portfolio';
import resumeData from './resumeData.json'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };
        console.log(
          "Thanks for visiting my site. This website is hosted completely on IPFS. Learn more about it here https://ipfs.io. Check out my Github https://github.com/Lucas-Kohorst maybe we could build something cool together."
        );
    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

  }

  componentWillMount() {
    
  }

  componentDidMount(){
    this.setState({ resumeData: resumeData });
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main}/>
        <Resume data={this.state.resumeData.resume}/>
        <Portfolio data={this.state.resumeData.portfolio}/>
        <Footer data={this.state.resumeData.main}/>
      </div>
    );
  }
}

export default App;
