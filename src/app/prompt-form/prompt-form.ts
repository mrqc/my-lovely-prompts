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
  models: string[] = [
    "Generic",
    "OpenAI GPT-1",
    "OpenAI GPT-2",
    "OpenAI GPT-3",
    "OpenAI GPT-3.5",
    "OpenAI GPT-4",
    "OpenAI GPT-4V",
    "OpenAI GPT-4 Turbo",
    "OpenAI GPT-4.1",
    "OpenAI GPT-4.1 mini",
    "OpenAI GPT-4.1 nano",
    "OpenAI GPT-4.5",
    "OpenAI GPT-4o",
    "OpenAI GPT-4o mini",
    "OpenAI GPT-4o mini Audio",
    "OpenAI GPT-4o mini Realtime",
    "OpenAI GPT-4o mini Search Preview",
    "OpenAI GPT-4o mini Transcribe",
    "OpenAI GPT-4o mini TTS",
    "OpenAI GPT-4o Realtime",
    "OpenAI GPT-4o Transcribe",
    "OpenAI GPT-4o Transcribe Diarize",
    "OpenAI GPT-5",
    "OpenAI GPT-5.1",
    "OpenAI GPT-5.1 Chat",
    "OpenAI GPT-5.1 Codex",
    "OpenAI GPT-5.1 Codex mini",
    "OpenAI GPT-5 mini",
    "OpenAI GPT-5 nano",
    "OpenAI GPT-5 pro",
    "OpenAI GPT-5 Chat",
    "OpenAI GPT-5 Thinking",
    "OpenAI GPT-5 Thinking mini",
    "OpenAI GPT-5 Thinking nano",
    "OpenAI GPT-5 Thinking pro",
    "OpenAI o1",
    "OpenAI o1-mini",
    "OpenAI o1-pro",
    "OpenAI o3",
    "OpenAI o3-mini",
    "OpenAI o3-pro",
    "OpenAI o3-deep-research",
    "OpenAI o4-mini",
    "OpenAI o4-mini-deep-research",
    "OpenAI GPT Image 1",
    "OpenAI gpt-image-1-mini",
    "OpenAI Sora",
    "OpenAI Sora 2",
    "OpenAI Sora 2 Pro",
    "OpenAI Codex",
    "OpenAI gpt-oss-120b",
    "OpenAI gpt-oss-20b",
    "OpenAI text-embedding-3-large",
    "OpenAI text-embedding-3-small",
    "OpenAI text-embedding-ada-002",
    "OpenAI TTS-1",
    "OpenAI TTS-1 HD",
    "OpenAI Whisper",
    "OpenAI gpt-realtime",
    "OpenAI gpt-audio",
    "OpenAI gpt-realtime-mini",
    "OpenAI gpt-audio-mini",
    "OpenAI computer-use-preview",
    "Google BERT",
    "Google T5",
    "Google LaMDA",
    "Google PaLM",
    "Google PaLM 2",
    "Google Minerva",
    "Google Gemini 1.0 Nano-1",
    "Google Gemini 1.0 Nano-2",
    "Google Gemini 1.0 Pro",
    "Google Gemini 1.0 Ultra",
    "Google Gemini 1.5 Pro",
    "Google Gemini 1.5 Flash",
    "Google Gemini 2.0 Flash",
    "Google Gemini 2.0 Flash-Lite",
    "Google Gemini 2.5 Pro",
    "Google Gemini 2.5 Flash",
    "Google Gemini 2.5 Flash-Lite",
    "Google Gemini 2.5 Flash Image",
    "Google Gemini 2.5 Flash Gemini Live API",
    "Google Gemini 3 Pro",
    "Google Gemini 3 Pro Image",
    "Google Nano Banana",
    "Google Nano Banana Pro",
    "Google Imagen",
    "Google Veo",
    "Google Veo 3.1",
    "Google Veo 3.1 Fast",
    "Google Lyria",
    "Google SIMA",
    "Google MedLM-large-large",
    "Google Gemma 2B",
    "Google Gemma 7B",
    "Google Gemma 3 (4B)",
    "Google Gemma 3 (27B)",
    "Google CodeGemma",
    "Google PaliGemma",
    "Google PaliGemma 2",
    "Google TxGemma",
    "Google ShieldGemma 2",
    "Google WeatherNext 2",
    "Anthropic Claude v1",
    "Anthropic Claude 2",
    "Anthropic Claude 2.1",
    "Anthropic Claude 3 Haiku",
    "Anthropic Claude 3 Sonnet",
    "Anthropic Claude 3 Opus",
    "Anthropic Claude 3.5 Sonnet",
    "Anthropic Claude 3.5 Haiku",
    "Anthropic Claude 3.7 Sonnet",
    "Anthropic Claude 4 Opus",
    "Anthropic Claude 4 Sonnet",
    "Anthropic Claude 4.5 Haiku",
    "Anthropic Claude 4.5 Sonnet",
    "Anthropic Claude 4.5 Opus",
    "Meta AI LLaMA",
    "Meta AI Llama 2 (7B)",
    "Meta AI Llama 2 (13B)",
    "Meta AI Llama 2 (70B)",
    "Meta AI Code Llama (7B)",
    "Meta AI Code Llama (13B)",
    "Meta AI Code Llama (34B)",
    "Meta AI Code Llama (70B)",
    "Meta AI Llama 3 (8B)",
    "Meta AI Llama 3 (70B)",
    "Meta AI Llama 3.1 (8B)",
    "Meta AI Llama 3.1 (70B)",
    "Meta AI Llama 3.1 (405B)",
    "Meta AI Llama 3.2 (1B)",
    "Meta AI Llama 3.2 (3B)",
    "Meta AI Llama 3.2 Vision (11B)",
    "Meta AI Llama 3.2 Vision (90B)",
    "Meta AI Llama 3.3 (70B)",
    "Meta AI Llama 4 Scout",
    "Meta AI Llama 4 Maverick",
    "Meta AI Llama 4 Behemoth",
    "Meta AI Llama Guard 3",
    "Meta AI Emu",
    "Mistral AI Mistral 7B (v0.1)",
    "Mistral AI Mistral 7B (v0.2)",
    "Mistral AI Mistral 7B (v0.3)",
    "Mistral AI Mistral Small 1.0",
    "Mistral AI Mistral Small 2.0",
    "Mistral AI Mistral Small 3.1",
    "Mistral AI Mistral Small 3.2",
    "Mistral AI Mistral Medium 1.0",
    "Mistral AI Mistral Medium 3",
    "Mistral AI Mistral Medium 3.1",
    "Mistral AI Mistral Large 1.0",
    "Mistral AI Mistral Large 2.0",
    "Mistral AI Mistral Large 3",
    "Mistral AI Mixtral 8x7B",
    "Mistral AI Mixtral 8x22B",
    "Mistral AI Ministral 3B",
    "Mistral AI Ministral 3 8B",
    "Mistral AI Ministral 3 14B",
    "Mistral AI Magistral Small 1.2",
    "Mistral AI Magistral Medium 1.2",
    "Mistral AI Codestral",
    "Mistral AI Codestral Mamba 7B",
    "Mistral AI Devstral Small 2",
    "Mistral AI Devstral Medium 1.0",
    "Mistral AI Pixtral 12B",
    "Mistral AI Mathstral 7B",
    "Mistral AI Mistral Next",
    "xAI Grok-1",
    "xAI Grok-2",
    "xAI Grok-3",
    "xAI Grok-4",
    "xAI Grok-5",
    "Technology Innovation Institute (TII) Falcon 40B",
    "Technology Innovation Institute (TII) Falcon 180B",
    "Technology Innovation Institute (TII) Falcon 2 11B",
    "Cohere Command R",
    "Cohere Command R+",
    "Cohere Command A",
    "Cohere Command R7B",
    "Alibaba Qwen 1.5",
    "Alibaba Qwen 2",
    "Alibaba Qwen 3 (4B)",
    "Alibaba Qwen 3 (235B)",
    "Alibaba Qwen 2.5-Max",
    "Alibaba Qwen 2.5-VL-32B",
    "Microsoft Phi-3 Mini",
    "Microsoft Phi-3 Small",
    "Microsoft Phi-3 Medium",
    "Microsoft Orca (13B)",
    "Baidu Ernie 4.5",
    "Baidu Ernie X1",
    "DeepSeek DeepSeek-R1",
    "DeepSeek DeepSeek-V3",
    "DeepSeek DeepSeek-V2.5",
    "NVIDIA Nemotron-4 340B",
    "NVIDIA Nemotron Ultra 253B",
    "Databricks/MosaicML DBRX",
    "Databricks/MosaicML MPT-7B",
    "Databricks/MosaicML MPT-30B",
    "AI21 Labs Jamba",
    "Stability AI Stable LM 2 (1.6B)",
    "Stability AI Stable LM 2 (12B)",
    "IBM Granite",
    "Amazon Nova",
    "Amazon Nova Pro",
    "Amazon Nova Micro",
    "Inflection AI Inflection-2.5",
    "BigScience BLOOM",
    "EleutherAI GPT-J",
    "EleutherAI GPT-NeoX",
    "EleutherAI Pythia",
    "Stanford CRFM Alpaca 7B",
    "LMSYS Vicuna 33B",
    "LMSYS Tülu 3",
    "Flower AI Collective-1",
    "Open Source Collective NeoBERT"
  ];

  constructor(
    private formBuilder: FormBuilder,
    private promptService: PromptService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.promptForm = this.formBuilder.group({
      slug: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      text: ['', Validators.required],
      model: [this.models[0], Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      this.activePromptSlug = params.get('slug') ?? undefined;
      if (this.activePromptSlug) {
        const prompt = this.promptService.getPrompt(this.activePromptSlug);
        if (prompt) {
          this.promptForm.patchValue({
            slug: prompt.slug,
            name: prompt.name,
            text: prompt.text,
            model: prompt.model
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
        model: formValues.model,
        created_at: now,
        updated_at: now,
      };
      this.promptService.storePrompt(prompt);
      this.snackBar.open('Saved!', 'OK', { duration: 1500 });
    }
  }
}
