import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import data from '../../../assets/data/products.json';

@Component({
  selector: 'app-manual-subscription',
  templateUrl: './manual-subscription.component.html',
  styleUrl: './manual-subscription.component.scss'
})
export class ManualSubscriptionComponent implements OnInit {


  userDetailsForm: FormGroup;
  paymentForm: FormGroup;
  firstError: string = '';
  isUserDetails: boolean = false;
  isSubscribedUser: boolean = false;
  userDetails: any;
  subscribedUser: any;
  minDateToFinish = new Subject<string>();
  minDate: any;
  plans: any = [
    { value: '1 Month', label: '1 Month' },
    { value: '3 Months', label: '3 Months' },
    { value: '6 Months', label: '6 Months' },
    { value: '1 Year', label: '1 Year' },
  ]

  currencies: any = [
    { code: 'INR', text: 'India Rupees – INR' },
    { code: 'USD', text: 'United States Dollars – USD' },
  ]

  constructor(private formBuilder: FormBuilder, private api: ApiService) {

    this.userDetailsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });

    this.paymentForm = this.formBuilder.group({
      subscriptionId: ['', Validators.required],
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

  ngOnInit() {
  
  }


  getUserDetails() {
    var formData: any = new FormData();
    formData.append('email', this.userDetailsForm.controls['email'].value);
    this.api.getUserData(formData).subscribe((res: any) => {

      if (res && res.Table.length) {
        this.userDetails = res.Table[0];
        if (this.userDetails) {
          var formData: any = new FormData();
          formData.append('UID', this.userDetails.UID);
          this.api.getSubscribedUser(formData).subscribe((res: any) => {
            console.log(res);
            if (res && res.success === false) {
              this.isSubscribedUser = false;
              this.isUserDetails = true;
            } else if (res && res.Table && res.Table.length > 0) {
              this.subscribedUser = res.Table;
              console.log(this.subscribedUser);
              this.isUserDetails = true;
              this.isSubscribedUser = true;
            }
            else {
              this.isUserDetails = false;
              this.isSubscribedUser = false;
            }

            // this.isUserDetails = true;
          })
        }
        // this.isUserDetails = true;
        console.log(this.userDetails);

      }
      else {
        alert('User Not Found');
      }

    })
  }

  calculateEndDate(): void {
    const startDate = this.paymentForm.controls['startDate'].value;
    const plan: any = this.paymentForm.controls['selectedPlan'].value;
    if (startDate && plan != null) {
      const endDate = new Date(startDate);

      switch (plan) {
        case '1 Month': // 1 Month
          endDate.setMonth(endDate.getMonth() + 1);
          break;
        case '3 Months': // 3 Months
          endDate.setMonth(endDate.getMonth() + 3);
          break;
        case '6 Months': // 6 Months
          endDate.setMonth(endDate.getMonth() + 6);
          break;
        case '1 Year': // 1 Year
          endDate.setFullYear(endDate.getFullYear() + 1);
          break;
        default:
          break;
      }

      this.paymentForm.controls['endDate'].setValue(endDate);
    }

  }

  activateAccount() {
    const startDateISO = this.paymentForm.controls['startDate'].value.toISOString();
    const endDateISO = this.paymentForm.controls['endDate'].value.toISOString();

    // Create an object with the data

    const jsonData = {
      Subscription_id: this.paymentForm.controls['subscriptionId'].value,
      User_id: this.userDetails.UID,
      Start_at: startDateISO,
      Expire_at: endDateISO,
      Currency: this.paymentForm.controls['currency'].value,
      Amount: this.paymentForm.controls['amount'].value,
      Status: 'ACTIVATED',
      Event_name: this.paymentForm.controls['paymentMode'].value,
      Plan_id: this.paymentForm.controls['selectedPlan'].value
    };

    const jsonString = JSON.stringify(jsonData);
    const formData: any = new FormData();
    formData.append('json', jsonString);
    formData.append('Subscription_id', this.paymentForm.controls['subscriptionId'].value);
    formData.append('User_id', this.userDetails.UID);
    formData.append('Start_at', startDateISO);
    formData.append('Expire_at', endDateISO);
    formData.append('Currency', this.paymentForm.controls['currency'].value);
    formData.append('Amount', this.paymentForm.controls['amount'].value);
    formData.append('Status', 'ACTIVATED');
    formData.append('Event_name', this.paymentForm.controls['paymentMode'].value);
    formData.append('Plan_id', this.paymentForm.controls['selectedPlan'].value);

    this.api.activateAccount(formData).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        alert(res.message);
        this.getUserDetails();
        this.paymentForm.reset();
      }
      else {
        alert(res.error);
      }
    });


  }

  renewAccount() {
    const startDateISO = this.paymentForm.controls['startDate'].value.toISOString();
    const endDateISO = this.paymentForm.controls['endDate'].value.toISOString();

    // Create an object with the data

    const jsonData = {
      Subscription_id: this.paymentForm.controls['subscriptionId'].value,
      User_id: this.userDetails.UserId,
      Start_at: startDateISO,
      Expire_at: endDateISO,
      Currency: this.paymentForm.controls['currency'].value,
      Amount: this.paymentForm.controls['amount'].value,
      Status: 'ACCOUNT ACTIVATED',
      Event_name: this.paymentForm.controls['paymentMode'].value,
      Plan_id: this.paymentForm.controls['selectedPlan'].value
    };

    const jsonString = JSON.stringify(jsonData);
    const formData: any = new FormData();
    formData.append('json', jsonString);
    formData.append('Subscription_id', this.paymentForm.controls['subscriptionId'].value);
    formData.append('User_id', this.userDetails.UserId);
    formData.append('Start', startDateISO);
    formData.append('Expiry', endDateISO);
    formData.append('Currency', this.paymentForm.controls['currency'].value);
    formData.append('Amount', this.paymentForm.controls['amount'].value);
    formData.append('Status', 'ACCOUNT ACTIVATED');
    formData.append('Event_name', this.paymentForm.controls['paymentMode'].value);
    formData.append('Plan_id', this.paymentForm.controls['selectedPlan'].value);

    this.api.updateSubscription(formData).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        alert(res.message);
        this.paymentForm.reset();
      }
      else {
        alert(res.error)
      }
    });

  }

}

