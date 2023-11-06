import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmotionService {
  host = '/api';
  constructor(private http: HttpClient) { }
  analyzeInput(input: string) {
    return this.http.get(`${this.host}/score/${input}`);
  }
}
