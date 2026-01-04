import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { PromptService, Prompt } from '../prompt.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ModelService } from '../model.service';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-enhanced-prompt-copy',
  imports: [MatDividerModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './enhanced-prompt-copy.html',
  styleUrl: './enhanced-prompt-copy.css',
})
export class EnhancedPromptCopy {
  prompt?: Prompt;
  placeholders: string[] = [];
  placeholderCount: number = 2;
  selectedModelId: string = '';

  constructor(
    protected modelService: ModelService,
    private route: ActivatedRoute,
    private promptService: PromptService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    const navigation = this.router.currentNavigation();
    const prompt = navigation?.extras.state?.['prompt'];
    if (prompt) {
      this.prompt = prompt;
      this.prepareIterationUi();
      this.prepareModelSelection();
    }

    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug') ?? undefined;
      if (slug) {
        this.prompt = this.promptService.getPrompt(slug);
        this.prepareIterationUi();
        this.prepareModelSelection();
      }
    });
  }

  prepareModelSelection() {
    if (this.prompt) {
      this.selectedModelId = this.prompt.modelId;
    }
  }

  prepareIterationUi() {
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

  getFilledPrompts(): string {
    if ( !this.prompt) {
      return '';
    }
    let promptText = this.prompt.text;
    let filledPrompt = '';
    Array.from(Array(this.placeholderCount).keys()).forEach(count => {
      filledPrompt += this.getFilledPrompt(count);
    });
    return filledPrompt;
  }

  getFilledPrompt(iteration: number): string {
    if ( !this.prompt) {
      return '';
    }
    let promptText = this.prompt.text;
    let filledPrompt = '';
    this.placeholders.forEach(placeholder => {
      const inputElement = document.getElementById(`placeholder-${iteration}-${placeholder}`) as HTMLInputElement;
      const value = inputElement ? inputElement.value : '';
      const regex = new RegExp(`\\{${placeholder}\\}`, 'g');
      filledPrompt += promptText.replace(regex, value) + '\n\n';
    });
    return filledPrompt;
  }

  copyAllIterations() {
    if ( !this.prompt) {
      return;
    }

    let filledPrompt = this.getFilledPrompts();

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
    const model = this.modelService.getModelById(this.selectedModelId);
    if ( !model || !model.playgroundUrl) {
      this.snackBar.open('No playground URL available for this model.', 'Dismiss', { duration: 1500 });
      return;
    }
    let url = model.playgroundUrl
      .replace('{prompt}', encodeURIComponent(this.getFilledPrompts()));
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

  copyIteration(iteration: number) {
    if ( !this.prompt) {
      return;
    }
    let filledPrompt = this.getFilledPrompt(iteration);
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(filledPrompt).catch(() => {
        this.snackBar.open('Failed copying to clipboard!', 'Dismiss', { duration: 1500 });
      });
      this.snackBar.open('Copied prompt text with filled placeholder!', 'OK', { duration: 1500 });
    }
  }

  openIterationInPlayground(iteration: number) {
    if ( !this.prompt) {
      this.snackBar.open('No prompt loaded.', 'Dismiss', { duration: 1500 });
      return;
    }
    const model = this.modelService.getModelById(this.selectedModelId);
    if ( !model || !model.playgroundUrl) {
      this.snackBar.open('No playground URL available for this model.', 'Dismiss', { duration: 1500 });
      return;
    }
    let url = model.playgroundUrl
      .replace('{prompt}', encodeURIComponent(this.getFilledPrompt(iteration)));
    window.open(url, '_blank');
  }
}
