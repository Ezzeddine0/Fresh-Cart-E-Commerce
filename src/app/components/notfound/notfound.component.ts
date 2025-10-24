import { Component } from '@angular/core';
import { NavAuthComponent } from '../nav-auth/nav-auth.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [NavAuthComponent, FooterComponent],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss',
})
export class NotfoundComponent {}
