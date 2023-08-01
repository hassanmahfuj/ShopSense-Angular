import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPointsComponent } from './collection-points.component';

describe('CollectionPointsComponent', () => {
  let component: CollectionPointsComponent;
  let fixture: ComponentFixture<CollectionPointsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionPointsComponent]
    });
    fixture = TestBed.createComponent(CollectionPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
