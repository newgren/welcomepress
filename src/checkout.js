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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      mode: 'shipping', // 'shipping' | 'payment'
      addressVerificationError: false,
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

  async verifyAddress() {
    let userid = "711WELCO2258"; //"[userid]";
    let url = `http://production.shippingapis.com/ShippingAPITest.dll\
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
      console.log(http.status);
      if(http.readyState === 4 && http.status === 200) {
        let xml = http.responseXML;
        let valid = xml.getElementsByTagName("Error").length === 0;
        console.log('valid: ' + valid);
        return true;
      } else {
        return false;
      }
    }
    return false;
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


  handleSubmit(event) {
    event.preventDefault();
    let valid = await this.verifyAddress();
    if(valid) {
      console.log(this.state.ship);
      this.setState({addressVerificationError: false});
      this.setState({mode: 'payment'});
    } else {
      console.log('Invalid Address');
    }
 }

  render() {
    return (
      <div className='checkout'>
        <div className='left'>
        {
          this.state.mode == 'shipping' ?
            // SHIPPING
            <div className='formform'>
              <form id='finalform' onSubmit={this.handleSubmit}>
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
              </form>
            </div>
          : // PAYMENT
            <Payment buttonRef={this.buttonRef}/>
        }
        </div>
        <div className='summary'>
          <span className='title'>ORDER SUMMARY</span>
          <div className='bar'>
            <span className='key'>subtotal</span>
            <span className='val'>${this.getSubtotal()}</span>
          </div>
          <div className='bar'>
            <span className='key'>shipping</span>
            <span className='val'>${this.getShipping()}</span>
          </div>
          <div className='bar'>
            <span className='key'>total</span>
            <span className='val'>${this.getTotal()}</span>
          </div>
          <button type='button'
                  ref={this.buttonRef}
                  onClick={this.handleSubmit}>
            {
              this.state.mode == 'shipping' ?
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
