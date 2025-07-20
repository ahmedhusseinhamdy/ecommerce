import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./layouts/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce';
  isBrowser: boolean = false;

  constructor(
    private flowbiteService: FlowbiteService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // تحقق إنك في المتصفح فقط قبل استخدام sessionStorage
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    if (this.isBrowser) {
      this.flowbiteService.loadFlowbite(flowbite => {
        console.log('Flowbite loaded', flowbite);
        // ممكن تستخدم sessionStorage هنا بأمان
        console.log('Token:', sessionStorage.getItem('token'));
      });
    }
  }
}
