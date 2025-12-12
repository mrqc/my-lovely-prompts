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
  models: { name: string; playgroundUrl: string; id: string }[] = [
    { name: "Generic", playgroundUrl: "", id: "generic" },
    { name: "OpenAI GPT-1", playgroundUrl: "", id: "openai-gpt-1" },
    { name: "OpenAI GPT-2", playgroundUrl: "", id: "openai-gpt-2" },
    { name: "OpenAI GPT-3", playgroundUrl: "", id: "openai-gpt-3" },
    { name: "OpenAI GPT-3.5", playgroundUrl: "", id: "openai-gpt-3-5" },
    { name: "OpenAI GPT-4", playgroundUrl: "", id: "openai-gpt-4" },
    { name: "OpenAI GPT-4V", playgroundUrl: "", id: "openai-gpt-4v" },
    { name: "OpenAI GPT-4 Turbo", playgroundUrl: "", id: "openai-gpt-4-turbo" },
    { name: "OpenAI GPT-4.1", playgroundUrl: "", id: "openai-gpt-4-1" },
    { name: "OpenAI GPT-4.1 mini", playgroundUrl: "", id: "openai-gpt-4-1-mini" },
    { name: "OpenAI GPT-4.1 nano", playgroundUrl: "", id: "openai-gpt-4-1-nano" },
    { name: "OpenAI GPT-4.5", playgroundUrl: "", id: "openai-gpt-4-5" },
    { name: "OpenAI GPT-4o", playgroundUrl: "", id: "openai-gpt-4o" },
    { name: "OpenAI GPT-4o mini", playgroundUrl: "", id: "openai-gpt-4o-mini" },
    { name: "OpenAI GPT-4o mini Audio", playgroundUrl: "", id: "openai-gpt-4o-mini-audio" },
    { name: "OpenAI GPT-4o mini Realtime", playgroundUrl: "", id: "openai-gpt-4o-mini-realtime" },
    { name: "OpenAI GPT-4o mini Search Preview", playgroundUrl: "", id: "openai-gpt-4o-mini-search-preview" },
    { name: "OpenAI GPT-4o mini Transcribe", playgroundUrl: "", id: "openai-gpt-4o-mini-transcribe" },
    { name: "OpenAI GPT-4o mini TTS", playgroundUrl: "", id: "openai-gpt-4o-mini-tts" },
    { name: "OpenAI GPT-4o Realtime", playgroundUrl: "", id: "openai-gpt-4o-realtime" },
    { name: "OpenAI GPT-4o Transcribe", playgroundUrl: "", id: "openai-gpt-4o-transcribe" },
    { name: "OpenAI GPT-4o Transcribe Diarize", playgroundUrl: "", id: "openai-gpt-4o-transcribe-diarize" },
    { name: "OpenAI GPT-5", playgroundUrl: "", id: "openai-gpt-5" },
    { name: "OpenAI GPT-5.1", playgroundUrl: "", id: "openai-gpt-5-1" },
    { name: "OpenAI GPT-5.1 Chat", playgroundUrl: "", id: "openai-gpt-5-1-chat" },
    { name: "OpenAI GPT-5.1 Codex", playgroundUrl: "", id: "openai-gpt-5-1-codex" },
    { name: "OpenAI GPT-5.1 Codex mini", playgroundUrl: "", id: "openai-gpt-5-1-codex-mini" },
    { name: "OpenAI GPT-5 mini", playgroundUrl: "", id: "openai-gpt-5-mini" },
    { name: "OpenAI GPT-5 nano", playgroundUrl: "", id: "openai-gpt-5-nano" },
    { name: "OpenAI GPT-5 pro", playgroundUrl: "", id: "openai-gpt-5-pro" },
    { name: "OpenAI GPT-5 Chat", playgroundUrl: "", id: "openai-gpt-5-chat" },
    { name: "OpenAI GPT-5 Thinking", playgroundUrl: "", id: "openai-gpt-5-thinking" },
    { name: "OpenAI GPT-5 Thinking mini", playgroundUrl: "", id: "openai-gpt-5-thinking-mini" },
    { name: "OpenAI GPT-5 Thinking nano", playgroundUrl: "", id: "openai-gpt-5-thinking-nano" },
    { name: "OpenAI GPT-5 Thinking pro", playgroundUrl: "", id: "openai-gpt-5-thinking-pro" },
    { name: "OpenAI o1", playgroundUrl: "", id: "openai-o1" },
    { name: "OpenAI o1-mini", playgroundUrl: "", id: "openai-o1-mini" },
    { name: "OpenAI o1-pro", playgroundUrl: "", id: "openai-o1-pro" },
    { name: "OpenAI o3", playgroundUrl: "", id: "openai-o3" },
    { name: "OpenAI o3-mini", playgroundUrl: "", id: "openai-o3-mini" },
    { name: "OpenAI o3-pro", playgroundUrl: "", id: "openai-o3-pro" },
    { name: "OpenAI o3-deep-research", playgroundUrl: "", id: "openai-o3-deep-research" },
    { name: "OpenAI o4-mini", playgroundUrl: "", id: "openai-o4-mini" },
    { name: "OpenAI o4-mini-deep-research", playgroundUrl: "", id: "openai-o4-mini-deep-research" },
    { name: "OpenAI GPT Image 1", playgroundUrl: "", id: "openai-gpt-image-1" },
    { name: "OpenAI gpt-image-1-mini", playgroundUrl: "", id: "openai-gpt-image-1-mini" },
    { name: "OpenAI Sora", playgroundUrl: "", id: "openai-sora" },
    { name: "OpenAI Sora 2", playgroundUrl: "", id: "openai-sora-2" },
    { name: "OpenAI Sora 2 Pro", playgroundUrl: "", id: "openai-sora-2-pro" },
    { name: "OpenAI Codex", playgroundUrl: "", id: "openai-codex" },
    { name: "OpenAI gpt-oss-120b", playgroundUrl: "", id: "openai-gpt-oss-120b" },
    { name: "OpenAI gpt-oss-20b", playgroundUrl: "", id: "openai-gpt-oss-20b" },
    { name: "OpenAI text-embedding-3-large", playgroundUrl: "", id: "openai-text-embedding-3-large" },
    { name: "OpenAI text-embedding-3-small", playgroundUrl: "", id: "openai-text-embedding-3-small" },
    { name: "OpenAI text-embedding-ada-002", playgroundUrl: "", id: "openai-text-embedding-ada-002" },
    { name: "OpenAI TTS-1", playgroundUrl: "", id: "openai-tts-1" },
    { name: "OpenAI TTS-1 HD", playgroundUrl: "", id: "openai-tts-1-hd" },
    { name: "OpenAI Whisper", playgroundUrl: "", id: "openai-whisper" },
    { name: "OpenAI gpt-realtime", playgroundUrl: "", id: "openai-gpt-realtime" },
    { name: "OpenAI gpt-audio", playgroundUrl: "", id: "openai-gpt-audio" },
    { name: "OpenAI gpt-realtime-mini", playgroundUrl: "", id: "openai-gpt-realtime-mini" },
    { name: "OpenAI gpt-audio-mini", playgroundUrl: "", id: "openai-gpt-audio-mini" },
    { name: "OpenAI computer-use-preview", playgroundUrl: "", id: "openai-computer-use-preview" },
    { name: "Google BERT", playgroundUrl: "", id: "google-bert" },
    { name: "Google T5", playgroundUrl: "", id: "google-t5" },
    { name: "Google LaMDA", playgroundUrl: "", id: "google-lamda" },
    { name: "Google PaLM", playgroundUrl: "", id: "google-palm" },
    { name: "Google PaLM 2", playgroundUrl: "", id: "google-palm-2" },
    { name: "Google Minerva", playgroundUrl: "", id: "google-minerva" },
    { name: "Google Gemini 1.0 Nano-1", playgroundUrl: "", id: "google-gemini-1-0-nano-1" },
    { name: "Google Gemini 1.0 Nano-2", playgroundUrl: "", id: "google-gemini-1-0-nano-2" },
    { name: "Google Gemini 1.0 Pro", playgroundUrl: "", id: "google-gemini-1-0-pro" },
    { name: "Google Gemini 1.0 Ultra", playgroundUrl: "", id: "google-gemini-1-0-ultra" },
    { name: "Google Gemini 1.5 Pro", playgroundUrl: "", id: "google-gemini-1-5-pro" },
    { name: "Google Gemini 1.5 Flash", playgroundUrl: "", id: "google-gemini-1-5-flash" },
    { name: "Google Gemini 2.0 Flash", playgroundUrl: "", id: "google-gemini-2-0-flash" },
    { name: "Google Gemini 2.0 Flash-Lite", playgroundUrl: "", id: "google-gemini-2-0-flash-lite" },
    { name: "Google Gemini 2.5 Pro", playgroundUrl: "", id: "google-gemini-2-5-pro" },
    { name: "Google Gemini 2.5 Flash", playgroundUrl: "", id: "google-gemini-2-5-flash" },
    { name: "Google Gemini 2.5 Flash-Lite", playgroundUrl: "", id: "google-gemini-2-5-flash-lite" },
    { name: "Google Gemini 2.5 Flash Image", playgroundUrl: "", id: "google-gemini-2-5-flash-image" },
    { name: "Google Gemini 2.5 Flash Gemini Live API", playgroundUrl: "", id: "google-gemini-2-5-flash-gemini-live-api" },
    { name: "Google Gemini 3 Pro", playgroundUrl: "", id: "google-gemini-3-pro" },
    { name: "Google Gemini 3 Pro Image", playgroundUrl: "", id: "google-gemini-3-pro-image" },
    { name: "Google Nano Banana", playgroundUrl: "", id: "google-nano-banana" },
    { name: "Google Nano Banana Pro", playgroundUrl: "", id: "google-nano-banana-pro" },
    { name: "Google Imagen", playgroundUrl: "", id: "google-imagen" },
    { name: "Google Veo", playgroundUrl: "", id: "google-veo" },
    { name: "Google Veo 3.1", playgroundUrl: "", id: "google-veo-3-1" },
    { name: "Google Veo 3.1 Fast", playgroundUrl: "", id: "google-veo-3-1-fast" },
    { name: "Google Lyria", playgroundUrl: "", id: "google-lyria" },
    { name: "Google SIMA", playgroundUrl: "", id: "google-sima" },
    { name: "Google MedLM-large-large", playgroundUrl: "", id: "google-medlm-large-large" },
    { name: "Google Gemma 2B", playgroundUrl: "", id: "google-gemma-2b" },
    { name: "Google Gemma 7B", playgroundUrl: "", id: "google-gemma-7b" },
    { name: "Google Gemma 3 (4B)", playgroundUrl: "", id: "google-gemma-3-4b" },
    { name: "Google Gemma 3 (27B)", playgroundUrl: "", id: "google-gemma-3-27b" },
    { name: "Google CodeGemma", playgroundUrl: "", id: "google-codegemma" },
    { name: "Google PaliGemma", playgroundUrl: "", id: "google-paligemma" },
    { name: "Google PaliGemma 2", playgroundUrl: "", id: "google-paligemma-2" },
    { name: "Google TxGemma", playgroundUrl: "", id: "google-txgemma" },
    { name: "Google ShieldGemma 2", playgroundUrl: "", id: "google-shieldgemma-2" },
    { name: "Google WeatherNext 2", playgroundUrl: "", id: "google-weathernext-2" },
    { name: "Anthropic Claude v1", playgroundUrl: "", id: "anthropic-claude-v1" },
    { name: "Anthropic Claude 2", playgroundUrl: "", id: "anthropic-claude-2" },
    { name: "Anthropic Claude 2.1", playgroundUrl: "", id: "anthropic-claude-2-1" },
    { name: "Anthropic Claude 3 Haiku", playgroundUrl: "", id: "anthropic-claude-3-haiku" },
    { name: "Anthropic Claude 3 Sonnet", playgroundUrl: "", id: "anthropic-claude-3-sonnet" },
    { name: "Anthropic Claude 3 Opus", playgroundUrl: "", id: "anthropic-claude-3-opus" },
    { name: "Anthropic Claude 3.5 Sonnet", playgroundUrl: "", id: "anthropic-claude-3-5-sonnet" },
    { name: "Anthropic Claude 3.5 Haiku", playgroundUrl: "", id: "anthropic-claude-3-5-haiku" },
    { name: "Anthropic Claude 3.7 Sonnet", playgroundUrl: "", id: "anthropic-claude-3-7-sonnet" },
    { name: "Anthropic Claude 4 Opus", playgroundUrl: "", id: "anthropic-claude-4-opus" },
    { name: "Anthropic Claude 4 Sonnet", playgroundUrl: "", id: "anthropic-claude-4-sonnet" },
    { name: "Anthropic Claude 4.5 Haiku", playgroundUrl: "", id: "anthropic-claude-4-5-haiku" },
    { name: "Anthropic Claude 4.5 Sonnet", playgroundUrl: "", id: "anthropic-claude-4-5-sonnet" },
    { name: "Anthropic Claude 4.5 Opus", playgroundUrl: "", id: "anthropic-claude-4-5-opus" },
    { name: "Meta AI LLaMA", playgroundUrl: "", id: "meta-ai-llama" },
    { name: "Meta AI Llama 2 (7B)", playgroundUrl: "", id: "meta-ai-llama-2-7b" },
    { name: "Meta AI Llama 2 (13B)", playgroundUrl: "", id: "meta-ai-llama-2-13b" },
    { name: "Meta AI Llama 2 (70B)", playgroundUrl: "", id: "meta-ai-llama-2-70b" },
    { name: "Meta AI Code Llama (7B)", playgroundUrl: "", id: "meta-ai-code-llama-7b" },
    { name: "Meta AI Code Llama (13B)", playgroundUrl: "", id: "meta-ai-code-llama-13b" },
    { name: "Meta AI Code Llama (34B)", playgroundUrl: "", id: "meta-ai-code-llama-34b" },
    { name: "Meta AI Code Llama (70B)", playgroundUrl: "", id: "meta-ai-code-llama-70b" },
    { name: "Meta AI Llama 3 (8B)", playgroundUrl: "", id: "meta-ai-llama-3-8b" },
    { name: "Meta AI Llama 3 (70B)", playgroundUrl: "", id: "meta-ai-llama-3-70b" },
    { name: "Meta AI Llama 3.1 (8B)", playgroundUrl: "", id: "meta-ai-llama-3-1-8b" },
    { name: "Meta AI Llama 3.1 (70B)", playgroundUrl: "", id: "meta-ai-llama-3-1-70b" },
    { name: "Meta AI Llama 3.1 (405B)", playgroundUrl: "", id: "meta-ai-llama-3-1-405b" },
    { name: "Meta AI Llama 3.2 (1B)", playgroundUrl: "", id: "meta-ai-llama-3-2-1b" },
    { name: "Meta AI Llama 3.2 (3B)", playgroundUrl: "", id: "meta-ai-llama-3-2-3b" },
    { name: "Meta AI Llama 3.2 Vision (11B)", playgroundUrl: "", id: "meta-ai-llama-3-2-vision-11b" },
    { name: "Meta AI Llama 3.2 Vision (90B)", playgroundUrl: "", id: "meta-ai-llama-3-2-vision-90b" },
    { name: "Meta AI Llama 3.3 (70B)", playgroundUrl: "", id: "meta-ai-llama-3-3-70b" },
    { name: "Meta AI Llama 4 Scout", playgroundUrl: "", id: "meta-ai-llama-4-scout" },
    { name: "Meta AI Llama 4 Maverick", playgroundUrl: "", id: "meta-ai-llama-4-maverick" },
    { name: "Meta AI Llama 4 Behemoth", playgroundUrl: "", id: "meta-ai-llama-4-behemoth" },
    { name: "Meta AI Llama Guard 3", playgroundUrl: "", id: "meta-ai-llama-guard-3" },
    { name: "Meta AI Emu", playgroundUrl: "", id: "meta-ai-emu" },
    { name: "Mistral AI Mistral 7B (v0.1)", playgroundUrl: "", id: "mistral-ai-mistral-7b-v0-1" },
    { name: "Mistral AI Mistral 7B (v0.2)", playgroundUrl: "", id: "mistral-ai-mistral-7b-v0-2" },
    { name: "Mistral AI Mistral 7B (v0.3)", playgroundUrl: "", id: "mistral-ai-mistral-7b-v0-3" },
    { name: "Mistral AI Mistral Small 1.0", playgroundUrl: "", id: "mistral-ai-mistral-small-1-0" },
    { name: "Mistral AI Mistral Small 2.0", playgroundUrl: "", id: "mistral-ai-mistral-small-2-0" },
    { name: "Mistral AI Mistral Small 3.1", playgroundUrl: "", id: "mistral-ai-mistral-small-3-1" },
    { name: "Mistral AI Mistral Small 3.2", playgroundUrl: "", id: "mistral-ai-mistral-small-3-2" },
    { name: "Mistral AI Mistral Medium 1.0", playgroundUrl: "", id: "mistral-ai-mistral-medium-1-0" },
    { name: "Mistral AI Mistral Medium 3", playgroundUrl: "", id: "mistral-ai-mistral-medium-3" },
    { name: "Mistral AI Mistral Medium 3.1", playgroundUrl: "", id: "mistral-ai-mistral-medium-3-1" },
    { name: "Mistral AI Mistral Large 1.0", playgroundUrl: "", id: "mistral-ai-mistral-large-1-0" },
    { name: "Mistral AI Mistral Large 2.0", playgroundUrl: "", id: "mistral-ai-mistral-large-2-0" },
    { name: "Mistral AI Mistral Large 3", playgroundUrl: "", id: "mistral-ai-mistral-large-3" },
    { name: "Mistral AI Mixtral 8x7B", playgroundUrl: "", id: "mistral-ai-mixtral-8x7b" },
    { name: "Mistral AI Mixtral 8x22B", playgroundUrl: "", id: "mistral-ai-mixtral-8x22b" },
    { name: "Mistral AI Ministral 3B", playgroundUrl: "", id: "mistral-ai-ministral-3b" },
    { name: "Mistral AI Ministral 3 8B", playgroundUrl: "", id: "mistral-ai-ministral-3-8b" },
    { name: "Mistral AI Ministral 3 14B", playgroundUrl: "", id: "mistral-ai-ministral-3-14b" },
    { name: "Mistral AI Magistral Small 1.2", playgroundUrl: "", id: "mistral-ai-magistral-small-1-2" },
    { name: "Mistral AI Magistral Medium 1.2", playgroundUrl: "", id: "mistral-ai-magistral-medium-1-2" },
    { name: "Mistral AI Codestral", playgroundUrl: "", id: "mistral-ai-codestral" },
    { name: "Mistral AI Codestral Mamba 7B", playgroundUrl: "", id: "mistral-ai-codestral-mamba-7b" },
    { name: "Mistral AI Devstral Small 2", playgroundUrl: "", id: "mistral-ai-devstral-small-2" },
    { name: "Mistral AI Devstral Medium 1.0", playgroundUrl: "", id: "mistral-ai-devstral-medium-1-0" },
    { name: "Mistral AI Pixtral 12B", playgroundUrl: "", id: "mistral-ai-pixtral-12b" },
    { name: "Mistral AI Mathstral 7B", playgroundUrl: "", id: "mistral-ai-mathstral-7b" },
    { name: "Mistral AI Mistral Next", playgroundUrl: "", id: "mistral-ai-mistral-next" },
    { name: "xAI Grok-1", playgroundUrl: "", id: "xai-grok-1" },
    { name: "xAI Grok-2", playgroundUrl: "", id: "xai-grok-2" },
    { name: "xAI Grok-3", playgroundUrl: "", id: "xai-grok-3" },
    { name: "xAI Grok-4", playgroundUrl: "", id: "xai-grok-4" },
    { name: "xAI Grok-5", playgroundUrl: "", id: "xai-grok-5" },
    { name: "Technology Innovation Institute (TII) Falcon 40B", playgroundUrl: "", id: "technology-innovation-institute-tii-falcon-40b" },
    { name: "Technology Innovation Institute (TII) Falcon 180B", playgroundUrl: "", id: "technology-innovation-institute-tii-falcon-180b" },
    { name: "Technology Innovation Institute (TII) Falcon 2 11B", playgroundUrl: "", id: "technology-innovation-institute-tii-falcon-2-11b" },
    { name: "Cohere Command R", playgroundUrl: "", id: "cohere-command-r" },
    { name: "Cohere Command R+", playgroundUrl: "", id: "cohere-command-r+" },
    { name: "Cohere Command A", playgroundUrl: "", id: "cohere-command-a" },
    { name: "Cohere Command R7B", playgroundUrl: "", id: "cohere-command-r7b" },
    { name: "Alibaba Qwen 1.5", playgroundUrl: "", id: "alibaba-qwen-1-5" },
    { name: "Alibaba Qwen 2", playgroundUrl: "", id: "alibaba-qwen-2" },
    { name: "Alibaba Qwen 3 (4B)", playgroundUrl: "", id: "alibaba-qwen-3-4b" },
    { name: "Alibaba Qwen 3 (235B)", playgroundUrl: "", id: "alibaba-qwen-3-235b" },
    { name: "Alibaba Qwen 2.5-Max", playgroundUrl: "", id: "alibaba-qwen-2-5-max" },
    { name: "Alibaba Qwen 2.5-VL-32B", playgroundUrl: "", id: "alibaba-qwen-2-5-vl-32b" },
    { name: "Microsoft Phi-3 Mini", playgroundUrl: "", id: "microsoft-phi-3-mini" },
    { name: "Microsoft Phi-3 Small", playgroundUrl: "", id: "microsoft-phi-3-small" },
    { name: "Microsoft Phi-3 Medium", playgroundUrl: "", id: "microsoft-phi-3-medium" },
    { name: "Microsoft Orca (13B)", playgroundUrl: "", id: "microsoft-orca-13b" },
    { name: "Baidu Ernie 4.5", playgroundUrl: "", id: "baidu-ernie-4-5" },
    { name: "Baidu Ernie X1", playgroundUrl: "", id: "baidu-ernie-x1" },
    { name: "DeepSeek DeepSeek-R1", playgroundUrl: "", id: "deepseek-deepseek-r1" },
    { name: "DeepSeek DeepSeek-V3", playgroundUrl: "", id: "deepseek-deepseek-v3" },
    { name: "DeepSeek DeepSeek-V2.5", playgroundUrl: "", id: "deepseek-deepseek-v2-5" },
    { name: "NVIDIA Nemotron-4 340B", playgroundUrl: "", id: "nvidia-nemotron-4-340b" },
    { name: "NVIDIA Nemotron Ultra 253B", playgroundUrl: "", id: "nvidia-nemotron-ultra-253b" },
    { name: "Databricks/MosaicML DBRX", playgroundUrl: "", id: "databricks-mosaicml-dbrx" },
    { name: "Databricks/MosaicML MPT-7B", playgroundUrl: "", id: "databricks-mosaicml-mpt-7b" },
    { name: "Databricks/MosaicML MPT-30B", playgroundUrl: "", id: "databricks-mosaicml-mpt-30b" },
    { name: "AI21 Labs Jamba", playgroundUrl: "", id: "ai21-labs-jamba" },
    { name: "Stability AI Stable LM 2 (1.6B)", playgroundUrl: "", id: "stability-ai-stable-lm-2-1-6b" },
    { name: "Stability AI Stable LM 2 (12B)", playgroundUrl: "", id: "stability-ai-stable-lm-2-12b" },
    { name: "IBM Granite", playgroundUrl: "", id: "ibm-granite" },
    { name: "Amazon Nova", playgroundUrl: "", id: "amazon-nova" },
    { name: "Amazon Nova Pro", playgroundUrl: "", id: "amazon-nova-pro" },
    { name: "Amazon Nova Micro", playgroundUrl: "", id: "amazon-nova-micro" },
    { name: "Inflection AI Inflection-2.5", playgroundUrl: "", id: "inflection-ai-inflection-2-5" },
    { name: "BigScience BLOOM", playgroundUrl: "", id: "bigscience-bloom" },
    { name: "EleutherAI GPT-J", playgroundUrl: "", id: "eleutherai-gpt-j" },
    { name: "EleutherAI GPT-NeoX", playgroundUrl: "", id: "eleutherai-gpt-neox" },
    { name: "EleutherAI Pythia", playgroundUrl: "", id: "eleutherai-pythia" },
    { name: "Stanford CRFM Alpaca 7B", playgroundUrl: "", id: "stanford-crfm-alpaca-7b" },
    { name: "LMSYS Vicuna 33B", playgroundUrl: "", id: "lmsys-vicuna-33b" },
    { name: "LMSYS Tülu 3", playgroundUrl: "", id: "lmsys-tulu-3" },
    { name: "Flower AI Collective-1", playgroundUrl: "", id: "flower-ai-collective-1" },
    { name: "Open Source Collective NeoBERT", playgroundUrl: "", id: "open-source-collective-neobert" }
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
      modelId: [this.models[0].id, Validators.required]
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
