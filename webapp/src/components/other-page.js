import React, { Component } from 'react'

class OtherPage extends Component {
  state = { signedOut: false}
  render() {
  	const { location, pattern, pathname, isExact, isAutorized, router } = this.props
    const { signedOut } = this.state
    return (
      <div className="container app-containe">
        <div className="bg-fff p-30">
          <h1 className="text-capitalize">Wellcome to {location.pathname.split("/").pop()} </h1>
        </div>
      </div>
      )
  }
}

OtherPage.defaultProps = {
    titlePage: 'Other Page',
    topTitlePage: 'Other Page',
};

export default OtherPage
