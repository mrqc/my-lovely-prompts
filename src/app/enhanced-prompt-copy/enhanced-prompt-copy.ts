import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromptService, Prompt } from '../prompt.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ModelService } from '../model.service';

@Component({
  selector: 'app-enhanced-prompt-copy',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './enhanced-prompt-copy.html',
  styleUrl: './enhanced-prompt-copy.css',
})
export class EnhancedPromptCopy {
  prompt?: Prompt;
  placeholders: string[] = [];
  placeholderCount: number = 2;

  constructor(
    private route: ActivatedRoute,
    private promptService: PromptService,
    private snackBar: MatSnackBar,
    private modelService: ModelService
  ) {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug') ?? undefined;
      if (slug) {
        this.prompt = this.promptService.getPrompt(slug);
        if (this.prompt?.text) {
          const matches = Array.from(this.prompt.text.matchAll(/\{([^}]+)\}/g));
          if (matches.length > 0) {
            this.placeholders = Array.from(new Set(matches.map(match => match[1])));
            this.placeholderCount = 2;
          } else {
            this.placeholders = [];
            this.placeholderCount = 0;
          }
        }
      }
    });
  }

  getFilledPrompt(): string {
    if ( !this.prompt) {
      return '';
    }
    let promptText = this.prompt.text;
    let filledPrompt = '';
    Array.from(Array(this.placeholderCount).keys()).forEach(count => {
      this.placeholders.forEach(placeholder => {
        const inputElement = document.getElementById(`placeholder-${count}-${placeholder}`) as HTMLInputElement;
        const value = inputElement ? inputElement.value : '';
        const regex = new RegExp(`\\{${placeholder}\\}`, 'g');
        filledPrompt += promptText.replace(regex, value) + '\n\n';
      });
    });
    return filledPrompt;
  }

  copy() {
    if ( !this.prompt) {
      return;
    }

    let filledPrompt = this.getFilledPrompt();

    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(filledPrompt).catch(() => {
        this.snackBar.open('Failed copying to clipboard!', 'Dismiss', { duration: 1500 });
      });
      this.snackBar.open('Copied prompt text with filled placeholder!', 'OK', { duration: 1500 });
    }
  }

  openInModelPlayground() {
    if ( !this.prompt) {
      this.snackBar.open('No prompt loaded.', 'Dismiss', { duration: 1500 });
      return;
    }
    const model = this.modelService.getModelById(this.prompt.modelId);
    if ( !model || !model.playgroundUrl) {
      this.snackBar.open('No playground URL available for this model.', 'Dismiss', { duration: 1500 });
      return;
    }
    let url = model.playgroundUrl
      .replace('{prompt}', encodeURIComponent(this.getFilledPrompt()));
    window.open(url, '_blank');
  }

  incrementPlaceholderCount() {
    this.placeholderCount++;
  }

  decrementPlaceholderCount() {
    if (this.placeholderCount > 1) {
      this.placeholderCount--;
    }
  }

  onPlaceholderCountInput(event: Event) {
    const value = parseInt((event.target as HTMLInputElement).value, 10);
    this.placeholderCount = isNaN(value) || value < 1 ? 1 : value;
  }

  protected readonly Array = Array;
}
