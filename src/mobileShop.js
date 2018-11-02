'use strict';

import MobileItem from './mobileItem.js';
import MobileBag from './mobileBag.js';

import MobileCheckout from './mobileCheckout.js';
import Sidescroll from './sidescroll.js';
import catalog from './product/catalog.js';

const e = React.createElement;

class MobileShop extends React.Component {
  constructor(props) {
    super(props);
    this.goToBag = props.goToBag;
    this.goToHome = props.goToHome;
    this.goToCompleted = props.goToCompleted;
    this.state = {
      mode: 'browse', // 'browse' | 'item' | 'bag' | 'checkout' | 'complete'
      checkoutMode: 'shipping', // 'shipping' | 'payment'
      pos: 0,
      sel: 0,
      cart: {}//{0: {'S': 2,'L': 1}}
    };
  }

  canGoLeft() {
    return this.state.pos < 0;
  }

  canGoRight() {
    //TODO: fix this shite
    return this.state.pos > 9 * -400;
  }

  handleScroll(dir) {
    let pos = this.state.pos;
    switch (dir) {
      case "left":
        this.canGoLeft() ? this.setState({pos: pos + 400}) : this.blinkArrow();
        break;
      case "right":
        this.canGoRight() ? this.setState({pos: pos - 400}) : this.blinkArrow();
        break;
      default:
    }
  }

  addToCart(id, size, qty) {
    let cart = this.state.cart;
    if (!(id in cart)) {
      cart[id] = {};
    }
    cart[id][size] = qty + (size in cart[id] ? cart[id][size] : 0);
    this.setState({
      cart: cart,
      mode: 'bag',
      sel: -1
    });
  }

  removeFromCart(index, size) {
    let cart = this.state.cart;
    delete cart[index][size];
    this.setState({cart: cart});
  }

  getCartSize() {
    let cart = this.state.cart;
    let keys = Object.keys(cart);
    let size = 0;
    keys.forEach((key) => {
      let shirt = cart[key];
      let shirtKeys = Object.keys(shirt);
      shirtKeys.forEach((shirtkey) => {
        size += shirt[shirtkey];
      });
    });
    return size;
  }

  setCheckoutMode(newMode) {
    console.log("sET");
    this.setState({checkoutMode: newMode});
  }


  /**
  * return whether element has ancestor with class=className
  */
  hasParentClass(elem, className) {
    if(elem.className === className) {
      return true;
    }
    while ((elem = elem.parentElement)) {
      if(elem.className === className) {
        return true;
      }
    }
    return false;
  }

  handleBack() {
    // in item, go back to browse
    switch (this.state.mode) {
      case 'item':
        this.setState({mode: 'browse', sel: -1});
        break;
      case 'bag':
        this.setState({mode: 'browse'});
        break;
      case 'browse':
        this.goToHome();
      case 'checkout':
        if(this.state.checkoutMode == 'shipping') {
          this.setState({mode:'bag'});
        } else {
          this.setState({checkoutMode:'shipping'});
        }
        return;
      default:
        return;
    }
  }

  render() {
    return (
      <div className='mobileShop'>
        <div className='shopLeft'>
          <Sidescroll mobile={true} />
        </div>
        <div className='shopBox'>
          <div className='banner'>
            <img src='./iconImages/banner_left_desktop.png'
                 id='leftBannerIcon'
                 onClick={() => this.handleBack()} />
            {
              (this.state.mode == 'browse' || this.state.mode == 'item') ?
                <img src='./iconImages/SHOP.png' id='shopBannerText' />
              :
                <span id='shopProductName'>BAG</span>
            }
          </div>
          {
            {
              'browse': catalog.items.map((item, id) =>
                <div className='itemPreview'>
                  <div>{item.name}</div>
                  <div>${item.price}</div>
                  <div className='imageHolder'>
                    <img src={'./product/'+item.image_urls[0]+'.png'}
                         onClick={()=> this.setState({mode: 'item', sel: id})}/>
                  </div>
                </div>),
              'bag': <MobileBag cart={this.state.cart}
                                remove={(index, size) => this.removeFromCart(index, size)}
                                goToCheckout={() => this.setState({mode: 'checkout'})} />,
              'item': <MobileItem item={catalog.items[this.state.sel]}
                                addToCart={(size, qty) => this.addToCart(this.state.sel, size, qty)}/>,
              'checkout':  <MobileCheckout cart={this.state.cart}
                          mode={this.state.checkoutMode}
                          setMode={(newMode) => this.setCheckoutMode(newMode)}
                          completeCheckout={this.goToCompleted} />

            }[this.state.mode]
          }

        </div>
        <div className='buyBox'>

        </div>
      </div>
    );
  }
}
export default MobileShop
