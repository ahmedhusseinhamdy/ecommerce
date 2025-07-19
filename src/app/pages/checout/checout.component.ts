import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/order/payment.service';

@Component({
  selector: 'app-checout',
  imports: [ReactiveFormsModule],
  templateUrl: './checout.component.html',
  styleUrl: './checout.component.scss'
})
export class ChecoutComponent implements OnInit {

  cartId!: string;

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _PaymentService = inject(PaymentService)

  detailsForm: FormGroup = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required)
  })

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartId = param.get('c_id')!
      }
    })
  }
  detailsSubmit() {
    console.log(this.detailsForm.value);
    if (this.detailsForm.valid) {
      this._PaymentService.checkOutSession(this.cartId, this.detailsForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == "success") {
            window.open(res.session.url, '_self')
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
}
