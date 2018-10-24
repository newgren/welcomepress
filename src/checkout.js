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
    this.state = {
      mode: 'shipping' // 'shipping' | 'payment'
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

      // TODO: get shipping price from returned XML
    return 2.05;
  }

  getTotal() {
    return this.getSubtotal() + this.getShipping();
  }

  render() {
    return (
      <div className='checkout'>
        <div className='left'>
        {
          this.state.mode == 'shipping' ?
            // SHIPPING
            <div className='formform'>
              <form id='finalform'>
                email*:<br/>
                <input type="text" name="email"/><br/>
                <div className='twofer'>
                  <div className='one'>
                    first name*:<br/>
                    <input type="text" name="firstname"/>
                  </div>
                  <div className='two'>
                    last name*:<br/>
                    <input type="text" name="lastname"/>
                  </div>
                </div>
                street address*:<br/>
                <input type="text" name="streetaddress"/><br/>
                address2:<br/>
                <input type="text" name="streetaddress2"/><br/>
                <div className='twofer'>
                  <div className='one'>
                    city*:<br/>
                    <input type="text" name="city"/>
                  </div>
                  <div className='two'>
                    state*:<br/>
                    <input type="text" name="state"/>
                  </div>
                </div>
                <div className='twofer'>
                  <div className='one'>
                    zip code*:<br/>
                    <input type="text" name="zip"/>
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
                  onClick={()=> {
                    let data = new FormData(document.getElementById('finalform'));
                    console.log(data.get('email'));
                    let currentMode = this.state.mode;
                    console.log(currentMode);
                    this.setState({mode: 'payment'});
                  }}>
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
