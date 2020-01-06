import { Pagination } from '../common/pagination.model';

export class ElectionSearch extends Pagination {

    name: string;
    address: string;

    constructor() {
        super();
    }

}