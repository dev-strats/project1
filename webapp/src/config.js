import moment from 'moment';


// Global
export const CURRENT_USER = "CURRENT_USER";
export const LIST_USER = "LIST_USER";
export const TITLE = "Financial Web App Front End Development";
export const TITLE_SHORT = "Financial";


// Config Defail Theme
export const baseColor = '#777';
export const secondTextColor = '#999';
export const thirdTextColor = '#555';
export const fourthTextColor = '#bbb';
export const fifthTextColor = '#dce4ec';
export const primary_color = '#437597';
export const second_color = '#376d92';
export const third_color = 'rgba(55, 109, 146, 0.7)';
export const fourth_color = '#2c3e50';
export const fontFamilyBase = "'Raleway', sans-serif";
export const fontSizeBase = '13px';
export const editStrategyColor = '#fbeeee';

// export const apiUrl = 'http://192.168.43.147/jobs/2017/financial-web-app-front-end-development/server/api.php';
export const apiUrl = 'http://192.168.1.10/prs/2017/financial-web-app-front-end-development/server/api.php';
// export const apiUrl = '/server/api.php';


export const addNewStrategy = 'New Strategy';

export const convertToTimeStamp = (data) => {
    data = data.map(function(item) {
        let time = parseInt(moment(item[0]).format('x'));
      return [time, item[1]];
    });
    return data
}

export const setCookieStrategy = (data) => {
    data = JSON.stringify(data);
    localStorage.setItem('strategyTab', data);
}

export const removeCookieStrategy = (data) => {
    localStorage.removeItem('strategyTab');
}

export const getCookieStrategy = () => {
    let data = localStorage.getItem('strategyTab');
    return data ? JSON.parse(data) : undefined
}

export const hightChatStockConfig = {
    plotOptions: {
        series: {
            animation: {
                duration: 2000,
                easing: 'easeOutBounce'
            }
        }
    },
    colors: [primary_color],
    navigator: {
        handles: {
            backgroundColor: third_color,
            borderColor: third_color,
            color: '#fff',
        },
        maskFill: 'rgba(55, 109, 146, 0.09)',
        series: {
            lineColor: primary_color
        },
    },
    scrollbar: {
        height: 8
    },
    chart: {
        style: {
            fontFamily: fontFamilyBase
        }
    },
    rangeSelector: {
        inputDateFormat: '%e %b %Y',
    },
    series: [{
        tooltip: {
            valueDecimals: 2
        }
    }]
};

export const tooltip_data = {
    parameters_strategy: "The primary parameters on top left part is common to any strategy. TYPE should be from a drop down list of available types. START DATE should be selected from a pop-out calendar. CCY is from a drop down list.",
    type_specific_parameters: "The parameters on the top right are specific for each type of strategy – it changes dynamically depending on what TYPE is input on the left.",
    component_strategies: "The bottom area of the user inputs specify the underlying strategies (aka component strategies) of the current strategy.",
	statistics_table: "The top right is a table with rows of name-value pairs – there are ANNUALIZED RETURN, VOLATILITY, SHARP RATIO and MAXIMUM DRAWDOWN. These numbers are a function of the time series data.",
};