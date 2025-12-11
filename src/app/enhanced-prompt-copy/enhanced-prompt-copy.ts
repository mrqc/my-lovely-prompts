import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromptService, Prompt } from '../prompt.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-enhanced-prompt-copy',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './enhanced-prompt-copy.html',
  styleUrl: './enhanced-prompt-copy.css',
})
export class EnhancedPromptCopy {
  prompt?: Prompt;
  placeholders: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private promptService: PromptService,
    private snackBar: MatSnackBar
  ) {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.prompt = this.promptService.getPrompt(slug);
      if (this.prompt?.text) {
        const matches = Array.from(this.prompt.text.matchAll(/\{([^}]+)\}/g));
        this.placeholders = Array.from(new Set(matches.map(match => match[1])));
      }
    }
  }

  copy() {
    if ( !this.prompt) {
      return;
    }

    let filledPrompt = this.prompt.text;

    this.placeholders.forEach(placeholder => {
      const inputElement = document.getElementById(`placeholder-${placeholder}`) as HTMLInputElement;
      const value = inputElement ? inputElement.value : '';
      const regex = new RegExp(`\\{${placeholder}\\}`, 'g');
      filledPrompt = filledPrompt.replace(regex, value);
    });

    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(filledPrompt).catch(() => {
        this.snackBar.open('Failed copying to clipboard!', 'Dismiss', { duration: 1500 });
      });
      this.snackBar.open('Copied prompt text with filled placeholder!', 'OK', { duration: 1500 });
    }
  }
}
