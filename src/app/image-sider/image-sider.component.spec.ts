import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSiderComponent } from './image-sider.component';

describe('ImageSiderComponent', () => {
  let component: ImageSiderComponent;
  let fixture: ComponentFixture<ImageSiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageSiderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
