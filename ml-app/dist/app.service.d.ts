import { IScore } from './interfaces/IScore';
export declare class AppService {
    static readonly scoringHost = "http://localhost:11434/api/generate";
    getScore(input: string): Promise<IScore>;
}
