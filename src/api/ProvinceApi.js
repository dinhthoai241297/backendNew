import request from 'superagent';
import { HOST } from './../contants/index';

class ProvinceApi {
    static add(data) {
        return request.post(`${HOST}province/add`).send({ data });
    }

    static update(data) {
        return request.post(`${HOST}province/update`).send({ data });
    }

    static delete(id = -1) {
        return request.post(`${HOST}province/delete`).send({ id });
    }

    static getAll(page = 1) {
        return request.post(`${HOST}province/getall`).send({ page });
    }

    static getOne(id = -1) {
        return request.post(`${HOST}province/getone`).send({ id });
    }

    static updateStatus(data) {
        return request.post(`${HOST}province/updatestatus`).send({ data });
    }
}

export default ProvinceApi;