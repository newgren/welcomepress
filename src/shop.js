'use strict';

import Item from './item.js';
import Bag from './bag.js';
import Checkout from './checkout.js';
import Sidescroll from './sidescroll.js';



import catalog from './product/catalog.js';

const e = React.createElement;

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.goToBag = props.goToBag;
    this.goToHome = props.goToHome;
    this.goToCompleted = props.goToCompleted;
    this.state = {
      mode: 'browse', // 'browse' | 'item' | 'bag' | 'checkout' | 'complete'
      checkoutMode: 'shipping', // 'shipping' | 'payment'
      pos: 0,
      sel: -1,
      cart: {
      }
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
        return;
      case 'bag':
        this.setState({mode: 'browse'});
        return;
      case 'browse':
        this.goToHome();
        return;
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

  setCheckoutMode(newMode) {
    console.log("sET");
    this.setState({checkoutMode: newMode});
  }

  formatMoney(val) {
  //  return Math.round(val * 100) / 100;
    return val.toFixed(2);
  }

  getSubtotal() {
    let cart = this.state.cart;
    let keys = Object.keys(cart);
    let subtotal = 0;
    keys.forEach((key) => {
      let price = catalog.items[key].price;
      let shirt = cart[key];
      let shirtKeys = Object.keys(shirt);
      shirtKeys.forEach((shirtkey) => {
        subtotal += shirt[shirtkey] * price;
      });
    });
    return subtotal;
  }

  getShipping() {
    return 2.05;
  }

  getTotal() {
    return this.getSubtotal() + this.getShipping();
  }

  

  render() {
    return (
      <div className='shop'>
        <div className='shopLeft'>
          <Sidescroll/>
        </div>
        <div className='shopBox' id='shopBox'>
          <div className='banner'>
            <img src='./iconImages/banner_left_desktop.png'
                 id='leftBannerIcon'
                 onClick={() => this.handleBack()} />
            {
            this.state.mode != 'item' ?
              (this.state.mode == 'bag' ?
                <span id='shopProductName'>SHOPPING BAG</span>
                :
                this.state.mode == 'checkout' ?
                <span id='shopProductName'>CHECKOUT</span>
                :
                  <img src='./iconImages/SHOP.png' id='shopBannerText' />
              )
              :
              <span id='shopProductName'>{catalog.items[this.state.sel].name}</span>
            }
            <div id='bagbannericon'>
              <img src='./iconImages/bag_desktop.png'
                   onClick={() => this.getCartSize() > 0 ? this.setState({mode: 'bag', sel: -1}) : alert('add something to your cart first!')}
              />
            <span>{this.getCartSize()}</span>
            </div>
          </div>
          {
            this.state.sel == -1 ? (
              this.state.mode == 'browse' ?
                <div className='desktop scroller'>
                  {catalog.items.map((item, id) =>
                    <img src={'./product/'+item.image_urls[0]+'.png'}
                         onClick={() => this.setState({sel: id, mode: 'item'})} key={item.name}/>
                  )}
                </div>
              :
                this.state.mode == 'bag' ?
                  <Bag
                    cart={this.state.cart}
                    remove={(index, size) => this.removeFromCart(index, size)}
                    goToCheckout={() => this.setState({mode: 'checkout'})}
                    getSubtotal={this.getSubtotal.bind(this)} />                  :
                  this.state.mode == 'checkout' ?
                    <Checkout cart={this.state.cart}
                              mode={this.state.checkoutMode}
                              setMode={(newMode) => this.setCheckoutMode(newMode)}
                              completeCheckout={this.goToCompleted} />
                  :
                    (null)
              )
            :
              <Item item={catalog.items[this.state.sel]}
                    addToCart={(size, qty) => this.addToCart(this.state.sel, size, qty)}
              />
          }
          <div className='mobile itemList'>
            {catalog.items.map((item, id) =>
              <img src={'./product/'+item.image_urls[0]+'.png'} onClick={() => this.setState({sel: id})} key={item.name}/>
            )}
          </div>
        </div>
        <span className='slowdownkiddo'>oh.. the site's not supposed to do that. click <a href='https://welcomepress.xyz'>here</a> to go to back to a version of WELCOME PRESS that's identical to this one except it won't let you do this</span>
        <span className='slowdownkiddo'>Re: that message above and to the left.  ok so we've gotten WAY too many emails regarding the above message. people are saying things like, "why don't you just update this version of the site to the new version so this isn't a problem in the first place?? you clearly already have fixed the bug, so just update it." well, we're never going to change it so we hope that give you an idea of the type of business we're operating here. thank you. ~WP</span>
      </div>
    );
  }
}
export default Shop
