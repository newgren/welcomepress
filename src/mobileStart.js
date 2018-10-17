'use strict';

const e = React.createElement;

var x, y;
var tailLength = 45;
var timeout = null;
var interval = null;
var mousemoveHandler = null;

class MobileStart extends React.Component {
  constructor(props) {
    super(props);
    this.goToHome = props.goToHome;
  }

  componentWillUnmount() {
    clearInterval(interval);
    clearTimeout(timeout);
    window.removeEventListener('mousemove', mousemoveHandler, false);

  }

  componentDidMount() {
    let element = this.refs.elem;

    // thing.style.left = (x - (thing.offsetWidth/4)) + "px";
    // thing.style.top = (y - 825 - (thing.offsetHeight/4)) + "px";

    var ball = document.getElementById('press');
    let ballHeight = ball.clientHeight;
    let ballWidth = ballHeight * 4.417519909;
    // let a = prompt("top");
    // ball.style.top  = (a) + "px";
    // let b = prompt("left");
    // ball.style.left = (b) + "px";

    var garden = document.getElementById('mobileStart');
    var output = document.getElementById('output');

    var maxX = garden.clientWidth - ballWidth;
    var maxY = garden.clientHeight - ball.clientHeight;
    let maxTilt = 30; // max tilt magnitude
    let startBeta = null;
    function handleOrientation(event) {
      if(!startBeta) {
        startBeta = event.beta + 180;
      }
      var x = event.gamma;  // In degree in the range [-180,180]
      var y = event.beta; // In degree in the range [-90,90]


      output.innerHTML  = "beta : " + x + "\n";
      output.innerHTML += "gamma: " + y + "\n";

      // Because we don't want to have the device upside down
      // We constrain the x value to the range [-90,90]
      if (x > maxTilt) { x =  maxTilt};
      if (x < -maxTilt) { x = -maxTilt};

      // To make computation easier we shift the range of
      // x and y to [0,180]
      x += maxTilt;
      y += maxTilt;

      // 10 is half the size of the ball
      // It center the positioning point to the center of the ball
      ball.style.top  = (maxY*(startBeta + y)/(maxTilt*2)) + "px";
      ball.style.left = (maxX*x/(maxTilt*2)) + "px";
    }

    window.addEventListener('deviceorientation', handleOrientation);
  }


  render() {
    return (
      <div id='mobileStart' onClick={() => this.goToHome()}>
          <div className='center'>
            <div id='welcome'>
              <svg viewBox="0 0 417 60">
                <text id='welcomeText' y="57">WELCOME</text>
              </svg>
            </div>
          </div>
          <div id='press'>
            <svg id='pressText' viewBox="0 0 417 60">
              <text  y="57">PRESS</text>
            </svg>
          </div>
          <pre id="output"></pre>
      </div>
    );
  }
}
export default MobileStart
