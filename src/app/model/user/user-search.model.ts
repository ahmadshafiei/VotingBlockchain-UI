import { Pagination } from '../common/pagination.model';

export class UserSearch extends Pagination {

    name: string;
    address: string;

    constructor() {
        super();
    }

}