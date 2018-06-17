import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-bootstrap-date-picker';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const TypeSpecificParametersForm = ({value, changeParameterInput, type_specific_parameters_inputs}) => ({
    render() {
        let title = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
        if (value.name in type_specific_parameters_inputs) {
            if (value.type === 'dropdown') {
                return (
                    <FormGroup className="col-xs-12 col-md-6 p-0 row">
                        <ControlLabel className="col-xs-12 col-md-6 text-left p-l-0">{value.view_name}</ControlLabel>
                        <div className="col-xs-12 col-md-6 p-l-0">
                            <FormControl componentClass="select" 
                                placeholder={`Select ${value.view_name}`} 
                                name={value.name} 
                                value={type_specific_parameters_inputs[value.name]}
                                onChange={changeParameterInput}
                                className="text-capitalize"
                                title={title}
                            >
                                <option value="select">Select</option>
                                { 
                                    value.value.map((v, k) => (
                                        <option value={v} key={k} >{v}</option>
                                    ))
                                }
                            </FormControl>
                        </div>
                    </FormGroup>
                )
            }
            return (
                <FormGroup className="col-xs-12 col-md-6 p-0 row">
                    <ControlLabel className="col-xs-12 col-md-6 text-left p-l-0" >{value.view_name}</ControlLabel>
                    <div className="col-xs-12 col-md-6 p-l-0">
                        <FormControl type={ value.type === 'string' ? 'text' : 'number'}
                            placeholder={`Enter ${value.view_name}`}
                            name={value.name} 
                            value={type_specific_parameters_inputs[value.name]}
                            onChange={changeParameterInput} 
                            title={title}
                        />
                    </div>
                </FormGroup>
            )
        }else{
            return (null)
        }
    }
});

TypeSpecificParametersForm.propTypes = {

};

export default TypeSpecificParametersForm;
