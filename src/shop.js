'use strict';


const e = React.createElement;

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.onclick = props.onclick;
    this.state = {
      pos: 0
    };
  }

  handleScroll(dir) {
    switch (dir) {
      case "left":
        this.setState({pos: this.state.pos - 400});
        break;
      case "right":
        this.setState({pos: this.state.pos + 400});
        break;
      default:

    }
  }

  render() {
    return (
      <div className='shop'>
        <div className='menu'>
          <div className='shopText shadow'>SHOP</div>
          <div className='bagText shadow'>BAG</div>
        </div>
        <div className='scroller' style={{left: this.state.pos + "px"}}>
          {[1,2,3,4,5].map((i) =>
              <img src='./img/shirtwhite.png' key={i}/>
          )}
        </div>
        <div className='navs'>
          <img className='arrow left' src='./img/arrowleft.png' onClick={() => this.handleScroll("left")}/>
          <img className='arrow right' src='./img/arrowright.png' onClick={() => this.handleScroll("right")}/>
        </div>
      </div>
    );
  }
}
export default Shop
