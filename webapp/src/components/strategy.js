import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Services from '../services/services';
import LoadingSpin from '../page/layouts/loading-spin';
import moment from 'moment';
import { Tabs, Tab, Row, Col, Nav, NavItem, Button, Collapse } from 'react-bootstrap';

import StrategyPage from '../page/strategy/strategy-page';
import StackOfStrategy from '../page/strategy/stack-of-strategy';
import NewUnderlyingStrategy from '../page/strategy/new-underlying-strategy';
import NavItemTabCustom from '../page/strategy/_strategy_tab';
import {setCookieStrategy, getCookieStrategy, removeCookieStrategy, addNewStrategy, editStrategyColor} from '../config';

const timeOut = 2000;
var _update_click;

class Strategy extends Component {
	constructor(props) {
        super(props);
        let strategy_id = this.props.match.params.id;
        let tabs_nav_content = getCookieStrategy() ? getCookieStrategy() : [];
        let tabs_nav_active_key = getCookieStrategy() ? getCookieStrategy().length - 1 : 0;
        this.state = {
            strategy_id: strategy_id,
            root_strategy: '',
            common_parameters: {
                type: '',
                start_date: moment().format(),
                ccy: '',
                name: '',
            },
            type_specific_parameters_inputs: {},
            strategies: undefined,
            type_specific_parameters: undefined,
            strategy: undefined,
            type_list: undefined,
            ccy_list: undefined,
            time_series: undefined,
            time_series_has_update: false,
            time_series_id: strategy_id,
            showStackOfStrategy: {},
            loadPage : false,
            cancel : false,
            showNewUnderlyingStrategy: [false],
            showNewUnderlyingStrategyActive: 0,
            tabs_nav_content: tabs_nav_content,
            tabs_nav_content_obj: {},
            tabs_nav_content_has_change: {},
            tabs_nav_active_key: tabs_nav_active_key,
            showNavHidden: false,
            tabContainerHeight: undefined,
            redirectToReferrer: false,
        };
        this.getInitialData = this.getInitialData.bind(this);
        this.getStrategyDetail = this.getStrategyDetail.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.changeParameterInput = this.changeParameterInput.bind(this);
        this.setTypeSpecificParameters = this.setTypeSpecificParameters.bind(this);
        this.goToStrategies = this.goToStrategies.bind(this);
        this.returnStrategies = this.returnStrategies.bind(this);
        this.componentStrategiesClick = this.componentStrategiesClick.bind(this);
        this.updateButton = this.updateButton.bind(this);
        this.saveButton = this.saveButton.bind(this);
        this.closeModalStackOfStrategy = this.closeModalStackOfStrategy.bind(this);
        this.openModalStackOfStrategy = this.openModalStackOfStrategy.bind(this);
        this.closeNewUnderlyingStrategy = this.closeNewUnderlyingStrategy.bind(this);
        this.handleSelectTab = this.handleSelectTab.bind(this);
        this.closeTabStackOfStrategy = this.closeTabStackOfStrategy.bind(this);
        this.closeAllTabStackOfStrategy = this.closeAllTabStackOfStrategy.bind(this);
        this._showHiddenNav = this._showHiddenNav.bind(this);
        this._check_has_change_input = this._check_has_change_input.bind(this);
        this._set_has_change_input = this._set_has_change_input.bind(this);
        this.pinButton = this.pinButton.bind(this);
        this.timeSeriesHasUpdate = this.timeSeriesHasUpdate.bind(this);
        this.setHeightTabContainer = this.setHeightTabContainer.bind(this);
        this.addTabContent = this.addTabContent.bind(this);
        this.setTabsNavContentHasChange = this.setTabsNavContentHasChange.bind(this);
        this._setTabsNavContentObj = this._setTabsNavContentObj.bind(this);
        this._setTabsNavContentObjTree = this._setTabsNavContentObjTree.bind(this);
    }

    componentDidMount() {
        // get Initial Data when go to strategy page
        this.getStrategyDetail();
        this.getInitialData();
        // Pressing escape on the root strategy page will return to the list.
        $(document.body).on('keydown', this.goToStrategies);
        $('#tabContainer').on('keydown', this.returnStrategies);
    }

    componentWillUpdate(nextProps, nextState){

    }

