import { AppService } from './app.service';
import { IScore } from './interfaces/IScore';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    score(input: any): Promise<IScore>;
}
