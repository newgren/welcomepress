'use strict';

import Item from './item.js'
import OutsideAlerter from './OutsideAlerter.js'

const e = React.createElement;

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: 0,
      sel: -1
    };
  }

  blinkArrow() {
    alert("end of the line");
  }

  canGoLeft() {
    return this.state.pos < 0;
  }

  canGoRight() {
    return this.state.pos > 5 * -400;
  }

  handleScroll(dir) {
    let pos = this.state.pos;
    switch (dir) {
      case "left":
        this.canGoLeft() ? this.setState({pos: pos + 400}) : this.blinkArrow();
        break;
      case "right":
        this.canGoRight() ? this.setState({pos: pos - 400}) : this.blinkArrow();
        break;
      default:
    }
  }



  render() {

    return (
      <div>
        <div className='shop'>
          <div className='menu'>
            <div className='shopText shadow'>SHOP</div>
            <div className='bagText shadow'>BAG</div>
          </div>
          <div className='scroller' style={{left: this.state.pos + "px"}}>
            {[0,1,2,3,4].map((i) =>
                <img src='./img/shirtwhite.png' onClick={() => this.setState({sel: i})} key={i}/>
            )}
          </div>
          <div className='navs'>
            <img className='arrow left' src='./img/arrowleft.png'
              style={{display: this.canGoLeft() ? "initial" : "none"}}
              onClick={() => this.handleScroll("left")}/>
            <img className='arrow right' src='./img/arrowright.png'
              style={{display: this.canGoRight() ? "initial" : "none"}}
              onClick={() => this.handleScroll("right")}/>
          </div>
        </div>
        <div className='itemFrame'>
          {this.state.sel > -1 ? <Item no={this.state.sel}/> : <p></p>}
        </div>
        <div className='back'>
          {this.state.sel > -1 ? <button onClick={() => this.setState({sel:-1})}>GOBACK</button> : <br/>}
        </div>
      </div>
    );
  }
}
export default Shop
