import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

const CustomTooltip = (props) => ({
    render() {
        return (
			<ReactTooltip id={props.id_tooltip} aria-haspopup='true' role='example'>
                {props.data_tooltip}
            </ReactTooltip>
		)
    }
});

CustomTooltip.propTypes = {
	center: false,
};

CustomTooltip.propTypes = {
    center: PropTypes.bool,
};

export default CustomTooltip;
