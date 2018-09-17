import request from 'superagent';
import { HOST } from './../contants/index';

class SubjectGroupApi {
    static add(data) {
        return request.post(`${HOST}subjectgroup/add`).send({ data });
    }

    static update(data) {
        return request.post(`${HOST}subjectgroup/update`).send({ data });
    }

    static delete(id = -1) {
        return request.post(`${HOST}subjectgroup/delete`).send({ id });
    }

    static getall(page = 1) {
        return request.post(`${HOST}subjectgroup/getall`).send({ page });
    }

    static getone(id = -1) {
        return request.post(`${HOST}subjectgroup/getone`).send({ id });
    }
}

export default SubjectGroupApi;