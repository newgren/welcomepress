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
    this.changeMode = this.changeMode.bind(this);
    this.state = {
      mode: 'start', // start | home | work | shop | completed
      homeEntered: 'false',
      windowWidth: null,
      routed: false,
    };
  }

  isMobile() {
    return this.state.windowWidth < 650;
  }

  updateWidth() {
    this.setState({windowWidth: window.innerWidth});
  }

  changeMode(newMode) {
    let oldMode = this.state.mode;
    this.setState({mode: newMode});
    ga('send', {
      hitType: 'event',
      eventCategory: 'mode',
      eventAction: oldMode + '-' + newMode,
      eventLabel: this.isMobile ? 'mobile' : 'desktop'
    });
  }

  componentDidMount() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth.bind(this));
    if(!this.state.routed && window.location.href.includes('shop')) {
      this.setState({routed: true, mode: 'shop'});
    }
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
          return <MobileStart goToHome={() => this.changeMode('home')} />
          break;
        case 'work':
          return <MobileWork goToHome={() => this.changeMode('home')} />
          break;
        case 'shop':
          return <MobileShop goToHome={() => this.changeMode('home')}
                             goToCompleted={() => this.changeMode('completed')}
                             forceProduct={this.state.routed} />
          break;
        case 'completed':
          return <Completed goToHome={() => this.changeMode('home')} />
          break;
        default:
          return <MobileHome goToShop={() => this.changeMode('shop')}
                            goToWork={() => this.changeMode('work')} />
      }
    } else {
      console.log("desktop");
      switch (this.state.mode) {
        case 'start':
          return <Start goToHome={() => this.changeMode('home')}/>
          break;
        case 'work':
          return <Work goToHome={() => this.changeMode('home')}/>
        case 'shop':
          return <Shop goToBag={() => this.changeMode('bag')}
                       goToHome={() => this.changeMode('home')}
                       goToCompleted={() => this.changeMode('completed')}
                       forceProduct={this.state.routed} />
          break;
        case 'completed':
          return <Completed goToHome={() => this.changeMode('home')} />
          break;
        case 'home':
        default: //default to home
          return <Home goToShop={() => this.changeMode('shop')}
                       goToWork={() => this.changeMode('work')}/>
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
