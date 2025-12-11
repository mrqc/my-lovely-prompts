import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnhancedPromptCopy } from './enhanced-prompt-copy';

describe('EnhancedPromptCopy', () => {
  let component: EnhancedPromptCopy;
  let fixture: ComponentFixture<EnhancedPromptCopy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnhancedPromptCopy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnhancedPromptCopy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
