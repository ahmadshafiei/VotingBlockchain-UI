import { ElectionCandidate } from './electionCandidate.model';

export class Election {

    id : number;
    name: string;
    address: string;
    candidates: ElectionCandidate[] = [];
    
}