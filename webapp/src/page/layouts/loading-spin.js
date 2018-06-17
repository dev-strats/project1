import React, { PropTypes } from 'react';

const LoadingSpin = (props) => ({
    render() {
        return (
			<div className={props.center ? 'spin-center' : ''} style={{fontWeight: 'normal'}}>
				<i className="zmdi zmdi-spinner zmdi-hc-spin zmdi-hc-fw"></i> Loading data...
			</div>
		)
    }
});

LoadingSpin.propTypes = {
	center: false,
};

LoadingSpin.propTypes = {
    center: PropTypes.bool,
};

export default LoadingSpin;
