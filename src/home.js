'use strict';

const e = React.createElement;

var entered = false;
var x, y;
var tailLength = 45;

// enter site

//TODO: swap two lines below
// document.onclick = () => {
window.onload = () => {
  entered = true;
  let presses = document.getElementsByClassName('press');
  for (let i = 0; i < presses.length; i++) {
    if(presses[i].id !== 'nodelete') {
      presses[i].style.display = 'none';
    }
  }
  document.getElementsByClassName('over')[0].className = 'over entered';
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.onclick = props.onclick;
  }


  componentDidMount() {
    // let isDesktop = () => {
    //   console.log(document.getElementById('homeMobile').style);
    //   document.getElementById('homeDesktop').style.display !== 'none';
    // }

    let element = this.refs.elem;
    let animationIsActive = false;
    let framesPerSecond = 60;
    let stutterIntervalDelay = Math.round(1000 / framesPerSecond);
    //let lagTailLength = 5;

    let i = 0;
    let z = 0;

    // if(!isDesktop()) {
    //   return;
    // }

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

    let timeout = null; // id of timeout callback to cancel animation
    let interval = null; // id of interval callback to animate
    window.addEventListener('mousemove', function(event){
        window.clearTimeout(timeout);
        if(!animationIsActive && !entered) {
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
    }, false);

    let intervalDuration = 10;
    let startChChChChAnimation = () => {
        let copies = document.getElementsByClassName('work layer');
        let copyIndex = copies.length - 1;
        let intervalPointer = window.setInterval(() => {
          if(copyIndex < 0) {
            clearInterval(intervalPointer);
            return;
          }
          copies[copyIndex--].style.display = 'inherit';
        }, intervalDuration);
    }
    startChChChChAnimation();
  }


  render() {
    return (
      <div className='home'>
        <div className='homeDesktop' id='homeDesktop'>
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
          <div className='over'>
            {
              Array.apply(null, Array(24)).map((i, j) => <div
                id={'work'+j}
                key={j}
                className='work layer'
                style={{
                  transform: `translate(${-j}vw, ${-j*1.5}vh)`,
                  zIndex: -j
                }}>
                <span>WORK</span>
              </div>)
            }
            <div className='work'><span>WORK</span></div>
            {
              Array.apply(null, Array(40)).map((i, j) => <div
                id={'shop'+j}
                key={j}
                className='shop layer'
                style={
                  {transform: `translate(${j}vw, ${j*1.5}vh)`,
                  zIndex: -j}
                }>
                <span>SHOP</span>
              </div>)
            }
            <div className='shop'><span>SHOP</span></div>
          </div>
        </div>
        <div className='homeMobile' id='homeMobile' ref='homeMobile'>
          <div className='homeBox'>
            <div className='welcome'>
              <svg viewBox="0 0 417 60">
                <text y="57">WELCOME</text>
              </svg>
            </div>
            <div className='press'>
              <svg viewBox="0 0 417 60">
                <text y="57">PRESS</text>
              </svg>
            </div>
            <div className='questionBox'>
              <span>?</span>
            </div>
          </div>
          <div className='square' id='work'>
          </div>
          <div className='square' id='shop'>
          </div>
        </div>
      </div>
    );
  }
}
export default Home
