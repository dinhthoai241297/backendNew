import request from 'superagent';
import { HOST } from './../contants/index';

class UserApi {
    static add(data) {
        return request.post(`${HOST}user/add`).send({ data });
    }

    static update(data) {
        return request.post(`${HOST}user/update`).send({ data });
    }

    static delete(data) {
        return request.post(`${HOST}user/delete`).send({ data });
    }

    static getAll(data) {
        return request.post(`${HOST}user/getall`).send({ data });
    }

    static getOne(data) {
        return request.post(`${HOST}user/getone`).send({ data });
    }

    static login(data) {
        return request.post(`${HOST}user/login`).send({ data });
    }

    static logout(data) {
        return request.post(`${HOST}user/logout`).send({ data });
    }

    static updateStatus(data) {
        return request.post(`${HOST}user/updatestatus`).send({ data });
    }
}

export default UserApi;