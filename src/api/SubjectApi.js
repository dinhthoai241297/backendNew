import request from 'superagent';
import { HOST } from './../contants/index';

class SubjectApi {
    static add(data) {
        return request.post(`${HOST}subject/add`).send({ data });
    }

    static update(data) {
        return request.post(`${HOST}subject/update`).send({ data });
    }

    static delete(id = -1) {
        return request.post(`${HOST}subject/delete`).send({ id });
    }

    static getall(page = 1) {
        return request.post(`${HOST}subject/getall`).send({ page });
    }

    static getone(id = -1) {
        return request.post(`${HOST}subject/getone`).send({ id });
    }
}

export default SubjectApi;