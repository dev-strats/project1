import { apiUrl } from '../config';
import axios from 'axios';

class Services {

    /**
     * get strategies list
     *
     */
    static get_list(name) {
        return axios.get(`${apiUrl}?f=get_list&name=${name}`);
    }

    /**
     * get Strategy detail 
     *
     */
    static strategy_detail(id) {
        return axios.get(`${apiUrl}?f=strategy_detail&id=${id}`);
    }

    /**
     * update click
     *
     */
    static update_click(id) {
        let formData = new FormData();
        formData.append('id', id);
        return $.ajax({
            type: 'POST',
            url: `${apiUrl}?f=update_click`,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
        });
        // return axios.post(`${apiUrl}?f=update_click`, formData, { requestId: 'update-click' });
    }

    /**
     * get Type-Specific Parameters
     *
     */
    static type_specific_parameters(type) {
        return axios.get(`${apiUrl}?f=type_specific_parameters&type=${type}`);
    }

    /**
     * remove underlying
     *
     */
    static remove_underlying(strategy_id, name) {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('strategy_id', strategy_id);
        return axios.post(`${apiUrl}?f=remove_underlying`, formData);
    }

    /**
     * get Type-Specific Parameters
     *
     */
    static create_stratery(common_parameters, type_specific) {
        let formData = new FormData();
        // for (let value in data) {
        //     formData.append([value], data[value]);
        // }
        formData.append('common_parameters', common_parameters);
        formData.append('type_specific', type_specific);

        return axios.post(`${apiUrl}?f=create_stratery`, formData);
    }

    static update_stratery(common_parameters, type_specific, id) {
        let formData = new FormData();
        // for (let value in data) {
        //     formData.append([value], data[value]);
        // }
        formData.append('common_parameters', common_parameters);
        formData.append('type_specific', type_specific);
        formData.append('id', id);

        return axios.post(`${apiUrl}?f=update_stratery`, formData);
    }

    /**
     * get Type-Specific Parameters
     *
     */
    static load_more_time_series(data) {
        // if not data or data = 0
        if(!data || !data.time_series){
            return new Promise(function(resolve, reject) {resolve({ 'status': 0 }) })
        }
        let result = {
            data: [],
            hasMoreItems: data.hasMoreItems,
            itemPerPage: data.itemPerPage,
            nextPage: data.nextPage,
            status: 0
        }
        result.status = 1;
        result.data = data.time_series.filter((v, k)=>{
            return k >= ((data.nextPage - 1) * data.itemPerPage) && k < (data.nextPage * data.itemPerPage);
        });
        result.nextPage += 1;

        if ((data.nextPage * data.itemPerPage) >= data.time_series.length) {
            result.hasMoreItems = false;
        }
        return new Promise(function(resolve, reject) {resolve(result) })
    }


}

export default Services;