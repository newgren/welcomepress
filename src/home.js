'use strict';

const e = React.createElement;



var x, y;
var tailLength = 45;


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.onclick = props.onclick;
  }

  componentDidMount() {
    let element = this.refs.elem;
    let animationIsActive = false;
    let framesPerSecond = 60;
    let intervalDelay = Math.round(1000 / framesPerSecond);
    //let lagTailLength = 5;


    let i = 0;
    let z = 0;

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
        if(!animationIsActive) {
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
      <div ref='cont'>
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
export default Home
