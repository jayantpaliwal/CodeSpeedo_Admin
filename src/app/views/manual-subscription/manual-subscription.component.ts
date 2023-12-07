import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-manual-subscription',
  templateUrl: './manual-subscription.component.html',
  styleUrl: './manual-subscription.component.scss'
})
export class ManualSubscriptionComponent {


  userDetailsForm: FormGroup;
  paymentForm: FormGroup;
  firstError: string = '';
  isUserDetails: boolean = false;
  userDetails: any;
  minDateToFinish = new Subject<string>();
  minDate: any;
  plans:any = [
    { value: 0, label: '1 Month' },
    { value: 1, label: '3 Months' },
    { value: 2, label: '6 Months' },
    { value: 3, label: '1 Year' },
  ]

  currencies:any = [
    { code: 'INR', text: 'India Rupees – INR' },
    { code: 'USD', text: 'United States Dollars – USD' },
  ]

  constructor(private formBuilder: FormBuilder){

    this.userDetailsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });

    this.paymentForm = this.formBuilder.group({
      transactionId: ['', Validators.required],
      selectedPlan: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      paymentMode: ['', Validators.required],
      currency: ['', Validators.required],
      amount: ['', Validators.required]
    })

    this.paymentForm.controls['selectedPlan'].valueChanges.subscribe(() => {
      this.calculateEndDate();
    });

  }


  getUserDetails(userEmail:any) {
    console.log(userEmail);
    this.userDetails = userEmail
    this.isUserDetails = true;
  }

  calculateEndDate(): void {
    const startDate = this.paymentForm.controls['startDate'].value;
    const plan:any = this.paymentForm.controls['selectedPlan'].value;
    if (startDate && plan != null) {
      const endDate = new Date(startDate);

      switch (plan) {
        case 0: // 1 Month
          endDate.setMonth(endDate.getMonth() + 1);
          break;
        case 1: // 3 Months
          endDate.setMonth(endDate.getMonth() + 3);
          break;
        case 2: // 6 Months
          endDate.setMonth(endDate.getMonth() + 6);
          break;
        case 3: // 1 Year
          endDate.setFullYear(endDate.getFullYear() + 1);
          break;
        default:
          break;
      }

      this.paymentForm.controls['endDate'].setValue(endDate);
    }
    
  }

  activateAccount(paymentForm:any){
    console.log(paymentForm);
    
  }


}
