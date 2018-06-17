import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import StackOfStrategyContent from './stack-of-strategy-content';
import Services from '../../services/services';
import LoadingSpin from '../layouts/loading-spin';
import moment from 'moment';

const timeOut = 2000;
var _update_click;

class StackOfStrategy extends Component {
    constructor(props) {
        super(props);
        let get_strategy = this.props.strategies.filter((v, k)=> v.name === this.props.showName);
        let strategy_id = get_strategy.length > 0 ? get_strategy[0].id : 0;
        this.state = {
            strategy_id: strategy_id,
            common_parameters: {
                type: '',
                start_date: moment().format(),
                ccy: '',
                name: '',
            },
            type_specific_parameters_inputs: {},
            type_specific_parameters: undefined,
            strategy: undefined,
            strategies: this.props.strategies,
            type_list: this.props.type_list,
            ccy_list: this.props.ccy_list,
            time_series: undefined,
            time_series_id: strategy_id,
            change_input : false,
            loadPage: false,
        };
        this.closeModalStackOfStrategy = this.closeModalStackOfStrategy.bind(this);
        this.openModalStackOfStrategy = this.openModalStackOfStrategy.bind(this);
        this.componentStrategiesClick = this.componentStrategiesClick.bind(this);
        this.updateButtonChild = this.updateButtonChild.bind(this);

        this.setTypeSpecificParameters = this.setTypeSpecificParameters.bind(this);
        this.changeParameter = this.changeParameter.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.changeParameterInput = this.changeParameterInput.bind(this);
        this._set_has_change_input_child = this._set_has_change_input_child.bind(this);
    }

    componentDidMount() {
        // get Initial Data when go to strategy page
        this.getStrategyDetail();

        // Pressing escape on the root strategy page will return to the list.
        $(document.body).on('keydown', this.goToStrategies);
    }

    getStrategyDetail(){
        let self = this;
        setTimeout(() => {
            // get detail strategy
            if (this.state.strategy_id > 0) {
                Services.strategy_detail(this.state.strategy_id).then((res)=>{
                    if (res.status === 200) {
                        let strategy = this.state.strategy;
                        let strategy_new = {
                            ccy: res.data.ccy,
                            id: res.data.id,
                            name: res.data.name,
                            parameters: res.data.parameters,
                            start_date: res.data.start_date,
                            type: res.data.type
                        }
                        strategy = strategy_new;
                        self.setState({strategy});
                        if (this.state.strategy) {
                            let common_parameters = this.state.common_parameters;
                            common_parameters.type = res.data.type;
                            common_parameters.start_date = moment(res.data.start_date, "DDMMMYYYY").format();
                            common_parameters.ccy = res.data.ccy;
                            common_parameters.name = res.data.name;
                            self.setState({common_parameters});
                            self.setTypeSpecificParameters(res.data.type);
                        }
                        setTimeout(() => {
                            self.setState({time_series:res.data.time_series});
                        }, timeOut);
                    }
                });
            }else{
                let strategy = this.state.strategy;
                strategy = this.props.strategy;
                self.setState({strategy});
                if (this.state.strategy) {
                    self.setTypeSpecificParameters(this.state.strategy.type);
                }
                setTimeout(() => {
                    self.setState({time_series: [[moment().format(), 0]]});
                }, timeOut);
            }
        }, timeOut - 1500);
    }

    // show inputs type-specific parameters show inputs
    setTypeSpecificParameters(value){
        const type_specific_parameters_inputs = this.state.type_specific_parameters_inputs;
        for (var k_obj in type_specific_parameters_inputs) { 
            delete type_specific_parameters_inputs[k_obj];
        }
        Services.type_specific_parameters(value).then((res)=>{
            if (res.status === 200) {
                this.setState({type_specific_parameters:res.data});
                res.data.data.map((v,k)=>{
                    let parameters = this.state.strategy ? this.state.strategy.parameters[v.name] : '';
                    if(v.dependency.length === 0){
                        type_specific_parameters_inputs[v.name] = parameters;
                    }else{
                        // delete type_specific_parameters_inputs[v.name];
                    }
                    this.setState({type_specific_parameters_inputs});
                    if(v.type === 'dropdown'){
                         this.changeParameter(v.name, parameters, 'select', this.state.type_specific_parameters_inputs);
                    }
                });
                
            }
        });
    }

