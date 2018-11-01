'use strict';

const e = React.createElement;

import Start from './start.js'
import Home from './home.js'
import Work from './work.js'
import Shop from './shop.js'
import Completed from './completed.js'

import MobileStart from './mobileStart.js'
import MobileShop from './mobileShop.js'
import MobileHome from './mobileHome.js'
import MobileWork from './mobileWork.js'
import MobileBag from './mobileBag.js'

class Press extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'start', // start | home | work | shop | completed
      homeEntered: 'false',
      windowWidth: null,
    };
  }

  isMobile() {
    return this.state.windowWidth < 650;
  }

  updateWidth() {
    this.setState({windowWidth: window.innerWidth});
  }

  componentDidMount() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth.bind(this));
  }

  render() {
    if(!this.state.windowWidth) {
      // wait for state update (render will be called again)
      return (null);
    }

    if(this.isMobile()) {
      console.log("mobile");
      switch (this.state.mode) {
        case 'start':
          return <MobileStart goToHome={() => this.setState({'mode': 'home'})} />
          break;
        case 'work':
          return <MobileWork goToHome={() => this.setState({'mode': 'home'})} />
          break;
        case 'shop':
          return <MobileShop goToHome={() => this.setState({'mode': 'home'})} />
          break;
        default:
          return <MobileHome goToShop={() => this.setState({'mode': 'shop'})}
                            goToWork={() => this.setState({'mode': 'work'})} />
      }
    } else {
      console.log("desktop");
      switch (this.state.mode) {
        case 'start':
          return <Start goToHome={() => this.setState({'mode': 'home'})}/>
          break;
        case 'work':
          return <Work goToHome={() => this.setState({'mode': 'home'})}/>
        case 'shop':
          return <Shop goToBag={() => this.setState({mode: 'bag'})}
                       goToHome={() => this.setState({mode: 'home'})}
                       goToCompleted={() => this.setState({mode: 'completed'})}/>
          break;
        case 'completed':
          return <Completed goToHome={() => this.setState({mode: 'home'})} />
          break;
        case 'home':
        default: //default to home
          return <Home goToShop={() => this.setState({mode: 'shop'})}
                       goToWork={() => this.setState({mode: 'work'})}/>
      }
    }
    /*
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Press'
    );
    */
  }
}

const domContainer = document.querySelector('#press_container');
ReactDOM.render(e(Press), domContainer);
