import React, { Component } from 'react'
import Scanner from '../components/Scanner'
import { withRouter } from "react-router-dom";
import './barcode.css'
class BarcodeScanner extends Component {
  // state = {
  //   results: [],
  // }

  _scan = () => {
    this.setState({ scanning: !this.state.scanning })
  }

  _onDetected = result => {
    //this.setState({ results: [] })
    //this.setState({ results: this.state.results.concat([result]) })
    this.props.history.push({
      pathname: '/',
      state: result.codeResult.code
    })
  }
 back =()=>{
    this.props.history.push("/");
}
  render() {
    return (
      <div className='body'>
        <div className='back fa fa-arrow-circle-left' onClick={this.back}>  Back</div>
        <div className='camera' >
          <Scanner onDetected={this._onDetected} />
        </div>
      </div>
    )
  }
}

export default withRouter(BarcodeScanner);
