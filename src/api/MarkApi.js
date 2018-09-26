import request from 'superagent';
import { HOST } from './../contants/index';

class MarkApi {
    static add(data) {
        return request.post(`${HOST}mark/add`).send({ data });
    }

    static update(data) {
        return request.post(`${HOST}mark/update`).send({ data });
    }

    static delete(id = -1) {
        return request.post(`${HOST}mark/delete`).send({ id });
    }

    static getAll(page = 1) {
        return request.post(`${HOST}mark/getall`).send({ page });
    }

    static getOne(id = -1) {
        return request.post(`${HOST}mark/getone`).send({ id });
    }

    static updateStatus(data) {
        return request.post(`${HOST}mark/updatestatus`).send({ data });
    }
}

export default MarkApi;