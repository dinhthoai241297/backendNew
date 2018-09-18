import request from 'superagent';
import { HOST } from './../contants/index';

class SchoolApi {
    static add(data) {
        return request.post(`${HOST}school/add`).send({ data });
    }

    static update(data) {
        return request.post(`${HOST}school/update`).send({ data });
    }

    static delete(id = -1) {
        return request.post(`${HOST}school/delete`).send({ id });
    }

    static getAll(page = 1) {
        return request.post(`${HOST}school/getall`).send({ page });
    }

    static getOne(id = -1) {
        return request.post(`${HOST}school/getone`).send({ id });
    }
}

export default SchoolApi;