'use strict';

const e = React.createElement;
import Sidescroll from './sidescroll.js';

class Work extends React.Component {
  constructor(props) {
    super(props);
    this.goToHome = props.goToHome;
  }

  render() {
    return (
      <div className='work'>
        <div className='workLeft'>
          <Sidescroll/>
        </div>
        <div className='workRight'>
          <div className='banner'>
            <img src='./iconImages/banner_left_desktop.png'
                 id='leftBannerIcon'
                 onClick={() => this.goToHome()} />
            <img src='./iconImages/WORK.png' id='shopBannerText' />
          </div>
          <div className='workSlides'>
            <a href='https://usontheb.us/' target='_blank'>
              <img src='./workCaps/usonthebus.png'/>
            </a>
          </div>
        </div>


      </div>
    );
  }
}
export default Work
