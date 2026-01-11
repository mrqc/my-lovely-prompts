import {Component, OnDestroy, OnInit} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {Prompt, PromptService} from '../prompt.service';
import {Subject, takeUntil} from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatDivider} from '@angular/material/divider';
import { ChangeDetectorRef } from '@angular/core';

interface CollectionReference {
  slug: string;
  title: string;
  source: string;
  file: string;
}

interface Collections {
  collections: CollectionReference[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, MatIcon, MatDivider, HttpClientModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit, OnDestroy {

  storedUserPrompts: Prompt[] = [];
  collections: CollectionReference[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private promptService: PromptService,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.promptService
      .onPromptsChanged()
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => {
        this.storedUserPrompts = list;
      });
    this.storedUserPrompts = this.promptService.getAllPrompts();
    this.http.get<Collections>(`collections.json?t=${Date.now()}`)
      .subscribe({
        next: data => {
          this.collections = data.collections.slice();
          this.cdr.detectChanges();
        },
        error: () => {
          this.collections = [];
          this.cdr.detectChanges();
        },
      });
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
