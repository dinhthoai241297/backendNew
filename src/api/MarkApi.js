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

    static getall(page = 1) {
        return request.post(`${HOST}mark/getall`).send({ page });
    }

    static getone(id = -1) {
        return request.post(`${HOST}mark/getone`).send({ id });
    }
}

export default MarkApi;