import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienciaLaboralComponent } from './experiencialaboral.component';

describe('ExperienciaLaboralComponent', () => {
   let component: ExperienciaLaboralComponent;
   let fixture: ComponentFixture<ExperienciaLaboralComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ ExperienciaLaboralComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ExperienciaLaboralComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});