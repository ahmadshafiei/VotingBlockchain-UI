import { ElectionCandidate } from './electionCandidate.model';

export class Election {

    id: number = null;
    name: string;
    address: string;
    insertDate: Date = null;
    candidates: ElectionCandidate[] = [];

}