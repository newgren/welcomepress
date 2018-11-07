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
            <div className='slide'>
              <a href='https://usontheb.us/' target='_blank'>
                <div>
                  <img src='./workCaps/usonthebus.png'/>
                </div>
              </a>
            </div>
            <div className='slide'>
              <a href='https://usontheb.us/' target='_blank'>
                <div>
                  <img src='./workCaps/usonthebus.png'/>
                </div>
              </a>
            </div>
          </div>
          <div className='text'>
            <h1>Want a website? Here's what we offer</h1>
            <ul>
              <li>web/graphic design (read: whole site including logos, etc.)</li>
              <li>site development and maintenence (read: <span>code</span>)</li>
              <li>analytics</li>
              <li>store integration</li>
              <li>whatever else you can imagine</li>
            </ul>
          </div>

        </div>


      </div>
    );
  }
}
export default Work
