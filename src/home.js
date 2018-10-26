'use strict';

const e = React.createElement;

var numWorkCopies = 24;
var numShopTextCopies = 29;
var numMarkCopies = 20;
var numInfoCopies = 30;

var infoBlurb = 'we are an independent front-end design shop located in Urbana, IL. we also make shirts.';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.goToShop = props.goToShop;
  }

  componentDidMount() {
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

    //do chchch animations and init hovers
    let workCopies = document.getElementsByClassName('work layer');
    chchch(workCopies, 20);
    let shopTextCopies = document.getElementsByClassName('shopText layer');
    chchch(shopTextCopies, 30);
    let markCopies = document.getElementsByClassName('mark layer');
    chchch(markCopies, 40);

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
    }

    let mark = document.getElementById('mark0');
    let infos = document.getElementsByClassName('info layer');
    let masterIndex = {val: infos.length - 1};
    mark.onmouseover = () => {
      move(infos, masterIndex, true);
    };
    mark.onmouseout = () => {
      move(infos, masterIndex, false);
    };
  }


  render() {
    return (
      <div className='home'>
        <div id='leftStacked'>
          <img src='./iconImages/leftStacked.png'/>
        </div>
        <div className='homeDesktop' id='homeDesktop'>

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
                onClick={this.goToShop}
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
    );
  }
}
export default Home
