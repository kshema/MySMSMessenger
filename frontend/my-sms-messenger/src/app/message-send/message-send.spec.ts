import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSend } from './message-send';

describe('MessageSend', () => {
  let component: MessageSend;
  let fixture: ComponentFixture<MessageSend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageSend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageSend);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
