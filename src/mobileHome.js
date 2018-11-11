'use strict';

const e = React.createElement;

var numWorkCopies = 40;
var numShopTextCopies = 60;
var numMarkCopies = 35;
var numInfoCopies = 40;

var infoBlurb = 'we are a full-service front-end design shop located in Urbana, IL. we also make shirts.';

// TODO: conditionally render image only for top layer of chchchch

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needToOpen: true
    }
    this.goToShop = props.goToShop;
    this.goToWork = props.goToWork;
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
    chchch(shopTextCopies, 20);
    let markCopies = document.getElementsByClassName('mark layer');
    chchch(markCopies, 20);

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
    mark.onclick = () => {
      move(infos, masterIndex, this.state.needToOpen);
      this.setState({needToOpen: !this.state.needToOpen}  );
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
                onClick={this.goToWork}
                style={{
                  transform: `translate(${-j*0.7}vh, ${-j*1.4}vw)`,
                  zIndex: -j
                }}>
                <img src='./iconImages/work_mobile.png'/>
              </div>)
            }
            {
              Array.apply(null, Array(numShopTextCopies)).map((i, j) => <div
                id={'shopText'+j}
                key={j}
                className='shopText layer'
                onClick={this.goToShop}
                style={
                  {transform: `translate(${j*0.7}vh, ${j*1.4}vw)`,
                  zIndex: -j}
                }>
                <img src='./iconImages/shop_mobile.png'/>
              </div>)
            }
            {
              Array.apply(null, Array(numMarkCopies)).map((i, j) => <div
                id={'mark'+j}
                key={j}
                className='mark layer'
                style={
                  {transform: `translate(${-j*1.3}vw, ${j*0.8}vh)`,
                  zIndex: -j}
                }>
                <img src='./iconImages/mark_mobile.png'/>
              </div>)
            }
            <div className='mark' id='mark'><span>?</span></div>
            {
              Array.apply(null, Array(numInfoCopies)).map((i, j) => <div
                id={'info'+j}
                key={j}
                className='info layer'
                style={
                  {transform: `translate(${-j*1.3}vw, ${j*0.8}vh)`,
                  zIndex: -j}
                }>
                <span>{infoBlurb}</span>
                <br/>
                <span><a href='mailto:hello@welcomepress.xyz'>hello@welcomepress.xyz</a></span>
                <span id='priv'><a href='./privacyPolicy.html'>privacy policy</a></span>
              </div>)
            }
        </div>

      </div>
    );
  }
}
export default Home
