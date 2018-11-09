'use strict';


const e = React.createElement;

class Sidescroll extends React.Component {
  constructor(props) {
    super(props);
    this.mobile = props.mobile;
  }

  componentDidMount() {
    let thing = document.getElementById('sidescroll');
    let img = document.getElementById('scrollimg');

    //TODO: MAKE THESE USE 'VH' INSTEAD OF 'PX' so that animation speed is constant when changing broswer size
    // let shopHeight = document.getElementById('shopBox').clientHeight;
    let amt = -1 * (img.clientHeight);
    thing.style.top = amt + 'px';

    let marginSize = parseInt(window.getComputedStyle(img).marginBottom, 10);
    let increment = this.mobile ? 2 : 3;
    window.setInterval(() => {
      if(amt > marginSize) {
        amt = -1 * (img.clientHeight);
      }
      thing.style.top = amt + 'px';
      amt += increment;
    },
    10);
  }

  render() {
    return (
      <div id='sidescroll'>
        <img id='scrollimg' src='./iconImages/sidescroll.png'/>
        <img src='./iconImages/sidescroll.png'/>
        <img src='./iconImages/sidescroll.png'/>
        <img src='./iconImages/sidescroll.png'/>
      </div>
    );
  }
}
export default Sidescroll
