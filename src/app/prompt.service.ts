import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Prompt {
  slug: string;
  name: string;
  model: string;
  created_at: string;
  updated_at: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private storageKey = 'prompts';
  private promptsChanged = new BehaviorSubject<Prompt[]>(this.getAllPrompts());

  onPromptsChanged(): Observable<Prompt[]> {
    return this.promptsChanged.asObservable();
  }

  private getPromptsMap(): Map<string, Prompt> {
    const data = localStorage.getItem(this.storageKey);
    if ( !data) {
      return new Map();
    }
    try {
      const obj = JSON.parse(data);
      return new Map(Object.entries(obj));
    } catch {
      return new Map();
    }
  }

  private savePromptsMap(map: Map<string, Prompt>): void {
    const obj = Object.fromEntries(map);
    localStorage.setItem(this.storageKey, JSON.stringify(obj));
  }

  storePrompt(prompt: Prompt): void {
    const map = this.getPromptsMap();
    map.set(prompt.slug, prompt);
    this.savePromptsMap(map);
    this.promptsChanged.next(this.getAllPrompts());
  }

  getPrompt(slug: string): Prompt | undefined {
    const map = this.getPromptsMap();
    return map.get(slug);
  }

  getAllPrompts(): Prompt[] {
    return Array.from(this.getPromptsMap().values());
  }

  deletePrompt(slug: string): void {
    const map = this.getPromptsMap();
    map.delete(slug);
    this.savePromptsMap(map);
    this.promptsChanged.next(this.getAllPrompts());
  }
}
