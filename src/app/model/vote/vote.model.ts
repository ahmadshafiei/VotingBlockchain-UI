export class Vote {
    electionAddress: string;
    candidate: string;

    constructor(electionAddress: string, candidate: string) {
        this.electionAddress = electionAddress;
        this.candidate = candidate;
    }
}