    changeParameter(field, value, localName, type_specific_parameters_inputs){
        // set value input parameter
        type_specific_parameters_inputs[field] = value;
        this.setState({
            type_specific_parameters_inputs
        });

        // check show input
        let arr_type_specific_parameters = this.state.type_specific_parameters.data;
        arr_type_specific_parameters.map((v, k)=>{
            if((v.dependency.indexOf(field) >= 0) ){
                const type_specific_parameters_inputs = this.state.type_specific_parameters_inputs;
                for (var k_obj in v.function) {
                    let parameters = this.state.strategy ? this.state.strategy.parameters[v.name] : '';
                    if (localName === 'input'){
                        if ( parseInt(type_specific_parameters_inputs[k_obj]) > v.function[k_obj]) {
                            type_specific_parameters_inputs[v.name] = parameters;
                        }else{
                            delete type_specific_parameters_inputs[v.name];
                        }
                    }else if (localName === 'select') {
                        if (type_specific_parameters_inputs[k_obj] === v.function[k_obj]) {
                            type_specific_parameters_inputs[v.name] = parameters;
                        }else{
                            delete type_specific_parameters_inputs[v.name];
                        }
                    }
                }
                this.setState({type_specific_parameters_inputs});
            }
        })
    }
    
    changeInput(event, formattedValue) {
        this.setState({change_input: true});
        // set value input 
        let field, value;
        const common_parameters = this.state.common_parameters;
        if (formattedValue) {
            field = 'start_date';
            value = event;
        }else{
            field = event.target.name;
            value = event.target.value;
        }
        common_parameters[field] = value;
        this.setState({common_parameters});

        if(field === 'type'){
            // if(parseInt(value) > 0){
                this.setState({ type_specific_parameters: undefined });
                this.setTypeSpecificParameters(value);
            // }
        }
        this._set_has_change_input_child(event);
    }

    changeParameterInput(e) {
        this.setState({change_input: true});
        const field = e.target.name;
        const value = e.target.value;
        const localName = e.target.localName;
        const type_specific_parameters_inputs = this.state.type_specific_parameters_inputs;

        this.changeParameter(field, value, localName, type_specific_parameters_inputs);
        this._set_has_change_input_child(e);
    }


    _set_has_change_input_child(e){
        this.props._set_has_change_input(this.props.showName, true)
    }

    closeModalStackOfStrategy(e){
        if(this.state.change_input){
            var r = confirm(`Do you want to save?`);
            if (r) {
                alert('save');
            }else{
                alert('cancel');
            }   
        }
        this.props.closeModalStackOfStrategy(e, this.props.showName);
    }

    openModalStackOfStrategy(e){
        this.props.openModalStackOfStrategy(e);
    }

    componentStrategiesClick(e){
        this.props.componentStrategiesClick(e);
    }

    updateButtonChild(e){
        // this.props.updateButton(e);
        let id = e.target.id || 0;
        this.setState({loadPage : true});
        _update_click = Services.update_click(id).done((res)=>{
            res = JSON.parse(res);
            if ('time_series' in res) {
                this.setState({loadPage : false});
                this.setState({time_series: undefined});
                setTimeout(() => {
                    this.setState({time_series:res.time_series});
                    this.setState({time_series_has_update:true});
                }, timeOut);
                if(this.state.strategy){
                    this.props.setTabsNavContentHasChange(this.state.strategy.name);
                }
            }
        })
    }

    render() {
        let styles = {
            content_parent: {
                top: this.props.setTop,
            },
            custom_modal:{
                background: `rgba(255,255,255,.1)`,
            }
        }
        return (
            <StackOfStrategyContent 
                setPaddingTop = {this.props.setPaddingTop}
                setPdTop = {this.props.setPdTop}
                setMgTop = {this.props.setMgTop}
                setLeft = {this.props.setLeft}
                changeInput={this.changeInput} 
                common_parameters={this.state.common_parameters} 
                type_specific_parameters={this.state.type_specific_parameters} 
                changeParameterInput={this.changeParameterInput}
                type_specific_parameters_inputs={this.state.type_specific_parameters_inputs}
                componentStrategiesClick={this.componentStrategiesClick}
                updateButtonChild={this.updateButtonChild}
                {...this.state} {...this.props} 
                strategy={this.state.strategy}
            />
        );
    }
}

StackOfStrategy.propTypes = {

};

export default StackOfStrategy;