    getInitialData(){
        let self = this;
        setTimeout(() => {
            // get type list
            Services.get_list('type').then((res)=>{
                if (res.status === 200) {
                    res.data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0) );
                    self.setState({type_list:res.data});
                }
            });

            // get Ccy list
            Services.get_list('ccy').then((res)=>{
                if (res.status === 200) {
                    res.data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0) );
                    self.setState({ccy_list:res.data});
                }
            });

            // get list strategies
            Services.get_list('strategies').then((res)=>{
                if (res.status === 200) {
                    self.setState({strategies: res.data});
                    this._setTabsNavContentObj(this.state.strategies, this.state.strategy, 1);
                }
            })
        }, timeOut - 1500);
    }

    setHeightTabContainer(h){
        this.setState({tabContainerHeight: h});
    }

    getStrategyDetail(){
        let self = this;
        setTimeout(() => {
            // get detail strategy
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
                    let tabs_nav_content = self.state.tabs_nav_content;
                    if (tabs_nav_content.length === 0) {
                        tabs_nav_content[0] = res.data.name;
                        self.setState({tabs_nav_content}) 

                        let tabs_nav_content_obj = self.state.tabs_nav_content_obj;
                        tabs_nav_content_obj[res.data.name] = 1;
                        self.setState({tabs_nav_content_obj})
                    }

                    let tabs_nav_content_has_change = self.state.tabs_nav_content_has_change;
                    tabs_nav_content_has_change[res.data.name] = false;
                    self.setState({tabs_nav_content_has_change})
                    strategy = strategy_new;
                    self.setState({strategy});
                    self.setState({root_strategy: res.data.name});

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
        }, timeOut - 1500);
    }

     _setTabsNavContentObj(list, node, lv){
        const self = this;
        let underlyings;
        
        if (node.parameters.underlyings != null) {
            underlyings = node.parameters.underlyings.map(function(v, k) {
                let get_underlyings_child = list.filter((v1,k1)=> v1.name === v.name);
                return self._setTabsNavContentObjTree(list, get_underlyings_child[0], lv + 1);
            });
        }
    }

    _setTabsNavContentObjTree(list, node, lv){
        const self = this;
        if ('underlyings' in node.parameters) {
            let underlyings = node.parameters.underlyings.map(function(v, k) {
                let get_underlyings_child = list.filter((v1,k1)=> v1.name === v.name);
                return self._setTabsNavContentObjTree(list, get_underlyings_child[0], lv + 1);
            });
        }
        // add new tab and level
        let tabs_nav_content_obj = this.state.tabs_nav_content_obj;
        tabs_nav_content_obj[node.name] = lv;
        this.setState({tabs_nav_content_obj});
    }



    changeInput(event, formattedValue) {
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
        this._set_has_change_input(this.state.strategy.name, true);
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

    changeParameterInput(e) {
        const field = e.target.name;
        const value = e.target.value;
        const localName = e.target.localName;
        const type_specific_parameters_inputs = this.state.type_specific_parameters_inputs;

        this.changeParameter(field, value, localName, type_specific_parameters_inputs);
        this._set_has_change_input(this.state.strategy.name, true);
    }

    componentStrategiesClick(e){
        this.timeSeriesHasUpdate();
        let name = e.target.id;
        if (e.target.className.indexOf('removeUnderlyings') !== -1){
            var r = confirm(`Do you want to delete: ${name}?`);
            if (r) {
                Services.remove_underlying(this.state.strategy.id, name).then((res)=>{
                    if (res.data.status > 0) {
                        let strategy = this.state.strategy;
                        strategy['parameters'] = res.data.data;
                        this.setState({strategy});
                    }
                })
            }
        }else if(e.target.className.indexOf('addUnderlyings') !== -1){
            // window.scrollTo(0,0);
            // let showNewUnderlyingStrategyActive = this.state.showNewUnderlyingStrategyActive;
            // let showNewUnderlyingStrategy = this.state.showNewUnderlyingStrategy;
            // showNewUnderlyingStrategy[showNewUnderlyingStrategyActive] = true;
            // this.setState({showNewUnderlyingStrategy});
            // showNewUnderlyingStrategyActive += 1;
            // this.setState({showNewUnderlyingStrategyActive});
            let name = addNewStrategy;
            this.addTabContent(name, 0);
        }
    }
    
    closeNewUnderlyingStrategy(e){
        this.timeSeriesHasUpdate();
        let showNewUnderlyingStrategyActive = this.state.showNewUnderlyingStrategyActive;
        let showNewUnderlyingStrategy = this.state.showNewUnderlyingStrategy;
        showNewUnderlyingStrategy.splice((showNewUnderlyingStrategyActive - 1), 1)
        this.setState({showNewUnderlyingStrategy});
        showNewUnderlyingStrategyActive -= 1;
        this.setState({showNewUnderlyingStrategyActive});
    }

    openModalStackOfStrategy(e){
        let name = e.target.value;
        this.addTabContent(name);
    }

    addTabContent(name){
        this.setState({loadPage : true});
        window.scrollTo(0,0);
        let get_index = this.state.tabs_nav_content.indexOf(name);
        if (get_index === -1) {

            // add new tab 
            let tabs_nav_content = this.state.tabs_nav_content;
            tabs_nav_content.push(name);
            this.setState({tabs_nav_content});

            // set has change input default = false;
            let tabs_nav_content_has_change = this.state.tabs_nav_content_has_change;
            tabs_nav_content_has_change[name] = false;
            this.setState({tabs_nav_content_has_change});

        }
        this.handleSelectTab(this.state.tabs_nav_content.indexOf(name));
        setTimeout(() => {
            this.setState({loadPage : false});
        }, timeOut - 1000);
    }

    closeModalStackOfStrategy(e, showName){
        let showStackOfStrategy = this.state.showStackOfStrategy;
        delete showStackOfStrategy[showName];
        this.setState({showStackOfStrategy});
    }

    timeSeriesHasUpdate(){
        this.setState({time_series_has_update: false});
    }

    changeModel(e){
        console.log('Change')
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

    // Pressing escape on the root strategy page will return to the list.
    goToStrategies(event) {
        if (event.keyCode == 27 /*esc*/) {
            if(this.state.tabs_nav_active_key == 0 ){
                this.setState({ redirectToReferrer: true });
            }
            this.setState({loadPage : false});
            this.setState({ cancel : true });
            if(_update_click){
                _update_click.abort();
                _update_click = undefined;
                return;
            }
            let tabs_nav_content = this.state.tabs_nav_content;
            if(!this.state.showNewUnderlyingStrategy[0]){
                // close tab content if has 
                if(tabs_nav_content.length > 1){
                    let tabs_nav_active_key = this.state.tabs_nav_active_key;
                    let tabs_nav_content_has_change = this.state.tabs_nav_content_has_change;
                    let _get_name_current_tab = tabs_nav_content[tabs_nav_active_key];
                    if (_get_name_current_tab !== this.state.root_strategy) {
                        this.setState({loadPage : true});
                        let _get_has_input_change_of_current_tab = tabs_nav_content_has_change[tabs_nav_content[tabs_nav_active_key]] ? tabs_nav_content_has_change[tabs_nav_content[tabs_nav_active_key]] : false;
                        if (_get_has_input_change_of_current_tab) {
                            var r = confirm(`Do you want to save: ${tabs_nav_content[tabs_nav_active_key]}?`);
                            if (r) {
                                alert('Press Save');
                            }else{
                                alert('Press cancel');
                            }
                        }

                        // // remove tab and level
                        // let tabs_nav_content_obj = this.state.tabs_nav_content_obj;
                        // delete tabs_nav_content_obj[_get_name_current_tab];
                        // this.setState({tabs_nav_content_obj});

                        // remove tab
                        delete tabs_nav_content_has_change[tabs_nav_content[tabs_nav_active_key]];
                        this.setState({tabs_nav_content_has_change});

                        tabs_nav_content.splice(this.state.tabs_nav_active_key, 1); 
                        this.setState({tabs_nav_content});

                        this.handleSelectTab(this.state.tabs_nav_content.length - 1);

                        setTimeout(() => {
                            this.setState({loadPage : false});
                        }, timeOut - 1000);
                    }
                }
            }
        }
    }

    returnStrategies(event){
        // console.log('returnStrategies')
    }

    updateButton(e){
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
                    this.setTabsNavContentHasChange(this.state.strategy.name);
                }
            }
        })
    }

    setTabsNavContentHasChange(name){
        let tabs_nav_content_has_change = this.state.tabs_nav_content_has_change;
        delete tabs_nav_content_has_change[name];
        this.setState({tabs_nav_content_has_change});
    }

    saveButton(e){}

    closeTabStackOfStrategy(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({loadPage : true});
        let key = parseInt(e.target.value) || -1;
        let name = e.target.name;
        let tabs_nav_content = this.state.tabs_nav_content;

        let tabs_nav_content_has_change = this.state.tabs_nav_content_has_change;
        if(tabs_nav_content_has_change[name]){
            var r = confirm(`Do you want to save: ${name}?`);
            if (r) {
                alert('Press Save');
            }else{
                alert('Press cancel');
            }
        }

        // remove object has change input
        delete tabs_nav_content_has_change[tabs_nav_content[name]];
        this.setState({tabs_nav_content_has_change});

        // remove tab content
        if(key >= 0){
            // remove tab and level
            // let tabs_nav_content_obj = this.state.tabs_nav_content_obj;
            // delete tabs_nav_content_obj[name];
            // this.setState({tabs_nav_content_obj});
            tabs_nav_content.splice(key, 1);
            this.setState({tabs_nav_content});
            this.handleSelectTab(this.state.tabs_nav_content.length - 1);
        }

        setTimeout(() => {
            this.setState({loadPage : false});
        }, timeOut - 1000);
    }

    closeAllTabStackOfStrategy(e){
        this.setState({ redirectToReferrer: true });
    }

    _check_has_change_input(name, arr, check){
        let check_has_change_input =  arr.filter((v, k)=> Object.keys(v)[0] === name && v[name] == check);
        if (check_has_change_input.length > 0) {
            return check_has_change_input[0];
        }
        return undefined;
    }

    _set_has_change_input(showName, change_input){
        let tabs_nav_content_has_change = this.state.tabs_nav_content_has_change;
        tabs_nav_content_has_change[showName] = change_input;
        this.setState({tabs_nav_content_has_change});
    }

    _showHiddenNav(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ showNavHidden: !this.state.showNavHidden});
    }

    handleSelectTab(key) {
        this.setState({tabs_nav_active_key: key})
    }

    pinButton(e, name, id) {
        this.props.history.push('/strategy/' + id);
        window.location.reload();
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/strategies' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer) {
            return (
                <Redirect to={from}/>
            )
        }

        let setLeft = 0;
        let _content_default = <StrategyPage 
                setLeft = {0}
                setPdTop = {0}
                setMgTop = {0}
                changeInput={this.changeInput} 
                common_parameters={this.state.common_parameters} 
                type_specific_parameters={this.state.type_specific_parameters} 
                changeParameterInput={this.changeParameterInput}
                type_specific_parameters_inputs={this.state.type_specific_parameters_inputs}
                componentStrategiesClick={this.componentStrategiesClick}
                updateButton={this.updateButton}
                saveButton={this.saveButton}
                closeModalStackOfStrategy={this.closeModalStackOfStrategy}
                openModalStackOfStrategy={this.openModalStackOfStrategy}
                closeNewUnderlyingStrategy={this.closeNewUnderlyingStrategy}
                {...this.state} {...this.props} 
            />
        let _content_default_1 = <StrategyPage 
                setPaddingTop = {`${((this.state.tabs_nav_content.length - 2)*4.5)}%`}
                setLeft = {0}
                setPdTop = {this.state.tabs_nav_content.length * 40}
                setMgTop = {-(this.state.tabs_nav_content.length * 40)}
                changeInput={this.changeInput} 
                common_parameters={this.state.common_parameters} 
                type_specific_parameters={this.state.type_specific_parameters} 
                changeParameterInput={this.changeParameterInput}
                type_specific_parameters_inputs={this.state.type_specific_parameters_inputs}
                componentStrategiesClick={this.componentStrategiesClick}
                updateButton={this.updateButton}
                saveButton={this.saveButton}
                closeModalStackOfStrategy={this.closeModalStackOfStrategy}
                openModalStackOfStrategy={this.openModalStackOfStrategy}
                closeNewUnderlyingStrategy={this.closeNewUnderlyingStrategy}
                {...this.state} {...this.props} 
            />
        let setTop = 130;
        let setMgTop = -98;
        let _tab_ctn = [];
        let elLength = this.state.tabs_nav_content.length;

        let _tab = this.state.tabs_nav_content.map((v, k)=> {
            if(k === 0 && this.state.tabs_nav_content.length == 1 ){
                return <Tab.Pane eventKey={k} key={k} className="first_content">{_content_default}</Tab.Pane>;
            } else if(k === 0){
                let styles = { marginTop : `${-((this.state.tabs_nav_content.length - k -1)*3.2)}%`, width : `${100 -(this.state.tabs_nav_content.length - 1)*2}%` }
                return <Tab.Pane eventKey={k} key={k} style={styles}>{_content_default_1}</Tab.Pane>;
            }else{
                let styles = { marginLeft : `${(k*2)}%`, marginTop : `${-((this.state.tabs_nav_content.length - k -1)*3)}%`, width : `${100 - (this.state.tabs_nav_content.length-1)*2}%` };
                return (
                    <Tab.Pane eventKey={k} key={k} style={styles}>
                        <StackOfStrategy key={k} showName={v} tabKey={k}
                            setPaddingTop = {`${((this.state.tabs_nav_content.length - k -1)*2.5)}%`}
                            closeModalStackOfStrategy={this.closeModalStackOfStrategy} 
                            openModalStackOfStrategy={this.openModalStackOfStrategy}  
                            strategies={this.state.strategies} 
                            setTop={setTop + (k * 40)}
                            ccy_list={this.state.ccy_list}
                            type_list={this.state.type_list}
                            componentStrategiesClick={this.componentStrategiesClick}
                            updateButton={this.updateButton}
                            _set_has_change_input={this._set_has_change_input}
                            tabs_nav_content={this.state.tabs_nav_content}
                            tabs_nav_active_key={this.state.tabs_nav_active_key}
                            strategy={this.state.strategy}
                            tabs_nav_content_has_change={this.state.tabs_nav_content_has_change}
                            setTabsNavContentHasChange={this.setTabsNavContentHasChange}
                        />
                    </Tab.Pane>
                )
            }

        })

        let modal_arr = [];
        if (this.state.type_list && this.state.ccy_list) {
            this.state.showNewUnderlyingStrategy.map((v, k)=>{
                modal_arr.push(<NewUnderlyingStrategy 
                            {...this.state} {...this.props}
                            changeInput={this.changeInput} 
                            common_parameters={this.state.common_parameters} 
                            type_specific_parameters={this.state.type_specific_parameters} 
                            changeParameterInput={this.changeParameterInput}
                            type_specific_parameters_inputs={this.state.type_specific_parameters_inputs}
                            componentStrategiesClick={this.componentStrategiesClick}
                            updateButton={this.updateButton}
                            saveButton={this.saveButton}
                            closeModalStackOfStrategy={this.closeModalStackOfStrategy}
                            openModalStackOfStrategy={this.openModalStackOfStrategy}
                            closeNewUnderlyingStrategy={this.closeNewUnderlyingStrategy}
                            showNewUnderlyingStrategy={v}
                            showNewUnderlyingStrategyArr={this.state.showNewUnderlyingStrategy}
                            showNewUnderlyingStrategyActive={this.state.showNewUnderlyingStrategyActive}
                            timeSeriesHasUpdate={this.timeSeriesHasUpdate}
                        />)
            })
        }
        
        return (
            <div className="container app-container" style={{background: 'transparent'}}>

                {/* Tab content */}
                <Tab.Container onKeyPress={this.returnStrategies} id="tabContainer" defaultActiveKey={0} activeKey={this.state.tabs_nav_active_key} onSelect={this.handleSelectTab} style={{height: this.state.tabContainerHeight ? this.state.tabContainerHeight : 'auto' }}>
                    {
                        this.state.tabs_nav_content && this.state.strategies ? 
                        <Row className="clearfix">
                            <Col xs={12} className="content p-0">
                                <NavItemTabCustom  tabs_nav_content={this.state.tabs_nav_content} closeTabStackOfStrategy={this.closeTabStackOfStrategy} 
                                    closeAllTabStackOfStrategy={this.closeAllTabStackOfStrategy} tabs_nav_content_has_change={this.state.tabs_nav_content_has_change}
                                    _showHiddenNav={this._showHiddenNav} showNavHidden={this.state.showNavHidden} setHeightTabContainer={this.setHeightTabContainer}
                                    root_strategy={this.state.root_strategy} tabs_nav_active_key={this.state.tabs_nav_active_key} tabs_nav_content_obj={this.state.tabs_nav_content_obj}
                                    strategies={this.state.strategies} {...this.props} pinButton={this.pinButton} />
                            </Col>
                            <Col xs={12} className="p-0">
                                <Tab.Content animation>{_tab}</Tab.Content>
                            </Col>
                        </Row> : <LoadingSpin center={true}/>
                    }
                </Tab.Container>

                {/* Modal add new underlyind */}
                { 
                    this.state.type_list && this.state.ccy_list && modal_arr
                }

                {/* Show loading when click on update, save, ... button */}
                
                <div className={!this.state.loadPage ? 'hidden' : 'loadPage'} onKeyPress={this.goToStrategies} >
                    <LoadingSpin center={true}  />
                </div>
            </div>
        )
    }
}

Strategy.defaultProps = {
    titlePage: 'Strategy',
};

export default Strategy