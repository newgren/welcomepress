'use strict';

const e = React.createElement;
const n = <br/>

class StrokeText extends React.Component {
  constructor(props) {
    super(props);
    this.copy = props.copy;
    this.num = props.num;
  }

  componentDidMount() {
    let box = document.getElementById('svg'+this.num);
    let rect = document.getElementById('rect'+this.num)
    let text = document.getElementById('text'+this.num)

    console.log(box.getAttribute('viewBox').split(/\s+|,/)[2]);
    let w = box.getBBox().width;
    let textLength = text.getComputedTextLength();
    console.log('rect: ' + w);
    console.log('text: ' + textLength);

    box.setAttribute('viewBox', '0 -15 ' + w + ' 50');
    rect.setAttribute('width', textLength);
    console.log(text.getComputedTextLength());
  }

  render() {
    return (
      <div className='strokeText'>
        <svg viewBox="0 -15 100 20" id={'svg'+this.num}>
          <rect x='0' y='0' width="100" height="20" id={'rect'+this.num}/>
          <text x='0' y='0' id={'text'+this.num}>{this.copy}</text>
        </svg>
      </div>
    );
  }
}
export default StrokeText
