'use strict';

const e = React.createElement;
const server = '178.128.145.7';
const port = '3000';

class Payment extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var submitButton = document.querySelector('#submit-button');

      braintree.dropin.create({
        authorization: 'sandbox_48psd8gz_36dbhbmvhvv9cpjd',
        container: '#dropin-container',
        paypal: {
          flow: 'vault'
        },
        venmo: {}
      }, (err, dropinInstance) => {
        if (err) {
          // Handle any errors that might've occurred when creating Drop-in
          console.error(err);
          return;
        }
        submitButton.addEventListener('click', () => {
          dropinInstance.requestPaymentMethod(function (err, payload) {
            if (err) {
              // Handle errors in requesting payment method
              console.log("requestPaymentMethodError: " + err);
            }

            // Send payload.nonce to your server
            let params = payload;//payload.nonce;
            console.log(params);


            const Http = new XMLHttpRequest();
            const url='https://' +server +':'+port+'/checkout';
            Http.open("POST", url);
            // Http.setRequestHeader("Access-Control-Allow-Origin", "*");
            // Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            Http.send(JSON.stringify(params));
            Http.onreadystatechange = (e) => {
              console.log(Http.responseText);
            }
          });
        });
      });
  }

  render() {
    return (
      <div className='payment'>
        <div id="dropin-container"></div>
        <button id="submit-button">Request payment method</button>
      </div>
    );
  }
}
export default Payment
