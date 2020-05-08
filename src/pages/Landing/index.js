import React, {Component} from 'react';

class Landing extends Component   {
//   constructor(props) {
//     super(props);
//     this.state = {
//         isMobileDevice: false
//     } 
//   }

//   componentWillMount() {
//     if ((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)){
//       // console.log('this is a mobile device');
//       this.setState({
//         isMobileDevice: true
//       })
//     }else {
//       // console.log('this is a desktop');
//       this.setState({
//         isMobileDevice: false
//       })
//     }
//   }


  render () {
      return (
          <div className='landing'>
              {/* owns background image */}
            <div className='landing-overlay'>
                <div className='landing-message'>
                <div className='landing-logo'>
                    <h1 className='landing-logo'>Bonsai</h1>
                </div>
                <div className='landing-text'>
                    <p>Microdosing literally air plant fixie intelligentsia
                        <br></br>
                        Powered by your imagination.</p>
                </div>
                <div className='landing-footer'>
                    <p className='copyright-symbol'>©<p></p> Copyright 2020 Spencer Jack</p>
                </div>
                </div>
          </div>
        </div>
      )
  }
}

export default Landing