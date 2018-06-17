import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-bootstrap-date-picker';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

import Services from '../../services/services';
import TypeSpecificParametersForm from './type-specific-parameters-form';

const TypeSpecificParameters = ({changeParameterInput, type_specific_parameters_inputs}) => ({
    render() {
        return (
            <form className="form-horizontal row">
                { 
                    this.props.type_specific_parameters.data.map((v, k )=>(
                        <TypeSpecificParametersForm key={k} value={v} {...this.props} 
                            changeParameterInput={changeParameterInput} 
                            type_specific_parameters_inputs={type_specific_parameters_inputs}
                        />
                    ))
                }
            </form>
        )
    }
});

TypeSpecificParameters.propTypes = {

};

export default TypeSpecificParameters;
