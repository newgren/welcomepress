'use strict';

import catalog from './product/catalog.js';
import BagItem from './bagItem.js'

import Payment from './payment.js'


const e = React.createElement;

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.cart = props.cart;
    this.remove = props.remove;
    this.buttonRef = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleShippingSubmit = this.handleShippingSubmit.bind(this);
    this.handlePaymentSuccess = this.handlePaymentSuccess.bind(this);
    this.mode = props.mode; // 'shipping' | 'payment'
    this.setCheckoutMode = props.setMode;
    this.completeCheckout = props.completeCheckout;
    this.state = {
      invalidShippingAddressError: false,
      invalidEmailAddressError: false,
      shippingInfoIsValidated: false,
      ship: {
        email: '',
        firstName: '',
        lastName: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip5: '',
        country: 'USA'
      }
    }
  }

  formatMoney(val) {
    return Math.round(val * 100) / 100;
  }

  getSubtotal() {
    //TODO: this function seems to be called way more times than it should...
        // potential problem with state update
    let cart = this.cart;
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

  verifyShippingAddress(callbackTrue, callbackFalse) {
    let userid = "711WELCO2258"; //"[userid]";
    let url = `https://secure.shippingapis.com/ShippingAPI.dll\
    ?API=Verify\
    &XML=\
    <AddressValidateRequest USERID="${userid}">\
      <Address ID="0">\
        <Address1>${this.state.ship.street1}</Address1>\
        <Address2>${this.state.ship.street2}</Address2>\
        <City>${this.state.ship.city}</City>\
        <State>${this.state.ship.state}</State>\
        <Zip5>${this.state.ship.zip5}</Zip5>\
        <Zip4></Zip4>\
      </Address>\
    </AddressValidateRequest>`;

    console.log(url);
    const http = new XMLHttpRequest();
    http.open("GET", url);
    http.send();
    http.onreadystatechange = (e) => {
      // console.log('HTTP STATUS: ' + http.status);
      // console.log('HTTP RDYSTATE: ' + http.readyState);
      if(http.readyState === 4 && http.status === 200) {
        let xml = http.responseXML;
        let valid = xml.getElementsByTagName("Error").length === 0;
        valid ? callbackTrue() : callbackFalse();
      }
    }
  }

  validateEmail(email) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  handleInputChange(event) {
    let ship = this.state.ship;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    ship[name] =  value;
    this.setState({ship: ship});
  }

  // **** * ****
  // ***** TODO async


  handleShippingSubmit(event) {
    event.preventDefault();
    this.setState({shippingInfoIsValidated: false}); // just in case
    if(this.validateEmail(this.state.ship.email)) {
      this.setState({invalidEmailAddressError: false});
      console.log('VALID EMAIL');
    } else {
      this.setState({invalidEmailAddressError: true});
      console.log('INVALID EMAIL');
      return;
    }
    let valid =  this.verifyShippingAddress(() => {
      // true callback
      this.setState({
        shippingInfoIsValidated: true, // all info validated only at this point
        invalidShippingAddressError: false
      });
      this.setCheckoutMode('payment');
      console.log('VALID SHIPPING ADDRESS');
    }, () => {
      // false callback
      this.setState({
        shippingInfoIsValidated: false,
        invalidShippingAddressError: true
      });
      console.log('INVALID SHIPPING ADDRESS');
    });
 }

 handlePaymentSuccess() {
   this.completeCheckout();
 }

 handlePaymentFailure() {
   alert('Payment did not complete properly. Please try again.');
 }

  render() {
    return (
      <div className='checkout'>
        <div className='left'>
        {
          this.props.mode == 'shipping' ?
            // SHIPPING
            <div className='formform'>
              <form id='finalform' onSubmit={this.handleShippingSubmit}>
                email*:<br/>
                <input
                  type="text"
                  name="email"
                  value={this.state.ship.email}
                  onChange={this.handleInputChange}/><br/>
                <div className='twofer'>
                  <div className='one'>
                    first name*:<br/>
                    <input
                      type="text"
                      name="firstName"
                      value={this.state.ship.firstName}
                      onChange={this.handleInputChange}/>
                  </div>
                  <div className='two'>
                    last name*:<br/>
                    <input
                      type="text"
                      name="lastName"
                      value={this.state.ship.lastName}
                      onChange={this.handleInputChange}/>
                  </div>
                </div>
                street address*:<br/>
              <input type="text" name="street1"
                  value={this.state.ship.street1}
                  onChange={this.handleInputChange}/><br/>
                address2:<br/>
                <input type="text" name="street2"
                  value={this.state.ship.street2}
                  onChange={this.handleInputChange}/><br/>
                <div className='twofer'>
                  <div className='one'>
                    city*:<br/>
                    <input type="text" name="city"
                      value={this.state.ship.city}
                      onChange={this.handleInputChange}/>
                  </div>
                  <div className='two'>
                    state*:<br/>
                    <input type="text" name="state"
                      value={this.state.ship.state}
                      onChange={this.handleInputChange}/>
                  </div>
                </div>
                <div className='twofer'>
                  <div className='one'>
                    zip code*:<br/>
                    <input type="text" name="zip5"
                      value={this.state.ship.zip5}
                      onChange={this.handleInputChange}/>
                  </div>
                  <div className='two'>
                    country*:<br/>
                    <select value='USA'>
                      <option value='USA'>USA</option>
                    </select>

                  </div>
                </div>
                <input type="submit" style={{display: "none"}} />
              </form>
              {
              this.state.invalidEmailAddressError ?
                <span>The email address you entered is invalid. Please try again.</span> :
              <span></span>
              }
              {
              this.state.invalidShippingAddressError ?
                <span>The shiping address you entered is invalid. Please try again.</span> :
              <span></span>
              }
            </div>
          : // PAYMENT
            <div className='payAndVerify'>
              <div className='shippingVerification'>
                <span className='title'>Make sure this info is correct!</span>
                <br/><br/>
                {
                  Object.keys(this.state.ship).map((a)=> {
                    return this.state.ship[a] ?
                      <div className='bit'>{this.state.ship[a]}</div>
                    :
                      (null)
                  })
                }
              </div>
              <Payment
                amount={this.getTotal()}
                data={this.state.ship}
                buttonRef={this.buttonRef}
                handlePaymentSuccess={this.handlePaymentSuccess}
                handlePaymentFailure={this.handlePaymentFailure}/>
            </div>
        }
        </div>
        <div className='summary'>
          <span className='title'>ORDER SUMMARY</span>
          <div className='bar'>
            <span className='key'>subtotal</span>
            <span className='val'>${this.getSubtotal().toFixed(2)}</span>
          </div>
          <div className='bar'>
            <span className='key'>shipping</span>
            <span className='val'>${this.getShipping().toFixed(2)}</span>
          </div>
          <div className='bar'>
            <span className='key'>total</span>
            <span className='val'>${this.getTotal().toFixed(2)}</span>
          </div>
          <button type='button'
                  ref={this.buttonRef}
                  onClick={this.props.mode == 'shipping' ?
                    this.handleShippingSubmit
                  :
                    this.handlePaymentSubmit
                  }>
            {
              this.props.mode == 'shipping' ?
                "CONTINUE TO PAYMENT"
              :
                'CONFIRM ORDER'
            }
          </button>
        </div>
      </div>
    );
  }
}
export default Checkout
