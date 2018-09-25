import request from 'superagent';
import { HOST } from './../contants/index';

class RoleApi {
    static add(data) {
        return request.post(`${HOST}role/add`).send({ data });
    }

    static update(data) {
        return request.post(`${HOST}role/update`).send({ data });
    }

    static delete(id = -1) {
        return request.post(`${HOST}role/delete`).send({ id });
    }

    static getAll(page) {
        return request.post(`${HOST}role/getall`).send({ page });
    }

    static getOne(id = -1) {
        return request.post(`${HOST}role/getone`).send({ id });
    }
}

export default RoleApi;