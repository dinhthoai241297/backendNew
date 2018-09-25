import request from 'superagent';
import { HOST } from '../contants';

class StateApi {
    static add(data) {
        return request.post(`${HOST}status/add`).send({ data });
    }

    static update(data) {
        return request.post(`${HOST}status/update`).send({ data });
    }

    static delete(id = -1) {
        return request.post(`${HOST}status/delete`).send({ id });
    }

    static getAll(page = 1) {
        return request.post(`${HOST}status/getall`).send({ page });
    }

    static getOne(id = -1) {
        return request.post(`${HOST}status/getone`).send({ id });
    }
}

export default StateApi;