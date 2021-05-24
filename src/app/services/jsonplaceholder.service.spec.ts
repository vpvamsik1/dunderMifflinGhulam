import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { JSONPlaceholderService } from './jsonplaceholder.service';

describe('JSONPlaceholderService', () => {
  let service: JSONPlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    })
    service = TestBed.inject(JSONPlaceholderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
