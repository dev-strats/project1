import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import LoadingSpin from '../layouts/loading-spin';
import ParametersStrategy from './parameters-strategy';
import {fifthTextColor} from '../../config';
import TypeSpecificParameters from './type-specific-parameters';
import moment from 'moment';
import StatisticsTable from './statistics-table';
import TimeSeriesChart from './time-series-chart';
import ComponentStrategies from './component-strategies';


const heightBlock = {
    TimeSeriesChart: 470,
    ParametersStrategy: 245,
}


class NewUnderlyingStrategy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            common_parameters: {
                type: '',
                start_date: moment().format(),
                ccy: '',
                name: '',
            },
            time_series: [[moment().format(), 0]],
        };
    }

    componentDidMount() {

    }

    componentWillUpdate(nextProps, nextState){
        if(nextProps.time_series_has_update){
            this.setState({time_series: nextProps.time_series});
            this.props.timeSeriesHasUpdate();
        }
    }

    updateButton(e){
        this.props.updateButton(e);
    }

    closeNewUnderlyingStrategy(e){
        this.props.closeNewUnderlyingStrategy(e);
    }

    render() {
        let CommonParametersHeight = $('#CommonParameters1').length > 0 ? $('#CommonParameters1')[0].clientHeight : heightBlock.ParametersStrategy;
        let TimeSeriesChartHeight = $('#TimeSeriesChart').length > 0 ? $('#TimeSeriesChart')[0].clientHeight : heightBlock.TimeSeriesChart;
        let styles = {
            TypeSpecificParameters: {
                height: CommonParametersHeight,
                overflow: 'auto',
                paddingTop: '30px',
            },
            containerBox: {
                border: `2px solid ${fifthTextColor}`,
                position: 'relative',
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
            },
            content_parent: {
                top: 130,
            },
        }
        let setTop = 130;
        return (
            <Modal
                  show={this.props.showNewUnderlyingStrategy}
                  onHide={this.closeNewUnderlyingStrategy.bind(this)}
                  className="addNewUnderlying container"
                >
                <Modal.Header closeButton >
                    <Modal.Title>New Underlying Strategy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="">
                        <Row className="show-grid">
                            <Col id="TimeSeriesChart" xs={12} md={8} className="border-right-class p-t-30 p-l-0 p-r-0" style={{minHeight: heightBlock.TimeSeriesChart}}>
                                <div className="p-l-15 p-r-15">
                                    {
                                        !this.props.loadPage ? (this.props.time_series ? <TimeSeriesChart time_series={this.state.time_series} /> : <LoadingSpin center={true}/>) : 
                                            <TimeSeriesChart time_series={this.state.time_series} />
                                    }
                                </div>
                            </Col>
                            <Col xs={12} md={4} className="p-t-30 p-b-20">
                                {
                                    this.props.time_series ? <StatisticsTable time_series={this.state.time_series} timeSeriesChartHeight={TimeSeriesChartHeight}/> : <LoadingSpin center={true} />
                                }
                            </Col>
                        </Row>
                        <Row className="show-grid border-top-class">
                            <Col id="CommonParameters1" xs={12} md={4} className="p-t-30 p-b-15 border-right-class" style={{minHeight: heightBlock.ParametersStrategy}}>
                                { 
                                    this.props.type_list && this.props.ccy_list ? 
                                    <ParametersStrategy {...this.props} changeInput={this.props.changeInput} common_parameters={this.state.common_parameters} /> : <LoadingSpin center={true}/>
                                }
                            </Col>
                            <Col xs={12} md={8} className="scroll-custom p-r-0" style={styles.TypeSpecificParameters} >
                                { 
                                    this.props.type_specific_parameters ? 
                                    <TypeSpecificParameters {...this.props} 
                                        changeParameterInput={this.props.changeParameterInput} 
                                        type_specific_parameters_inputs={this.props.type_specific_parameters_inputs} 
                                    />  : <LoadingSpin center={true}/>
                                }
                            </Col>
                        </Row>
                        <Row className="show-grid p-b-15 p-t-15 border-top-class aaaa">
                            <Col xs={12} className="scroll-custom" style={styles.ComponentStrategies}>
                                {
                                    this.props.strategy && this.props.strategies ? 
                                    <ComponentStrategies
                                        time_series_id={this.props.time_series_id} 
                                        strategy={this.props.strategy} 
                                        strategies={this.props.strategies} 
                                        openModalStackOfStrategy={this.props.openModalStackOfStrategy} 
                                        componentStrategiesClick={this.props.componentStrategiesClick} />
                                    : <LoadingSpin center={true}/>
                                }
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.updateButton.bind(this)} bsStyle="success" className="m-r-30" id={this.props.time_series_id}>Save</Button>
                    <Button onClick={this.closeNewUnderlyingStrategy.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

NewUnderlyingStrategy.propTypes = {

};

export default NewUnderlyingStrategy;
