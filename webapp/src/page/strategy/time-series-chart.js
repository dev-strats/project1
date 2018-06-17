import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import { convertToTimeStamp, hightChatStockConfig, editStrategyColor } from '../../config';

class TimeSeriesChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time_series: this.props.time_series,
        }
    }

    componentWillUpdate(nextProps, nextState) {
        let arr1 = nextState.time_series
        let arr2 = nextProps.time_series
        if(nextState.time_series !== nextProps.time_series){
            let chart = this.refs.chart.getChart();
            chart.series[0].setData(convertToTimeStamp(nextProps.time_series))
        }
        if (nextProps.tabs_nav_content_has_change[nextProps.strategy.name]) {
            let chart = this.refs.chart.getChart();
            chart.options.chart.backgroundColor = editStrategyColor;
        }
    }
    
    render() {
        let data = convertToTimeStamp(this.state.time_series);
        hightChatStockConfig.series[0].data = data;
        return (
            <div className="p-b-20" style={{paddingLeft: '5px'}}>
                <ReactHighstock config={hightChatStockConfig} neverReflow={true} ref="chart"/>
            </div>
        )
    }
};

TimeSeriesChart.propTypes = {

};

export default TimeSeriesChart;
