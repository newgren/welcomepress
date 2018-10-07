'use strict';

const e = React.createElement;

var x, y;
var tailLength = 45;
var timeout = null;
var interval = null;
var mousemoveHandler = null;

class Start extends React.Component {
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
    let animationIsActive = false;
    let framesPerSecond = 60;
    let stutterIntervalDelay = Math.round(1000 / framesPerSecond);

    let i = 0;
    let z = 0;

    let startLaggyAnimation = () => {
      return window.setInterval(() => {
        console.log('go');
        i = ((i+1)%tailLength);
        i = i === 0 ? 1 : i;
        let thing = document.getElementById('n'+i);
        thing.style.left = (x - (thing.offsetWidth/4)) + "px";
        thing.style.top = (y - 825 - (thing.offsetHeight/4)) + "px";
        thing.style.zIndex = z++;
      }, Math.floor(stutterIntervalDelay));
    }

    timeout = null; // id of timeout callback to cancel animation
    interval = null; // id of interval callback to animate
    mousemoveHandler = function (event) {
        window.clearTimeout(timeout);
        if(!animationIsActive) {
          interval = startLaggyAnimation();
          animationIsActive = true;
        }
        x = event.clientX;
        y = event.clientY;
        if ( typeof x !== 'undefined' ){
            element.style.left = (x - (element.offsetWidth/4)) + "px";
            element.style.top = (y - 825 - (element.offsetHeight/4)) + "px";
        }
        timeout = setTimeout(() => {
          clearInterval(interval);
          animationIsActive = false;
        }, stutterIntervalDelay * tailLength * 2);
    }

    window.addEventListener('mousemove', mousemoveHandler, false);
  }


  render() {
    return (
      <div className='home' onClick={() => this.goToHome()}>
          <div className='home center'>
            <div className='welcome'>
              <svg viewBox="0 0 417 60">
                <text y="57">WELCOME</text>
              </svg>
            </div>
          </div>
          {
            Array.apply(null, Array(tailLength)).map((i, j) => <div id={'n'+j} key={j} className='press' ref={j === 0 ? 'elem' : ''}>
              <svg viewBox="0 0 417 60">
                <text y="57">PRESS</text>
              </svg>
            </div>)
          }
        </div>
    );
  }
}
export default Start
