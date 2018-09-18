import request from 'superagent';
import { HOST } from './../contants/index';

class MajorApi {
    static add(data) {
        return request.post(`${HOST}major/add`).send({ data });
    }

    static update(data) {
        return request.post(`${HOST}major/update`).send({ data });
    }

    static delete(id = -1) {
        return request.post(`${HOST}major/delete`).send({ id });
    }

    static getAll(page = 1) {
        return request.post(`${HOST}major/getall`).send({ page });
    }

    static getOne(id = -1) {
        return request.post(`${HOST}major/getone`).send({ id });
    }
}

export default MajorApi;