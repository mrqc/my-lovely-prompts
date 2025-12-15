import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {Prompt, PromptService} from '../prompt.service';
import {ActivatedRoute} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Model, ModelService} from '../model.service';


@Component({
  selector: 'app-prompt-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './prompt-form.html',
  styleUrl: './prompt-form.css',
})
export class PromptForm {
  promptForm: FormGroup;
  activePromptSlug?: string;
  models: Model[];

  constructor(
    private formBuilder: FormBuilder,
    private promptService: PromptService,
    private modelService: ModelService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.models = this.modelService.getModels();
    this.promptForm = this.formBuilder.group({
      slug: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      text: ['', Validators.required],
      modelId: [this.models[0].id, Validators.required]
    });

    const slug = this.route.snapshot.paramMap.get('slug');
    const name = this.route.snapshot.paramMap.get('name');
    const modelId = this.route.snapshot.paramMap.get('model');
    const text = this.route.snapshot.paramMap.get('text');
    if (name && modelId && text && slug) {
      this.promptForm.patchValue({
        slug: slug,
        name: name,
        text: text,
        modelId: modelId
      });
      return;
    }

    this.route.paramMap.subscribe(params => {
      this.activePromptSlug = params.get('slug') ?? undefined;
      if (this.activePromptSlug) {
        const prompt = this.promptService.getPrompt(this.activePromptSlug);
        if (prompt) {
          this.promptForm.patchValue({
            slug: prompt.slug,
            name: prompt.name,
            text: prompt.text,
            modelId: prompt.modelId
          });
        }
      }
    });

    this.promptForm.get('name')?.valueChanges.subscribe((value: string) => {
      const normalizedSlug = this.normalizeSlug(value);
      this.promptForm.get('slug')?.setValue(normalizedSlug);
    });
  }

  private normalizeSlug(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  save() {
    if (this.promptForm.valid) {
      const now = new Date().toISOString();
      const formValues = this.promptForm.getRawValue();
      const prompt: Prompt = {
        slug: formValues.slug,
        name: formValues.name,
        text: formValues.text,
        modelId: formValues.modelId,
        createdAt: now,
        updatedAt: now,
      };
      this.promptService.storePrompt(prompt);
      this.snackBar.open('Saved!', 'OK', { duration: 1500 });
    }
  }
}
