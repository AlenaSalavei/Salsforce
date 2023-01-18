/**
 * Created by ElenaSolovey on 12/14/2022.
 */

import { LightningElement, api, wire } from "lwc";
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import TYPE_FIELD from '@salesforce/schema/Account';
import getAccountRecords from "@salesforce/apex/AccountCollectionController.getAccountRecords";
import { showToast } from 'c/utils';

export default class AccountCollection extends LightningElement {
  selectedOption = 'All Types';
  accountRecordList = [];
  options;

  @wire( getPicklistValuesByRecordType, { fieldApiName: TYPE_FIELD, recordTypeId: '012000000000000AAA'})
  setPicklistOptions({error, data}) {
    if (data) {
      console.log('-data-', data);
      // this.options = data.values;
      //
      // if (this.selectedOption) {
      //   let optionIsValid = this.options.some(function(item) {
      //     return item.value === this.selectedOption;
      //   }, this);
      //
      //   if (!optionIsValid) {
      //     this.selectedOption = data.defaultValue;
      //   }
      // } else {
      //   this.selectedOption = data.defaultValue;
      // }
    } else if (error) {
      console.log(error);
    }
  }

  handleChange(event) {
    this.selectedType = event.detail.value;
  }

  connectedCallback() {
    console.log('---' , this.typeFieldOptions);
    getAccountRecords({})
      .then( response => {
        this.accountRecordList = response;
      }) .catch( error => {
        showToast(this, 'Error', 'error', 'something', 3000);
      });
  }

}