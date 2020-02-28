

export class ElectionVote {
    election: string;
    electionStatus: ElectionStatus;
    candidates: CandidateVotes[];

    labels: string[];
    data: number[];
}

export class CandidateVotes {
    candidate: string;
    totalVotes: number
}

export enum ElectionStatus {
    pending = 1,
    closed = 2
}