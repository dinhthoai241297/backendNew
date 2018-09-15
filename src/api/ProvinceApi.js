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

    static getall(page = 1) {
        return request.post(`${HOST}province/getAll`).send({ page });
    }

    static getone(id = -1) {
        return request.post(`${HOST}province/getOne`).send({ id });
    }
}

export default ProvinceApi;