import request from 'superagent';
import { HOST } from './../contants/index';

class SectorApi {
    static add(data) {
        return request.post(`${HOST}sector/add`).send({ data });
    }

    static update(data) {
        return request.post(`${HOST}sector/update`).send({ data });
    }

    static delete(id = -1) {
        return request.post(`${HOST}sector/delete`).send({ id });
    }

    static getAll(page = 1) {
        return request.post(`${HOST}sector/getall`).send({ page });
    }

    static getOne(id = -1) {
        return request.post(`${HOST}sector/getone`).send({ id });
    }

    static updateStatus(data) {
        return request.post(`${HOST}sector/updatestatus`).send({ data });
    }
}

export default SectorApi;