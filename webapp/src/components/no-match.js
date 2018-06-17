import React, { Component } from 'react'

const styles = {
	page: {
		padding: '10% 0'
	},
	title: {
		fontWeight: 'bolder',
		fontSize: '500%',
	}
}

export default class NoMatch extends Component {
  render() {
    return (
      <div className="row" style={styles.page}>
      	<div className="col-md-1 col-md-offset-3 text-center">
      		<div style={styles.title}>404</div>
      		<div>Not Found</div>
      	</div>
      	<div className="col-md-5">
        	<h2>Sorry no content available at <br/><strong>{this.props.location.pathname}</strong></h2>
        </div>
      </div>
    )
  }
}