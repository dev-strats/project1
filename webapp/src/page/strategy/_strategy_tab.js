import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab, Row, Col, Nav, NavItem, Button, Collapse, Tooltip, OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';
import {addNewStrategy} from '../../config';

const title_pin_first = "Pin button will make the corresponding strategy the root strategy in the same webpage i.e. rebase the “deck” to the corresponding strategy";
const title_pin_second = "Pin button will do the same but in a new webpage";
const pin_icon = 'fa fa-thumb-tack';


class PinButtonSecond extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let link = null;
        if (this.props.strategy_name && this.props.strategies && (this.props.strategy_name !== addNewStrategy)) {
            let strategy_id = this.props.strategies.filter((v, k)=> v.name === this.props.strategy_name);
            if (strategy_id.length > 0) {
                link = (<Link className="pin_button btn btn-info" to={`/strategy/${strategy_id[0].id}`} target="_blank"
                            onClick={(event) => {event.preventDefault(); window.open(`/strategy/${strategy_id[0].id}`);}} >
                            <i className={pin_icon} aria-hidden="true" title={title_pin_second}></i>
                        </Link>);
            }
        }
        return link
    }
};

class PinButtonFirst extends Component {
    constructor(props) {
        super(props);
        this._pinButton = this._pinButton.bind(this);
    }
    _pinButton(e){
        let get_strategy = this.props.strategies.filter((v, k)=> v.name === this.props.strategy_name);
        if(get_strategy.length > 0){
            this.props.pinButton(e, this.props.strategy_name, get_strategy[0].id);
        }
    }
    render() {
        let button = this.props.strategy_name !== addNewStrategy ? (
            <Button className="pin_button btn btn-success" onClick={this._pinButton}>
                <i className={pin_icon} aria-hidden="true" title={title_pin_first}></i>
            </Button>
        ) : null;
        return button
    }
};


class NavItemTabCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._stopRenderNav = this._stopRenderNav.bind(this);
    }
    _stopRenderNav(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    stylesTab(k){
        let tabs_nav_content = this.props.tabs_nav_content;
        return { marginLeft : `${(k*2)}%`, paddingRight : `${(k*4)}%` , width : tabs_nav_content.length > 1 && `${(100 - ((tabs_nav_content.length -1)*2))}%` };
    }

    backgroundHasChange(name){
        if(this.props.tabs_nav_content_has_change){
            if (this.props.tabs_nav_content_has_change[name]) {
                return 'backgroundHasChange';
            }
        }
        return '';
    }

    getTreeNumber(number){
        return number || 1;
    }

    render() {
        let styles = {
            tabHeader : {
                paddingLeft : this.props.setLeft,
            }
        }
        let tabs_nav_content = this.props.tabs_nav_content;
        let _navItems = [];
        let tabs_nav_active_key = this.props.tabs_nav_active_key;
        let tab_pane = $('.tab-pane').length > 0 ? $('.tab-pane')[0].clientHeight + (tabs_nav_content.length * 50) : 0;
        let tabs_nav_content_obj = this.props.tabs_nav_content_obj;
        
        if (tabs_nav_content.length <= 3) {
            tabs_nav_content.map((v, k)=> {
                _navItems.push(
                    <NavItem eventKey={k} key={k} disabled={ k != tabs_nav_active_key && true } className={`tabHeader ${k > tabs_nav_active_key ? 'rmLeft' : ''} ${this.backgroundHasChange(v)}` } style={this.stylesTab(k)} >
                        <span className="titleHeader asd">
                            <span title={v}>{ addNewStrategy !== v && `${this.getTreeNumber(tabs_nav_content_obj[v])}. `} {v}</span>
                            {
                                this.props.root_strategy !== v && (
                                    <span>
                                        <PinButtonFirst {...this.props} pinButton={this.props.pinButton}
                                            strategy_name={v} />
                                        <PinButtonSecond 
                                            strategies={this.props.strategies} strategy_name={v} root_strategy={this.props.root_strategy} {...this.props}/> 
                                        { k == (tabs_nav_content.length -1)  && <Button className="p-0 closeTab" onClick={this.props.closeTabStackOfStrategy} name={v} value={k}>x</Button> }
                                    </span>
                                )
                            } 

                        </span>
                    </NavItem>
                )
            })
        }else {
            _navItems.push(
                <NavItem eventKey={0} key={0} className={`tabHeader ${this.backgroundHasChange(tabs_nav_content[0])}`} disabled={ 0 != tabs_nav_active_key && true }  style={this.stylesTab(0)}> 
                    <span className="titleHeader">
                        <span title={tabs_nav_content[0]}>{ addNewStrategy !== tabs_nav_content[0] && '1. '}{tabs_nav_content[0]}</span>
                        {
                            this.props.root_strategy !== tabs_nav_content[0] && (
                                <span>
                                    <PinButtonFirst {...this.props} pinButton={this.props.pinButton}
                                            strategy_name={tabs_nav_content[0]} />
                                    <PinButtonSecond 
                                            strategies={this.props.strategies} strategy_name={tabs_nav_content[0]} root_strategy={this.props.root_strategy} {...this.props}/> 
                                </span>
                            )
                        } 

                    </span>
                </NavItem>
            )
            _navItems.push(
                <NavItem eventKey={1} key={1} disabled={ 1 != tabs_nav_active_key && true } className={`tabHeader  ${this.backgroundHasChange(tabs_nav_content[1])}`} style={this.stylesTab(1)} > 
                    <span className="titleHeader" title={tabs_nav_content[1]}>
                        <span title={tabs_nav_content[1]}>{ addNewStrategy !== tabs_nav_content[1] && '2. '}{tabs_nav_content[1]}</span>
                        {
                            this.props.root_strategy !== tabs_nav_content[1] && (
                                <span>
                                    <PinButtonFirst {...this.props} pinButton={this.props.pinButton}
                                            strategy_name={tabs_nav_content[1]} />
                                    <PinButtonSecond 
                                            strategies={this.props.strategies} strategy_name={tabs_nav_content[1]} root_strategy={this.props.root_strategy} {...this.props}/> 
                                </span>
                            )
                        } 
                    </span>
                </NavItem>
            )

            
            _navItems.push(
                <NavItem eventKey={tabs_nav_content.length - 1} disabled={ true }  style={this.stylesTab(2)} key={1.5} className={this.props.showNavHidden ? 'hidden tabHeader showMore' : 'tabHeader showMore'} onClick={this._stopRenderNav}> 
                    <span className="titleHeader">
                        <Button onClick={this.props._showHiddenNav} className="show-nav-button"><i className="zmdi zmdi-more"></i></Button>
                    </span>
                </NavItem>
            )

            _navItems.push(
                <NavItem eventKey={tabs_nav_content.length - 1} key={tabs_nav_content.length} className={`tabHeader  ${this.backgroundHasChange(tabs_nav_content[tabs_nav_content.length-1])}`} style={this.stylesTab(tabs_nav_content.length - 1)}> 
                    <span className="titleHeader" title={tabs_nav_content[tabs_nav_content.length-1]}>
                        <span title={tabs_nav_content[tabs_nav_content.length-1]}>
                            { addNewStrategy !== tabs_nav_content[tabs_nav_content.length-1] && `${this.getTreeNumber(tabs_nav_content.length)}. ` } {tabs_nav_content[tabs_nav_content.length-1]}
                        </span>
                        {
                            this.props.root_strategy !== tabs_nav_content[tabs_nav_content.length-1] && (
                                <span>
                                    <PinButtonFirst {...this.props} pinButton={this.props.pinButton}
                                            strategy_name={tabs_nav_content[tabs_nav_content.length-1]} />
                                    <PinButtonSecond 
                                            strategies={this.props.strategies} strategy_name={tabs_nav_content[tabs_nav_content.length-1]} root_strategy={this.props.root_strategy} {...this.props}/> 
                                    <Button className="p-0 closeTab" onClick={this.props.closeTabStackOfStrategy} name={tabs_nav_content[tabs_nav_content.length-1]} value={tabs_nav_content.length - 1}>x</Button>
                                </span>
                            )
                        } 
                    </span>
                </NavItem>
            )
        }

        return (
            <Nav bsStyle="pills" stacked className="text-center tabCenter">
                {_navItems}
            </Nav>
        )
    }
}

NavItemTabCustom.propTypes = {

};

export default NavItemTabCustom;