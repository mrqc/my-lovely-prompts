import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule, Router} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Prompt} from '../prompt.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


interface PromptCollection {
  prompts: Prompt[];
  title: string;
  description: string;
}

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [RouterModule, HttpClientModule, MatCardModule, MatButtonModule],
  templateUrl: './main-content.html',
  styleUrl: './main-content.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContent implements OnInit {

  prompts: Prompt[] = [];
  title: string = "";
  description: string = "";

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private changeDetectionRef: ChangeDetectorRef,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if ( !slug) {
        return;
      }

      this.http.get<PromptCollection>(`/prompt-collections/${slug}.json`)
        .subscribe({
          next: data => {
            this.prompts = data.prompts;
            this.title = data.title;
            this.description = data.description;
            this.changeDetectionRef.markForCheck();
          },
          error: () => {
            this.prompts = [];
            this.title = '';
            this.description = '';
            this.changeDetectionRef.markForCheck();
          },
        });
    });
  }

  goToCopyEnhancedPrompt(prompt: Prompt) {
    this.router.navigateByUrl(`/copy`, { state: { prompt: prompt } });
  }
  goToSavePrompt(prompt: Prompt) {
    this.router.navigateByUrl(`/prompt`, { state: { prompt: prompt } });
  }
}
