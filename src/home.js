'use strict';

const e = React.createElement;

var entered = false;
var x, y;
var tailLength = 45;

var numWorkCopies = 24;
var numShopTextCopies = 29;
var numMarkCopies = 20;
var numInfoCopies = 30;

var infoBlurb = 'we are an independent front-end design shop located in Urbana, IL. we also make shirts.';

// enter site

//TODO: swap two lines below
document.onclick = () => {
// window.onload = () => {
  entered = true;
  let presses = document.getElementsByClassName('press');
  for (let i = 0; i < presses.length; i++) {
    if(presses[i].id !== 'nodelete') {
      presses[i].style.display = 'none';
    }
  }
  document.getElementsByClassName('over')[0].className = 'over entered';


  let chchch = (copies, duration) => {
    let copyIndex = copies.length - 1;
    let intervalPointer = window.setInterval(() => {
      if(copyIndex < 0) {
        clearInterval(intervalPointer);
        return;
      }
      copies[copyIndex--].style.display = 'inherit';
    }, duration);
  }

  let fatherWork = document.getElementById('fatherWork')
  let initWorkShopTextHovers = (copies) => {
    for(let i = 0; i < copies.length; i++) {
      break;
      copies[i].onmouseover = () => {
        copies[i].style.backgroundColor = "limegreen";
      };
      copies[i].onmouseout = () => {
        copies[i].style.backgroundColor = "";
      };
    }
  }
  //do chchch animations and init hovers
  let workCopies = document.getElementsByClassName('work layer');
  chchch(workCopies, 20);
  initWorkShopTextHovers(workCopies);
  let shopTextCopies = document.getElementsByClassName('shopText layer');
  chchch(shopTextCopies, 30);
  let markCopies = document.getElementsByClassName('mark layer');
  chchch(markCopies, 40);

  initWorkShopTextHovers(shopTextCopies);

  let marks = document.getElementsByClassName('mark layer');
  let mark = document.getElementById('mark');

  //let lock_over = false;
  //let lock_out = false;

  let move = (copies, index, isOver) => {
    //isOver ? lock_over = true : lock_out = true;
    let intervalPointer = window.setInterval(() => {
      if( //(isOver && lock_out) || (!isOver && lock_over) ||
          index.val < 0 || index.val >= copies.length) {
        if(index.val < 0) {
          index.val = 0;
        }
        if(index.val >= copies.length) {
          index.val = copies.length - 1;
        }
        clearInterval(intervalPointer);
        return;
      }
      copies[isOver ? index.val-- : index.val++]
        .style.display = !isOver ? 'none' : 'inherit';

    }, 10);
    //isOver ? lock_over = false : lock_out = false;
  }

  let infos = document.getElementsByClassName('info layer');
  let masterIndex = {val: infos.length - 1};
  mark.onmouseover = () => {
    console.log('over');
    move(infos, masterIndex, true);
  };
  mark.onmouseout = () => {
    console.log('out');
    move(infos, masterIndex, false);
  };

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
              Array.apply(null, Array(numWorkCopies)).map((i, j) => <div
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
            {
              Array.apply(null, Array(numShopTextCopies)).map((i, j) => <div
                id={'shopText'+j}
                key={j}
                className='shopText layer'
                onClick={this.props.onclick}
                style={
                  {transform: `translate(${j}vw, ${j*1.5}vh)`,
                  zIndex: -j}
                }>
                <span>SHOP</span>
              </div>)
            }
            {
              Array.apply(null, Array(numMarkCopies)).map((i, j) => <div
                id={'mark'+j}
                key={j}
                className='mark layer'
                style={
                  {transform: `translate(${-j}vw, ${j*1.5}vh)`,
                  zIndex: -j}
                }>
                <span>?</span>
              </div>)
            }
            <div className='mark' id='mark'><span>?</span></div>
            {
              Array.apply(null, Array(numInfoCopies)).map((i, j) => <div
                id={'info'+j}
                key={j}
                className='info layer'
                style={
                  {transform: `translate(${-j}vw, ${j*1.5}vh)`,
                  zIndex: -j}
                }>
                <span>{infoBlurb}</span>
                <br/>
                <span><a href='mailto:hello@welcomepress.xyz'>hello@welcomepress.xyz</a></span>
              </div>)
            }
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
          <div className='square' id='shopText'>
          </div>
        </div>
      </div>
    );
  }
}
export default Home
