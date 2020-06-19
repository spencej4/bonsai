import React, {Component} from 'react';

class Landing extends Component   {

  componentDidMount() {
    this.props.scrollWindow();
  }


  render () {
      return (
        <div className='content-wrap'>
            <div className='landing'>
                {/* owns background image */}
                <div className='landing-overlay'>
                    <div className='landing-message'>
                        <div className='landing-logo'>
                            <h1 className='landing-logo'>Bonsai</h1>
                        </div>
                        <div className='landing-text'>
                            <p>Sartorial literally wayfarers chambray fixie intelligentsia
                                <br></br>
                                Single-origin coffee mixtape leggings.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
  }
}

export default Landing