import request from 'superagent';
import { HOST } from './../contants/index';

class UserApi {
    static add(data) {
        return request.post(`${HOST}user/add`).send({ data });
    }

    static update(data) {
        return request.post(`${HOST}user/update`).send({ data });
    }

    static delete(id = -1) {
        return request.post(`${HOST}user/delete`).send({ id });
    }

    static getAll(page = 1) {
        return request.post(`${HOST}user/getall`).send({ page });
    }

    static getOne(id = -1) {
        return request.post(`${HOST}user/getone`).send({ id });
    }

    static login(data) {
        return request.post(`${HOST}user/login`).send({ data });
    }

    static updateState(data) {
        return request.post(`${HOST}user/updatestate`).send({ data });
    }
}

export default UserApi;