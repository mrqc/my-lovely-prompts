import {Component, OnDestroy, OnInit} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {Prompt, PromptService} from '../prompt.service';
import {Subject, takeUntil} from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, MatIcon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit, OnDestroy {

  prompts: Prompt[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private promptService: PromptService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.promptService
      .onPromptsChanged()
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => {
        this.prompts = list;
      });
    this.prompts = this.promptService.getAllPrompts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  copyPrompt(prompt: Prompt): void {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(prompt.text).catch(() => {
        this.snackBar.open('Failed copying to clipboard!', 'Dismiss', { duration: 1500 });
      });
      this.snackBar.open('Copied prompt text to clipboard!', 'OK', { duration: 1500 });
    }
  }

  deletePrompt(prompt: Prompt): void {
    if (confirm(`Are you sure you want to delete the prompt '${prompt.slug}'?`)) {
      this.promptService.deletePrompt(prompt.slug);
    }
  }

  openEnhancedCopy(prompt: Prompt) {
    this.router.navigate([`/copy/${prompt.slug}`]);
  }
}
