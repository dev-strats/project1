import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Collapse, Well, colSpan } from 'react-bootstrap';
import moment from 'moment';


const styles = {
    ComponentStrategies: {
        height: '300px',
        overflow: 'auto',
    }
}

const ComponentStrategiesTable = ({value, componentStrategiesClick}) => ({
    toggleStrategies(e){
        $(`.toggle_strategies_${value.id}`).toggle("fast");
        if(e.target.className === 'fa fa-plus'){
            $(e.target).removeClass('fa-plus');
            $(e.target).addClass('fa-minus');
        }else{
            $(e.target).removeClass('fa-minus');
            $(e.target).addClass('fa-plus');
        }
    },
    render() {
        $(`.toggle_strategies_${value.id}`).hide();
        return (
            <tr >
                <td colSpan="4" className="p-0">
                    <Table responsive striped={false} hover={true} className="component-strategies-table m-0" id="ComponentStrategiesChild">
                        <thead>
                            <tr className={parseInt(this.props.time_series_id) === value.id ? 'info' : ''}>
                                <td width="30%">
                                   <a onClick={componentStrategiesClick} id={value.id} >{value.name}</a> 
                                    {
                                        value.parameters.underlyings ? 
                                        <Button onClick={this.toggleStrategies} className="btn btn-default toggle-strategies"><i className="fa fa-plus" aria-hidden="true"></i></Button> 
                                        : ''
                                    }
                                </td>
                               <td width="30%">{value.type}</td>
                               <td width="20%"></td>
                               <td width="20%"></td>
                            </tr>
                        </thead>
                        <tbody className={`toggle_strategies_${value.id} bg-f8f8f8`}>
                            {
                                value.parameters.underlyings ?
                                value.parameters.underlyings.map((v, k)=>(
                                    <tr key={k}>
                                       <td width="30%">|-- {v.name}</td>
                                       <td width="30%"></td>
                                       <td width="20%">{v.cost}</td>
                                       <td width="20%">{v.running_cost}</td>
                                   </tr>
                                )):null
                            }
                           
                        </tbody>
                    </Table>
                </td>
            </tr>
        )
    }
});

const ComponentStrategiesTableChild = ({value, add_class}) => ({
    render() {
        return (
            <div>
                { add_class ? '|__ ' : ''}
                {value ? value : '-'}
            </div>
        )
    }
});

const ComponentStrategies = ({componentStrategiesClick}) => ({
    render() {
        let strategies = this.props.strategies;
        if (strategies.length > 0) {
            return (
                <div className="scroll-custom" style={styles.ComponentStrategies}>
                    <Table responsive striped={false} hover={false} className="component-strategies-table" id="ComponentStrategiesParent">
                        <thead>
                            <tr>
                                <th width="30%">Name</th>
                                <th width="30%">Type</th>
                                <th width="20%">Cost</th>
                                <th width="20%">Running Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                strategies.map((v, k)=>(
                                    <ComponentStrategiesTable key={k} value={v} componentStrategiesClick={componentStrategiesClick} {...this.props} />
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            )
        }
        return (null)
    }
});

// const ComponentStrategiesChild = ({componentStrategiesClick, collapseClick}) => ({
//     render() {
//         return (
//             <tr>
//                 <td width="30%">
//                     {
//                         !this.props.child && 
//                         <Button onClick={collapseClick} className="m-r-15 collapse_custom">
//                             <i className={this.props.collapse_component_strategies ? `zmdi zmdi-minus` : `zmdi zmdi-plus`}></i>
//                         </Button>
//                     }
//                     {this.props.child ? <span className="color-bbb p-r-15">|--</span> : ''} 
//                     <span className={!this.props.child ? 'font-bold' : ''}>{this.props.value.name}</span>
//                     <Button onClick={componentStrategiesClick} className="btn btn-default toggle-strategies">
//                         <i id={this.props.value.name} className={ this.props.child ? 'zmdi zmdi-minus removeUnderlyings' : 'zmdi zmdi-plus addUnderlyings'} aria-hidden="true"></i>
//                     </Button> 
//                 </td>
//                 <td width="30%"><span className={!this.props.child ? 'font-bold' : ''}>{this.props.value.type}</span></td>
//                 <td width="20%">{this.props.value.cost >= 0 ? `${this.props.value.cost}%` : ''}</td>
//                 <td width="20%">{this.props.value.running_cost >= 0 ? `${this.props.value.running_cost}%` : ''}</td>
//             </tr>
//         )
//     }
// });


// const ComponentStrategies = ({componentStrategiesClick, collapseClick}) => ({
//     render() {
//         let strategy = this.props.strategy;
//         return (
//             <Table responsive striped={false} hover={false} className="component-strategies-table" id="ComponentStrategiesParent">
//                 <thead>
//                     <tr>
//                         <th width="30%">Name</th>
//                         <th width="30%">Type</th>
//                         <th width="20%">Cost</th>
//                         <th width="20%">Running Cost</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <ComponentStrategiesChild key={0} value={strategy} 
//                         componentStrategiesClick={componentStrategiesClick} 
//                         collapseClick={collapseClick} 
//                         collapse_component_strategies={this.props.collapse_component_strategies} />
//                     <tr>
//                         <td colSpan="4" className="p-0 bg-ddd">
//                             <Collapse in={this.props.collapse_component_strategies}>
//                                 <Table striped={true} hover={true} className="component-strategies-table m-0" id="ComponentStrategiesParentChild">
//                                     <tbody className="w-100">
//                                         {
//                                             strategy.parameters.underlyings &&
//                                             strategy.parameters.underlyings.map((v, k)=>(
//                                                 <ComponentStrategiesChild key={k + 1} value={v} child={true} componentStrategiesClick={componentStrategiesClick} /> 
//                                             ))
//                                         }
//                                     </tbody>
//                                 </Table>
//                             </Collapse>
//                         </td>
//                     </tr>
//                 </tbody>
//             </Table>
//         )
//     }
// });

ComponentStrategies.propTypes = {

};

export default ComponentStrategies;
