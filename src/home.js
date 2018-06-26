'use strict';

const e = React.createElement;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shitemode: false
    };
  }

  render() {
    return (
      <div class='home'>
        <div>
          <div class='welcome'>welcome</div>
          <div class='press' onClick= {
            () => this.setState({shitemode: true})
          }>PRESS</div>
        </div>
      </div>
    );
  }
}
export default Home
