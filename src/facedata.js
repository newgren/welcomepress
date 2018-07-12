'use strict';

const e = React.createElement;



class Facedata extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  render() {
      return this.state.posts.join('');
  }
}

const domContainer = document.querySelector('#facedata_container');
ReactDOM.render(e(Facedata), domContainer);
