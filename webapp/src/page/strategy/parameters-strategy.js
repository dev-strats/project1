import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-bootstrap-date-picker';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

import Services from '../../services/services';

const ParametersStrategy = ({changeInput, common_parameters}) => ({
    render() {
        let title = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
        return (
            <form className="form-horizontal row">
                <FormGroup controlId="common_parameters_type" className="row" >
                    <ControlLabel className="col-xs-12 col-md-3 p-l-0 p-r-0 text-left" >Type</ControlLabel>
                    <div className="col-xs-12 col-md-9 p-0">
                        <FormControl componentClass="select" placeholder="Select Type" onChange={changeInput} name="type" value={common_parameters.type} title={title}>
                            { 
                                this.props.type_list.map((v, k) => (
                                    <option value={v.name} key={k}>{v.name}</option>
                                ))
                            }
                        </FormControl>
                    </div>
                </FormGroup>
                <FormGroup controlId="common_parameters_start_date" className="row" >
                    <ControlLabel className="col-xs-12 col-md-3 p-l-0 p-r-0 text-left" >Start Date</ControlLabel>
                    <div className="col-xs-12 col-md-9 p-0"  title={title}>
                        <DatePicker id="common_parameters_start_date" name="start_date" showClearButton={false} onChange={changeInput} value={common_parameters.start_date}/>
                    </div>
                </FormGroup>
                <FormGroup controlId="common_parameters_ccy" className="row" >
                    <ControlLabel className="col-xs-12 col-md-3 p-l-0 p-r-0 text-left" >Ccy</ControlLabel>
                    <div className="col-xs-12 col-md-9 p-0">
                        <FormControl componentClass="select" placeholder="Select Ccy" name="ccy" onChange={changeInput} value={common_parameters.ccy} title={title}>
                            { 
                                this.props.ccy_list.map((v, k) => (
                                    <option value={v.name} key={k}>{v.name}</option>
                                ))
                            }
                        </FormControl>
                    </div>
                </FormGroup>
                <FormGroup controlId="common_parameters_name" className="row" >
                    <ControlLabel className="col-xs-12 col-md-3 p-l-0 p-r-0 text-left" >Name</ControlLabel>
                    <div className="col-xs-12 col-md-9 p-0">
                        <FormControl type="text" placeholder="Enter Name" name="name" value={common_parameters.name}  onChange={changeInput} title={title} />
                    </div>
                </FormGroup>
            </form>
        )
    }
});

ParametersStrategy.propTypes = {

};

export default ParametersStrategy;
