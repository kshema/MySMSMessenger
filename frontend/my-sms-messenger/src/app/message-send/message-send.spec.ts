import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MessageSend } from './message-send';

describe('MessageSendComponent', () => {
  let component: MessageSend;
  let fixture: ComponentFixture<MessageSend>;

  beforeEach(async () => {
    // Mock localStorage
    const mockLocalStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
    };

    // Override the global localStorage object
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    await TestBed.configureTestingModule({
      imports: [FormsModule, MessageSend], // Add MessageSend to imports
    }).compileComponents();

    fixture = TestBed.createComponent(MessageSend);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('New Message');
    expect(compiled.querySelector('label[for="phone_number"]')?.textContent).toContain('Phone Number');
    expect(compiled.querySelector('label[for="message_content"]')?.textContent).toContain('Message');
    expect(compiled.querySelector('button[type="submit"]')?.textContent).toContain('Submit');
  });
});