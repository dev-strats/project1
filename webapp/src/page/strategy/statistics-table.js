import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, colSpan } from 'react-bootstrap';
import moment from 'moment';
import ReactDOM from 'react-dom';
import Services from '../../services/services';
import LoadingSpin from '../layouts/loading-spin';

class StatisticsTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let styles = {
            StatisticsTable: {
                height: this.props.timeSeriesChartHeight - 50,
                overflow: 'auto',
            },
        }
        let data = [
            {name: 'Annual Return', value: 0},
            {name: 'Volatility', value: 0},
            {name: 'Sharp Ratio', value: 0},
            {name: 'Maximum Drawdown', value: 0},
            {name: 'Best month', value: 0},
            {name: 'Worst month', value: 0},
        ]
        
        let point = this.props.time_series.map((v, k) => v[1]);
        // sum time series
        let sum = point.reduce((previous, current) => current += previous);
        let avg = sum / point.length;

        // Annual Return
        let Annual_Return = Math.ceil(avg * 252);
        data[0]['value'] = Annual_Return;

        // Volatility
        let Volatility = Math.ceil(avg * Math.sqrt(252));
        data[1]['value'] = Volatility;

        // Sharp Ratio
        let Sharp_Ratio = Math.ceil(Annual_Return / Volatility);
        data[2]['value'] = Sharp_Ratio || 0;
        
        // Maximum Drawdown
        let diff = point.map((v,k)=>{
            let next = k < (point.length - 1) ? point[k + 1] : k;
            return Math.ceil(v - next);
        });
        let Maximum_Drawdown = Math.max(...diff);
        data[3]['value'] = Maximum_Drawdown;

        var items_of_month = [], m, y ;
        this.props.time_series.map((v, k) => {
            m = parseInt(moment(v[0]).format("MM"));
            y = moment(v[0]).year();
            let a = items_of_month.filter((v,k)=> { return v.m === m && v.y === y });
            let obj = {m: m, y: y, v: 0};
            if(a.length > 0){
                a[0].v += Math.ceil(v[1]);
            }else{
                items_of_month.push(obj)
            }
        });
        // Best month
        let Best_month = Math.max(...items_of_month.map((v,k)=>v.v));
        data[4]['value'] = Best_month;

        // Worst month
        let Worst_month = Math.min(...items_of_month.map((v,k)=>v.v));
        data[5]['value'] = Worst_month;
        return (
            <div className="scroll-custom">
                <Table responsive striped={false} hover={false}>
                    <tbody>
                        { 
                            data.map((v, k)=>(
                                <tr key={k}>
                                    <td>{v.name}</td>
                                    <td><strong>{v.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
};

StatisticsTable.propTypes = {

};

export default StatisticsTable;
