import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IScore } from './interfaces/IScore';

@Injectable()
export class AppService {
  static readonly scoringHost = 'http://ml-processing:5000';
  async getScore(input: string): Promise<IScore> {
    try {
      const scoringEndPoint = `${AppService.scoringHost}/score?input=${input}`;
      const response = await axios.get(scoringEndPoint);
      return <IScore>{ score: response.data };
    } catch (error) {
      console.error(error);
    }
  }
}
