import { Routes } from '@angular/router';
import { MainContent } from './main-content/main-content';
import {PromptForm} from './prompt-form/prompt-form';
import {EnhancedPromptCopy} from './enhanced-prompt-copy/enhanced-prompt-copy';

export const routes: Routes = [
  { path: '', component: MainContent },
  { path: 'prompt', component: PromptForm },
  { path: 'prompt/:slug', component: PromptForm },
  { path: 'copy/:slug', component: EnhancedPromptCopy },
  { path: '**', redirectTo: '' }
];
