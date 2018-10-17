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
    let animationIsActive = false;
    let framesPerSecond = 60;
    let stutterIntervalDelay = Math.round(1000 / framesPerSecond);

    let i = 0;
    let z = 0;

    let startLaggyAnimation = () => {
      return window.setInterval(() => {
        // i = ((i+1)%tailLength);
        i = i === 0 ? 1 : i;
        let thing = document.getElementById('n'+i);
        thing.style.left = x + "px";
        thing.style.top = y + "px";
        thing.style.zIndex = z++;
      }, Math.floor(stutterIntervalDelay));
    }
    // thing.style.left = (x - (thing.offsetWidth/4)) + "px";
    // thing.style.top = (y - 825 - (thing.offsetHeight/4)) + "px";

    let ball = document.getElementById('n0');
    let ballText = document.getElementById('pressText0');
    let ballHeight = ballText.clientHeight;
    let ballWidth = ballHeight * 4.417519909;

    let garden = document.getElementById('mobileStart');

    let maxGamma = garden.clientWidth - ballWidth;
    let maxBeta = garden.clientHeight - ballText.clientHeight;
    let maxTilt = 30; // max tilt magnitude
    let startBeta = null;
    function handleOrientation(event) {
      if(!startBeta) {
        startBeta = event.beta;
      }
      let gamma = event.gamma;  // In degree in the range [-180,180]
      let beta = event.beta - startBeta; // In degree in the range [-90,90]

      // Because we don't want to have the device upside down
      // We constrain the x value to a range
      if (gamma > maxTilt) { gamma =  maxTilt};
      if (gamma < -maxTilt) { gamma = -maxTilt};
      if (beta > maxTilt) { beta =  maxTilt};
      if (beta < -maxTilt) { beta = -maxTilt};

      // To make computation easier we shift the range of
      // x and y to [0,180]
      gamma += maxTilt;
      beta += maxTilt;

      // 10 is half the size of the ball
      // It center the positioning point to the center of the ball
      y  = (maxBeta*(beta)/(maxTilt*2));
      x = (maxGamma*gamma/(maxTilt*2));
      ball.style.left = x;
      ball.style.top = y;
    }

    window.addEventListener('deviceorientation', handleOrientation);
    startLaggyAnimation();
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
          {
            Array.apply(null, Array(tailLength)).map((i, j) => <div id={'n'+j} key={j} className='press' ref={j === 0 ? 'elem' : ''}>
              <svg id={'pressText'+j} viewBox="0 0 417 60">
                <text y="57">PRESS</text>
              </svg>
            </div>)
          }
      </div>
    );
  }
}
export default MobileStart
