import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: 25,
      break: 5,
      timer: 25 * 60,
      start: false,
      status: true,
      timerLabel: "Session"
    }
    this.startStop = this.startStop.bind(this);
    this.reset = this.reset.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.timer = this.timer.bind(this);
    this.audio = React.createRef();
  }
  
  incrementSession () {
    if(this.state.session < 60) {
    this.setState({session: this.state.session + 1, timer: this.state.timer + 60})
    }
  }
  
  decrementSession () {
    if(this.state.session > 1) {
    this.setState({session: this.state.session - 1, timer: this.state.timer - 60})
    }
  }
  
  incrementBreak () {
    if(this.state.break < 60) {
    this.setState({break: this.state.break + 1, breakTimer: this.state.breakTimer + 60})
    }
  }
  
  decrementBreak () {
    if(this.state.break > 1) {
    this.setState({break: this.state.break - 1, breakTimer: this.state.breakTimer - 60})
    }
  }
  
  startStop () {
    if(this.state.start === false) {
      clearInterval(this.interval);
     this.interval = setInterval(() => { this.timer();
     }, 1000)
     this.setState({timer: this.state.timer, start: true});
    }
    else if(this.state.start === true) {
      clearInterval(this.interval);
      this.setState({timer: this.state.timer, start: false})
    }}
  
  timer () {
    if(this.state.timer > 0) {
      this.setState(prevState => ({timer: prevState.timer - 1}))
    }
    else if(this.state.timer === 0 && this.state.status === false) {
      this.setState({timer: this.state.session * 60});
      this.audio.current.play();
      this.setState({status: true, timerLabel: "Session"});
    }
    else if(this.state.timer === 0 && this.state.status === true) {
      this.setState({timer: this.state.break * 60});
      this.audio.current.play();
      this.setState({status: false, timerLabel: "Break"});
    }
  }
  
  reset () {
    this.setState({timer: 25 * 60, session: 25 , break: 5, status: true, start: false, timerLabel: "Session" });
    this.audio.current.pause();
    this.audio.current.currentTime = 0;
    clearInterval(this.interval);
  }
  
  render () {
     function minAndSec(sec) {
      var minutes = Math.floor(sec / 60);
      var seconds = (sec % 60).toFixed(0);
      return (( minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }   
    return (
      <div id="container">
        <h1 id="title">Pomodoro Timer</h1>
        <div id="timer-label-container">
          <p id="timer-label">{this.state.timerLabel}</p>
          <p id="time-left">{minAndSec(this.state.timer)}</p>
          <div id="timer-buttons">
          <button class="button" id="start_stop" onClick={this.startStop}>Start/Stop</button>
          <button class="button" id="reset" onClick={this.reset}>Reset</button>
          </div>
        </div>
        <div id="session-label">
          <p id="session-title">Session Length</p>
          <p id="session-length">{this.state.session}</p>
          <div id="session-buttons">
          <button class="button" id="session-increment" onClick={this.incrementSession}>+</button>
          <button class="button" id="session-decrement" onClick={this.decrementSession}>-</button>
          </div>
        </div>
        <div id="break-label">
          <p id="break-title">Break Length</p>
          <p id="break-length">{this.state.break}</p>
          <div id="break-buttons">
          <button class="button" id="break-increment" onClick={this.incrementBreak}>+</button>
          <button class="button" id="break-decrement" onClick={this.decrementBreak}>-</button>
          </div>
          <audio id="beep" ref={this.audio} src="https://sampleswap.org/samples-ghost/MELODIC%20LOOPS/SYNTH%20AND%20ELECTRONIC%20LOOPS/1382[kb]180_watch-beep-acid-melody.wav.mp3"></audio>
        </div>
      </div>
    )
  }
}

export default App;
