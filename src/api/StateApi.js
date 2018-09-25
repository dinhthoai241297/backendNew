import request from 'superagent';
import { HOST } from './../contants/index';

class StateApi {
    static add(data) {
        return request.post(`${HOST}state/add`).send({ data });
    }

    static update(data) {
        return request.post(`${HOST}state/update`).send({ data });
    }

    static delete(id = -1) {
        return request.post(`${HOST}state/delete`).send({ id });
    }

    static getAll(page = 1) {
        return request.post(`${HOST}state/getall`).send({ page });
    }

    static getOne(id = -1) {
        return request.post(`${HOST}state/getone`).send({ id });
    }
}

export default StateApi;