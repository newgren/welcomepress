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
          <div className='workList'>
            <ul>
              <li><a target="_blank" href='https://usontheb.us'>usontheb.us</a></li>
              <li><a target="_blank" href='https://welcomepress.xyz'>welcomepress.xyz</a></li>
            </ul>
          </div>
        </div>
        <div className='workBottom'>
          <div>work with us.</div>
          <div id='mailto'><a href='mailto:hello@welcomepress.xyz'>hello@welcomepress.xyz</a></div>
        </div>
      </div>
    );
  }
}
export default Work
