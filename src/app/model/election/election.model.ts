import { ElectionCandidate } from './electionCandidate.model';
import { ElectionStatus } from './electionVote.model';

export class Election {

    id: number = null;
    name: string;
    address: string;
    insertDate: Date = null;
    status : ElectionStatus;
    candidates: ElectionCandidate[] = [];

}