'use strict';

const e = React.createElement;
const server = 'welcomepresspayment.tk';
const port = '443';
var dropinInstance;

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.amount = props.amount;
    this.data = props.data;
    this.buttonRef = props.buttonRef;
    this.handlePaymentSuccess = props.handlePaymentSuccess;
    this.handlePaymentFailure = props.handlePaymentFailure;

  }

  componentDidMount() {
      braintree.dropin.create({
        authorization: 'sandbox_48psd8gz_36dbhbmvhvv9cpjd',
        container: '#dropin-container',
        paypal: {
          flow: 'vault'
        },
        venmo: {}
      }, (err, instance) => {
        if (err) {
          // Handle any errors that might've occurred when creating Drop-in
          console.error(err);
          return;
        }
        dropinInstance = instance;
      });
  }

  render() {
    var submitButton = this.buttonRef.current;
    submitButton.addEventListener('click', () => {
      dropinInstance.requestPaymentMethod((err, payload) => {
        if (err) {
          // Handle errors in requesting payment method
          console.log("requestPaymentMethodError: " + err);
        }

        // Send payload.nonce to your server
        let params = {
          amount: this.amount,
          nonce: payload.nonce,
          email: this.data.email,
          firstName: this.data.firstName,
          lastName: this.data.lastName,
          street1: this.data.street1,
          street2: this.data.street2,
          city: this.data.city,
          state: this.data.state,
          zip5: this.data.zip5,
          country: this.data.country
        }
        //let params = payload.nonce;
        console.log(params);

        const req = new XMLHttpRequest();
        const url='https://' +server +':'+port+'/checkout';
        req.open("POST", url);
        // req.setRequestHeader("Access-Control-Allow-Origin", "*");
        // req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify(params));
        req.onreadystatechange = (e) => {
          if(req.readyState === 4) {
            if(req.status === 200) {
              console.log('GOOD transaction');
              this.handlePaymentSuccess();
            } else {
              this.handlePaymentFailure();
              console.log('BAD transaction');
            }
          }
        }
      });
    });
    return (
      <div className='payment'>
        <div id="dropin-container"></div>
      </div>
    );
  }
}
export default Payment
