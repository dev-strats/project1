import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';


const StrategiesPage = (props) => (
    <div>
        <Table responsive striped={true} hover={true}>
            <thead>
                <tr>
                    <th>Strategy Name</th>
                    <th>Type</th>
                    <th>Ccy</th>
                </tr>
            </thead>
            <tbody>
            {
                props.strategiesData.map((v,i) => (
                    <tr key={i}>
                        <td><Link to={`strategy/${v.id}`} onClick={props.removeCookie()}>{v.name}</Link></td>
                        <td>{v.type}</td>
                        <td>{v.ccy}</td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
    </div>
);

StrategiesPage.propTypes = {

};

export default StrategiesPage;
