'use strict';

const e = React.createElement;

var entered = false;
var x, y;
var tailLength = 45;

// enter site

//TODO: swap two lines below
document.onclick = () => {
//window.onload = () => {
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
    let intervalDelay = Math.round(1000 / framesPerSecond);
    //let lagTailLength = 5;

    let i = 0;
    let z = 0;


    // if(!isDesktop()) {
    //   return;
    // }

    let startAnimation = () => {
      return window.setInterval(() => {
        console.log('go');
        i = ((i+1)%tailLength);
        i = i === 0 ? 1 : i;
        let thing = document.getElementById('n'+i);
        thing.style.left = (x - (thing.offsetWidth/4)) + "px";
        thing.style.top = (y - 825 - (thing.offsetHeight/4)) + "px";
        thing.style.zIndex = z++;
      }, Math.floor(intervalDelay));
    }
    let timeout = null; // id of timeout callback to cancel animation
    let interval = null; // id of interval callback to animate
    window.addEventListener('mousemove', function(event){
        window.clearTimeout(timeout);
        if(!animationIsActive && !entered) {
          interval = startAnimation();
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
        }, intervalDelay * tailLength * 2);
    }, false);
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
            <div className='left'>
              <div className='welcome rot'>
                <svg viewBox="0 0 417 60">
                  <text y="57">WELCOME</text>
                </svg>
              </div>
              <div className='press rot' id='nodelete'>
                <svg viewBox="0 0 417 60">
                  <text y="57">PRESS</text>
                </svg>
              </div>
            </div>
            <div className='right'>
              <div className='top'>
                <svg viewBox="0 0 417 60">
                  <text x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle">
                    WORK
                  </text>
                </svg>
              </div>
              <div className='bottom'>
                <svg viewBox="0 0 417 60">
                  <text x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle">
                    SHOP
                  </text>
                </svg>
              </div>
            </div>
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
