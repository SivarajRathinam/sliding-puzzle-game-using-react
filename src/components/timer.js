const React = require('react')
const ms = require('pretty-ms')

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.timer = 0;
    this.state = {
      time:{},
      seconds:90
    }
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar })
    this.startTimer()
  }
  componentDidUpdate(){
    if (this.props.resetTimer){
      this.setState({
          time:{},
          seconds:90   
      },()=>{
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar })
        this.stopTimer()
        this.startTimer()
        this.props.disableReset()
      })
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState){
    if(this.props.isTimerRunning==false){
      this.stopTimer()
    }
    else if(this.props.isTimerRunning==true && prevProps.isTimerRunning == false ){
        this.startTimer()
    }
    return null
  }
  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": this.formatTime(hours),
      "m": this.formatTime(minutes),
      "s": this.formatTime(seconds)
    };
    return obj;
  }

  startTimer() {
    this.timer = setInterval(this.countDown, 1000);
  }
  stopTimer(){
    clearInterval(this.timer)
  }
  formatTime(time){
    return (time < 10) ? '0' + time.toString() : time.toString();
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    })
    
    // Check if we're at zero.
    if(seconds == 0){
      this.stopTimer()
      this.props.updateGameStatus("loss")
    }
  }

  render() {
    
    return(
      <div className="timer">
        {this.state.time.m}:{this.state.time.s}
      </div>
    );
  }
}

export default Timer;