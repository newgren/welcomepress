'use strict';

const e = React.createElement;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.onclick = props.onclick;
  }

  render() {
    return (
      <div className='home'>
        <div>
          <div className='welcome shadow'>welcome</div>
          <div className='press shadow'>PRESS</div>
          <div>
            <button className='shopbutton' onClick={this.props.onclick}>shop</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Home
