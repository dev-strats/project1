import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Collapse, Well, colSpan } from 'react-bootstrap';
import moment from 'moment';
import {addNewStrategy} from '../../config';

const styles = {
    bgNone: {
        background: 'transparent',
    }
}

class TreeNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.treeLevel < 1 ? true : false,
            treeLevel: this.props.treeLevel,
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.componentStrategiesClick = this.componentStrategiesClick.bind(this);
        this.openModalStackOfStrategy = this.openModalStackOfStrategy.bind(this);
    }
  
    toggleCollapse(){
        this.setState({visible: !this.state.visible});
    }
    
    componentStrategiesClick(e){
        this.props.componentStrategiesClick(e);
    }

    openModalStackOfStrategy(e){
        this.props.openModalStackOfStrategy(e, this.state.treeLevel);
    }

    render() {
        let node = this.props.node;
        let underlyings, collapse_button, style, node_name = <span title={node.name}>{node.name}</span>;
        let title = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
        if (!this.state.visible) {
            style = {display: "none"};
        }

        const self = this;
        let get_underlyings_child = this.props.strategies.filter((v,k)=>v.name === node.name);
        if (node.underlyings != null) {
            if(this.state.treeLevel === 0){
                underlyings = node.underlyings.map(function(node, index) {
                    return (
                        <tr style={style} key={index}>
                            <td colSpan="4" className="p-0" >
                                <TreeNode node={node} treeLevel={self.state.treeLevel + 1} 
                                    componentStrategiesClick={self.props.componentStrategiesClick} 
                                    strategies={self.props.strategies} 
                                    openModalStackOfStrategy={self.props.openModalStackOfStrategy}
                                    showNewUnderlyingStrategy={self.props.showNewUnderlyingStrategy}/>
                            </td>
                        </tr>
                    )
                });
            }
            collapse_button = (<Button onClick={this.toggleCollapse} className="m-r-10 collapse_custom" title={title}>
                          <i className={this.state.visible ? `zmdi zmdi-minus` : `zmdi zmdi-plus`}></i>
                      </Button>)
        }else{
            if (this.state.treeLevel > 0) {
                if (get_underlyings_child.length > 0){
                    if ('underlyings' in get_underlyings_child[0].parameters){
                        underlyings = get_underlyings_child[0].parameters.underlyings.map(function(node, index) {
                            return (
                                <tr style={style} key={index}>
                                    <td colSpan="4" className="p-0" >
                                        <TreeNode node={node} treeLevel={self.state.treeLevel + 1} 
                                            componentStrategiesClick={self.props.componentStrategiesClick} 
                                            strategies={self.props.strategies} 
                                            openModalStackOfStrategy={self.props.openModalStackOfStrategy}
                                            showNewUnderlyingStrategy={self.props.showNewUnderlyingStrategy} />
                                    </td>
                                </tr>
                            )
                        });
                        collapse_button = (<Button onClick={this.toggleCollapse} className="m-r-10 collapse_custom" title={title}>
                              <i className={this.state.visible ? `zmdi zmdi-minus` : `zmdi zmdi-plus`}></i>
                          </Button>)
                    }
                }
            }
        }

        if (this.state.treeLevel > 0) {
            node_name = (<Button className="btn-custom" onClick={this.openModalStackOfStrategy} value={node.name} title={node.name} title={title}>
                {node.name}
            </Button>)
        }

        return (
            <Table striped={false} hover={false} className="component-strategies-table m-0" style={styles.bgNone}>
                <tbody className="w-100">
                    <tr>
                        <td width="40%" style={{paddingLeft: `${this.state.treeLevel * 15}px`}}>
                            {collapse_button}
                            {!underlyings && <span className="color-bbb p-r-10">|--</span>}
                            {node_name}
                            <Button className="btn btn-default toggle-strategies" onClick={this.componentStrategiesClick} title={title}>
                                <i id={node.name} 
                                    className={ this.state.treeLevel === 0 ? 'zmdi zmdi-plus addUnderlyings' : 'zmdi zmdi-minus removeUnderlyings'} 
                                    aria-hidden="true"></i>
                            </Button> 
                        </td>
                        <td width="20%">{get_underlyings_child.length > 0 ? get_underlyings_child[0].type : note.type}</td>
                        <td width="20%">{node.cost >= 0 && `${node.cost}%`}</td>
                        <td width="20%">{node.running_cost >= 0 && `${node.running_cost}%`}</td>
                    </tr>
                    {underlyings}
                </tbody>
            </Table>
        );
    }
}


const ComponentStrategies = ({componentStrategiesClick}) => ({
    render() {
        let strategy = {
            name: this.props.strategy.name,
            type: this.props.strategy.type,
            underlyings: this.props.strategy.parameters.underlyings,
        };
        if (addNewStrategy !== this.props.showName) {
            return (
                <Table responsive striped={false} hover={false} className="component-strategies-table" id="ComponentStrategiesParent">
                    <thead>
                        <tr>
                            <th width="40%">Name</th>
                            <th width="20%">Type</th>
                            <th width="20%">Cost</th>
                            <th width="20%">Running Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="4" className="p-0">
                                <Collapse in={this.props.collapse_component_strategies}>
                                    <TreeNode node={strategy} treeLevel={0} 
                                        componentStrategiesClick={componentStrategiesClick} 
                                        strategies={this.props.strategies} 
                                        openModalStackOfStrategy={this.props.openModalStackOfStrategy}
                                        showNewUnderlyingStrategy={this.props.showNewUnderlyingStrategy} />
                                </Collapse>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            )
        }else{
            return null;
        }
    }
});


ComponentStrategies.propTypes = {

};

export default ComponentStrategies;
