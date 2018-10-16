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
    ball.style.position = 'fixed';
    var garden = document.getElementById('home');
    var output = document.getElementById('output');

    var maxX = garden.clientWidth  - ball.clientWidth;
    var maxY = garden.clientHeight - ball.clientHeight;

    function handleOrientation(event) {
      var x = event.beta;  // In degree in the range [-180,180]
      var y = event.gamma; // In degree in the range [-90,90]

      output.innerHTML  = "beta : " + x + "\n";
      output.innerHTML += "gamma: " + y + "\n";

      // Because we don't want to have the device upside down
      // We constrain the x value to the range [-90,90]
      if (x >  90) { x =  90};
      if (x < -90) { x = -90};

      // To make computation easier we shift the range of
      // x and y to [0,180]
      x += 90;
      y += 90;

      // 10 is half the size of the ball
      // It center the positioning point to the center of the ball
      ball.style.top  = (maxX*x/180 - 10) + "px";
      ball.style.left = (maxY*y/180 - 10) + "px";
    }

    window.addEventListener('deviceorientation', handleOrientation);
  }


  render() {
    return (
      <div id='home' className='home' onClick={() => this.goToHome()}>
          <div className='home center'>
            <div className='welcome'>
              <svg viewBox="0 0 417 60">
                <text y="57">WELCOME</text>
              </svg>
            </div>
          </div>
          <svg viewBox="0 0 417 60" id='press'>
            <text y="57">PRESS</text>
          </svg>
          <pre id="output"></pre>
      </div>
    );
  }
}
export default MobileStart
