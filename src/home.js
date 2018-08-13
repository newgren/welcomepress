'use strict';

const e = React.createElement;

import Countdown from './countdown.js'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.onclick = props.onclick;
  }

  render() {
    return (
      <div className='home center'>
        <div>
          <div className='welcomePRESS'>
            <div className='welcome shadow'>welcome</div>
            <div className='press shadow'>PRESS</div>
          </div>
          <div className='adjuster'>
            <Countdown/>
            <button className='shopbutton disabled' onClick={
            () => {alert("getgot"); alert("fr just come back later")}
            /*this.props.onclick*/
            }>shop</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Home
