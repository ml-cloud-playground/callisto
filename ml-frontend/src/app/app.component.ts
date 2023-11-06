import { Component } from '@angular/core';
import { EmotionService } from './emotion.service';
import { IScore } from './interfaces/IScore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly NEUTRAL = "Neutral";
  title = 'ml-frontend';
  score = this.NEUTRAL;
  constructor(
    private emotionService: EmotionService
  ) {

  }
  updateEmotion(event: any) {
    var input = event.target.value;
    if (input != "") {
      this.emotionService.analyzeInput(input).subscribe((data) => {
        this.score = (data as IScore).score;
      });
    }
    else {
      this.score = this.NEUTRAL;
    }

  }
}
