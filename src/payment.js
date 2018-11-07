'use strict';

const e = React.createElement;
const server = 'welcomepresspayment.tk';
const port = '443';
var dropinInstance;
let braintreeErrorMessage = 'Something went wrong :/ Try refreshing the page.';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.amount = props.amount;
    this.cart = props.cart;
    this.shipData = props.shipData;
    this.billData = props.billData;
    // props has payment loaded (from checkout state)
    this.setButtonEnabled = props.setButtonEnabled;
    this.handlePaymentSuccess = props.handlePaymentSuccess;
    this.handlePaymentFailure = props.handlePaymentFailure;
    this.finalClick = props.finalClick;
    this.flipFinalClick = props.flipFinalClick;
    this.state = {
      selfLoaded: false
    }
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
          // alert(braintreeErrorMessage);
          return;
        }
        this.setButtonEnabled(true);
        this.setState({selfLoaded: true});
        this.displayDropin();
        console.log("loaded braintree dropin");
        dropinInstance = instance;
      });
  }

  displayDropin() {
    document.getElementById('dropin-container').style.display = 'inherit';
  }

  hideDropin() {
    document.getElementById('dropin-container').style.display = 'none';
  }

  componentDidUpdate(prevProps, prevState) {
    // onclick for final checkout button
    if(this.props.finalClick === true) {
      // prevents spamming
      this.setButtonEnabled(false);
      this.hideDropin();
      this.setState({selfLoaded: false});


      this.flipFinalClick();
      console.log('transaction initiated');

      // deactivate button
      dropinInstance.requestPaymentMethod((err, payload) => {
        if(err) {
          // Handle errors in requesting payment method
          if(err == 'DropinError: No payment method is available.') {
            alert('Please enter your payment information.');
          } else {
            alert('An unknown error occured. Please try again.');
          }
          console.log("requestPaymentMethodError: " + err);
          return;
        }

        let shipObj = {
          firstName: this.shipData.firstName,
          lastName: this.shipData.lastName,
          street1: this.shipData.street1,
          street2: this.shipData.street2,
          city: this.shipData.city,
          state: this.shipData.state,
          zip5: this.shipData.zip5,
          country: this.shipData.country
        };

        let params = {
          amount: this.amount,
          cart: this.cart,
          nonce: payload.nonce,
          email: this.shipData.email,
          ship: shipObj,
          bill: this.billData ? {
            firstName: this.billData.firstName,
            lastName: this.billData.lastName,
            street1: this.billData.street1,
            street2: this.billData.street2,
            city: this.billData.city,
            state: this.billData.state,
            zip5: this.billData.zip5,
            country: this.billData.country
          } :
          shipObj // use shipping if no seperate billing info
        };

        const req = new XMLHttpRequest();
        const url='https://' + server + ':' + port + '/checkout';
        req.open("POST", url);
        req.send(JSON.stringify(params));
        req.onreadystatechange = (e) => {
          if(req.readyState === 4) {
            this.setButtonEnabled(true);
            this.displayDropin();
            this.setState({selfLoaded: true});
            if(req.status === 200) {
              console.log('GOOD transaction');
              this.handlePaymentSuccess();
            } else {
              console.log('BAD transaction');
              this.handlePaymentFailure();
            }
          }
        }
      });
    }
  }

  componentWillUnmount() {
    // this is important, so we don't lock the button!
    this.setButtonEnabled(true);
  }

  render() {
    return (
      <div className='payment'>
        <div id='choosePay'>choose a way to pay</div>
        <div id="dropin-container"></div>
        {
          this.state.selfLoaded ? (null)
            : <div id='loadingBox'>
                <img src='./logos/loading.gif'></img>
              </div>
        }
      </div>
    );
  }
}
export default Payment
