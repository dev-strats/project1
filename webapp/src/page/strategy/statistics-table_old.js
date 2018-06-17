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
        this.state = {
            time_series: this.props.time_series,
            data: [],
            hasMoreItems: true,
            nextPage: 1,
            itemPerPage: 20,
        }
        this.getDataTable = this.getDataTable.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.getDataTable(this.state);
        const list = ReactDOM.findDOMNode(this.refs.listStaticTable)
        list.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        const list = ReactDOM.findDOMNode(this.refs.listStaticTable)
        list.removeEventListener('scroll', this.handleScroll);
    }

    componentWillUpdate(nextProps, nextState) {
        let arr1 = nextState.time_series
        let arr2 = nextProps.time_series
        if(arr1 !== arr2){
            let state = this.state;
            state.time_series = arr2;
            state.data = [];
            state.hasMoreItems = true;
            state.nextPage = 1;
            state.itemPerPage = 20;
            this.setState({state});
            this.getDataTable(this.state);
        }
    }

    handleScroll(e) {
        let scrollHeight = e.target.scrollHeight;
        let scrollTop = Math.ceil(e.target.scrollTop + e.target.offsetHeight);
        if (scrollHeight === scrollTop){
            this.getDataTable(this.state);
        }
    }

    getDataTable(data){
        let self = this;
        Services.load_more_time_series(data).then((res) => {
            if (res.status == 1) {
                setTimeout(() => {
                    let state = self.state;
                    state.data = state.data.concat(res.data);
                    state.hasMoreItems = res.hasMoreItems;
                    state.nextPage = res.nextPage;
                    state.itemPerPage = res.itemPerPage;
                    self.setState({state});
                }, 1000);
            }
        });
    }

    render() {
        let styles = {
            StatisticsTable: {
                height: this.props.timeSeriesChartHeight - 40,
                overflow: 'auto',
            },
        }
        var rows = [];
        this.state.data.forEach(function(v, k) {
            rows.push(
                <tr key={k}>
                    <td>{moment(v[0]).format("ddd, MMM DD YYYY")}</td>
                    <td>{v[1]}</td>
                </tr>
            )
        });
        if(this.state.time_series.length > this.state.itemPerPage){
            rows.push(
                <tr key={this.state.data.length}>
                    <td colSpan="2"><LoadingSpin/></td>
                </tr>
            )
        }
        return (
            <div style={styles.StatisticsTable} className="scroll-custom" ref="listStaticTable">
                <Table responsive striped={true} hover={true}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Series</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </div>
        )
    }
};

StatisticsTable.propTypes = {

};

export default StatisticsTable;
