'use strict';

const e = React.createElement;

class Completed extends React.Component {
  constructor(props) {
    super(props);
    this.goToHome = props.goToHome;
  }

  render() {
    return (
      <div className='completed'>
        <div>THANKS!</div>
          <button onClick={this.goToHome}>CLICK FOR MORE WELCOME PRESS</button>
        <div>we emailed you your receipt & we’ll ship your order out as soon as we can. </div>
      </div>
    );
  }
}
export default Completed
