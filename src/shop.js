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
      productForced: false,
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
    fbq('track', 'AddToCart');
    ga('send', {
      hitType: 'event',
      eventCategory: 'product',
      eventAction: 'addToCart ' + id,
      eventLabel: 'desktop'
    });
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
    ga('send', {
      hitType: 'event',
      eventCategory: 'product',
      eventAction: 'removeFromCart ' + index,
      eventLabel: 'desktop'
    });
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
    let oldMode = this.state.checkoutMode;
    ga('send', {
      hitType: 'event',
      eventCategory: 'modeCheckout',
      eventAction: oldMode + '-' + newMode,
      eventLabel: 'desktop'
    });
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
    let pounds = 0;
    let ounces = 6;
    let userid = "711WELCO2258"; //"[userid]";
    let url = "http://production.shippingapis.com/ShippingAPI.dll?\
API=RateV4&XML=<RateV4Request USERID=\"" + userid + "\">\
<Revision>2</Revision>\
<Package ID=\"1ST\"><Service>FIRST CLASS</Service>\
<FirstClassMailType>FLAT</FirstClassMailType>\
<ZipOrigination>61801</ZipOrigination>\
<ZipDestination>04019</ZipDestination>\
<Pounds>0</Pounds>\
<Ounces>6</Ounces>\
<Container/>\
<Size>REGULAR</Size>\
<Machinable>true</Machinable>\
</Package>\
</RateV4Request>";
    console.log(String(url));
    const http = new XMLHttpRequest();
    http.open("GET", url);
    //http.setRequestHeader("Access-Control-Allow-Origin", "*");
    // Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.send();
    http.onreadystatechange = (e) => {
      console.log(http.responseText);
    }
  }

  getTotal() {
    return this.getSubtotal() + this.getShipping();
  }

  componentDidMount() {
    if(!this.state.productForced && this.props.forceProduct) {
      this.setState({productForced: true, sel: 0, mode: 'item'});
    }
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
              {this.state.mode == 'browse' || this.state.mode == 'item' ?
                <img src='./iconImages/bag_desktop.png'
                     onClick={() => this.getCartSize() > 0 ? this.setState({mode: 'bag', sel: -1}) : alert('add something to your cart first!')}
                /> :
                <img src='./iconImages/bag_desktop_blue.png'
                     onClick={() => this.getCartSize() > 0 ? this.setState({mode: 'bag', sel: -1}) : alert('add something to your cart first!')}
                />
              }
              {this.state.mode == 'browse' || this.state.mode == 'item' ?
                <span>{this.getCartSize()}</span>
                :
                <span className='white'>{this.getCartSize()}</span>

              }
            </div>
          </div>
          {
            this.state.sel == -1 ? (
              this.state.mode == 'browse' ?
                <div className='desktop scroller'>
                  {catalog.items.map((item, id) =>
                    <img src={'./product/'+item.preview_url+'.png'}
                         className='scrollerItem'
                         onClick={() => this.setState({sel: id, mode: 'item'})}
                         key={item.name}/>
                  )}
                </div>
              :
                this.state.mode == 'bag' ?
                  <Bag
                    cart={this.state.cart}
                    remove={(index, size) => this.removeFromCart(index, size)}
                    goToCheckout={() => {
                      fbq('track', 'InitiateCheckout');
                      ga('send', {
                        hitType: 'event',
                        eventCategory: 'product',
                        eventAction: 'initCheckout',
                        eventLabel: 'desktop'
                      });
                      this.setState({mode: 'checkout'});
                    }}
                    goToBrowse={()=>this.setState({mode: 'browse'})}
                    getSubtotal={this.getSubtotal.bind(this)}
                    getCartSize={this.getCartSize.bind(this)} />                  :
                  this.state.mode == 'checkout' ?
                    <Checkout cart={this.state.cart}
                              mode={this.state.checkoutMode}
                              setMode={(newMode) => this.setCheckoutMode(newMode)}
                              completeCheckout={this.goToCompleted}
                              goBack={this.handleBack.bind(this)}
                              getCartSize={this.getCartSize.bind(this)}/>
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
        <span className='slowdownkiddo'><a target="_blank" href='http://brutalistwebsites.com/welcomepress.xyz/'>here</a></span>
      </div>
    );
  }
}
export default Shop
