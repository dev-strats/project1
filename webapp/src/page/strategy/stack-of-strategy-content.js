import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import TimeSeriesChart from './time-series-chart';
import ParametersStrategy from './parameters-strategy';
import TypeSpecificParameters from './type-specific-parameters';
import StatisticsTable from './statistics-table';
import ComponentStrategies from './component-strategies';
import LoadingSpin from '../layouts/loading-spin';
import NewUnderlyingStrategy from './new-underlying-strategy';
import StackOfStrategy from './stack-of-strategy';
import {fifthTextColor, tooltip_data, editStrategyColor, addNewStrategy} from '../../config';
import CustomTooltip from '../layouts/tooltip';


const heightBlock = {
    TimeSeriesChart: 470,
    ParametersStrategy: 245,
}


const StackOfStrategyContent = ({
    changeInput, 
    common_parameters, 
    type_specific_parameters, 
    changeParameterInput, 
    type_specific_parameters_inputs, 
    componentStrategiesClick,
    updateButtonChild
}) => ({
    render() {
        let CommonParameters_id = `CommonParameters_${this.props.tabKey}`;
        let CommonParametersHeight = $(CommonParameters_id).length > 0 ? $(CommonParameters_id)[0].clientHeight : heightBlock.ParametersStrategy;
        let TimeSeriesChartHeight = $('#TimeSeriesChart').length > 0 ? $('#TimeSeriesChart')[0].clientHeight : heightBlock.TimeSeriesChart;
        let styles = {
            TypeSpecificParameters: {
                height: CommonParametersHeight,
                overflow: 'auto',
                paddingTop: '30px',
            },
            containerBox: {
                position: 'relative',
                borderTop : 'none',
            },
            boxName: {
                position: 'absolute',
                top: '-14px',
                left: '0',
                right: '0',
                textAlign: 'center',
                lineHeight: '24px',
                margin: '0',
            },
            boxNameBg: {
                background: '#fff',
                paddingLeft: '15px',
                paddingRight: '15px',
            },
            ComponentStrategies: {
                height: heightBlock.ParametersStrategy + 100,
                overflow: 'auto',
            }
        }
        let setTop = 130;
        let styles_of_strategy = {};
        if (this.props.tabs_nav_content_has_change[this.props.showName]) {
            styles_of_strategy = {
                background: editStrategyColor,
            }
        }
        let disable_button = this.props.strategy && this.props.time_series && this.props.tabs_nav_content_has_change[this.props.showName] ? false : true;
        return (
            <div style={Object.assign(styles.containerBox, styles_of_strategy)}>
                <Row className="show-grid" style={styles_of_strategy}>
                    <Col id="TimeSeriesChart" xs={12} md={8} className="border-right-class p-t-30 p-l-0 p-r-0" style={{minHeight: heightBlock.TimeSeriesChart}}>
                        {
                            !this.props.loadPage ? (this.props.time_series ? <TimeSeriesChart {...this.props} /> : <LoadingSpin center={true}/>) : <TimeSeriesChart {...this.props} />
                        }
                    </Col>
                    <Col xs={12} md={4} className="p-t-30 p-b-20" data-tip data-for='statistics_table'>
                        <CustomTooltip data_tooltip={tooltip_data.statistics_table} id_tooltip={'statistics_table'} />
                        {
                            this.props.time_series ? <StatisticsTable {...this.props} timeSeriesChartHeight={TimeSeriesChartHeight}/> : <LoadingSpin center={true} />
                        }
                    </Col>
                </Row>
                <Row className="show-grid border-top-class">
                    <Col id={CommonParameters_id} xs={12} md={4} className="p-t-30 p-b-15 border-right-class" style={{minHeight: heightBlock.ParametersStrategy}} data-tip data-for='parameters_strategy'>
                        <CustomTooltip data_tooltip={tooltip_data.parameters_strategy} id_tooltip={'parameters_strategy'}/>    
                        { 
                            this.props.type_list && this.props.ccy_list && this.props.strategy? 
                            <ParametersStrategy {...this.props} changeInput={changeInput} common_parameters={common_parameters} /> : <LoadingSpin center={true}/>
                        }
                    </Col>
                    <Col xs={12} md={8} className="scroll-custom p-r-0" style={styles.TypeSpecificParameters} data-tip data-for='type_specific_parameters' >
                        <CustomTooltip data_tooltip={tooltip_data.type_specific_parameters} id_tooltip={'type_specific_parameters'} />
                        { 
                            this.props.type_specific_parameters ? 
                            <TypeSpecificParameters {...this.props} 
                                changeParameterInput={changeParameterInput} 
                                type_specific_parameters_inputs={type_specific_parameters_inputs} 
                            />  : <LoadingSpin center={true}/>
                        }
                    </Col>
                </Row>
                <Row className="show-grid p-b-15 p-t-15 border-top-class aaaa">
                    <Col xs={12} className="scroll-custom" style={styles.ComponentStrategies} data-tip data-for='component_strategies'>
                        <CustomTooltip data_tooltip={tooltip_data.component_strategies} id_tooltip={'component_strategies'}/>
                        {
                            this.props.strategy && this.props.strategies ? 
                            <ComponentStrategies
                                showName = {this.props.showName}
                                time_series_id={this.props.time_series_id} 
                                strategy={this.props.strategy} 
                                strategies={this.props.strategies} 
                                openModalStackOfStrategy={this.props.openModalStackOfStrategy} 
                                componentStrategiesClick={componentStrategiesClick}
                                showNewUnderlyingStrategy={this.props.showNewUnderlyingStrategy} />
                            : <LoadingSpin center={true}/>
                        }
                    </Col>
                </Row>
                <Row className="show-grid p-t-15 p-b-15 border-top-class" >
                    <Col xs={12} className="text-center">
                        <Button bsStyle="primary" id={this.props.strategy ? this.props.strategy.id : 0}
                            className="m-r-30" onClick={updateButtonChild} 
                            disabled={disable_button} 
                            title="Update Button"
                            >Update</Button>
                        <Button bsStyle="success" id={this.props.strategy ? this.props.strategy.id : 0}
                            onClick={updateButtonChild} 
                            disabled={disable_button} 
                            title="Save Button"
                            >Save</Button>
                    </Col>
                </Row>
                <div className={!this.props.loadPage ? 'hidden' : 'loadPage'} onKeyPress={this.props.goToStrategies} >
                    <LoadingSpin center={true}  />
                </div>
            </div>
        )
    }
});

StackOfStrategyContent.propTypes = {

};

export default StackOfStrategyContent;
