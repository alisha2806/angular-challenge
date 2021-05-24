import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { IAddress } from 'src/app/interfaces/address.interface';

import {IHeader} from 'src/app/interfaces/header.interface';
import {IUserData} from 'src/app/interfaces/user-data.interface';
import {LoadingService} from 'src/app/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private $destroy = new Subject<boolean>();
  
  headerInfo: IHeader = { name: '', address: '' }

  loading = true;
  userData: IUserData = { firstName: '', lastName: '', address: {city: '', postcode: '', county: '', line1: '' } };
  homeFormGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName:  new FormControl(null, Validators.required),
    line1: new FormControl(null, Validators.required),
    line2: new FormControl(null),
    line3: new FormControl(null),
    city: new FormControl(null, Validators.required),
    postcode: new FormControl(null, Validators.required),
    county: new FormControl(null, Validators.required),
  });

  constructor(
    private loadingService: LoadingService,
    public activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadingService.loading$.pipe(takeUntil(this.$destroy)).subscribe((state: boolean) => {
      this.loading = state;
    });
    this.setUserData();
  }

  onSubmit(): void {
    const formData = this.homeFormGroup.getRawValue();
    this.userData.firstName = formData.firstName;
    this.userData.lastName = formData.lastName;
    this.userData.address.city = formData.city;
    this.userData.address.county = formData.county;
    this.userData.address.postcode = formData.postcode;
    this.userData.address.line1 = formData.line1;
    this.userData.address.line2 = formData.line2;
    this.userData.address.line3 = formData.line3;
    this.setHeaderInfo();
  }
  
  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }

  private setUserData(): void {
    const data: IUserData = this.activatedRoute.snapshot.data.userData;

    if (data) {
      this.userData = data;
      this.homeFormGroup.controls['firstName'].setValue(data.firstName);
      this.homeFormGroup.controls['lastName'].setValue(data.lastName);
      this.homeFormGroup.controls['line1'].setValue(data.address.line1);
      this.homeFormGroup.controls['line2'].setValue(data.address.line2);
      this.homeFormGroup.controls['line3'].setValue(data.address.line3);
      this.homeFormGroup.controls['postcode'].setValue(data.address.postcode);
      this.homeFormGroup.controls['city'].setValue(data.address.city);
      this.homeFormGroup.controls['county'].setValue(data.address.county);
      this.setHeaderInfo();
    }
  }

  private setHeaderInfo(): void {
    const address: IAddress = this.userData.address;
    let text = '';
    
    this.headerInfo.name = `${this.userData.firstName} ${this.userData.lastName}`;

    text = address.line1;
    if (address.line2) {
      text = `${text}, ${address.line2}`;
    }
    if (address.line3) {
      text = `${text}, ${address.line3}`
    }
    text = `${text}, ${address.city}, ${address.county}, ${address.postcode}`;

    this.headerInfo.address = text;
  }
}
