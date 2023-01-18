/**
 * Created by Alena Shaliuta
 * on 12/7/2022.
 */

import { LightningElement } from "lwc";
import { showToast } from 'c/utils';
import { NavigationMixin } from 'lightning/navigation';
import FlightCreationErrorMessage from '@salesforce/label/c.FlightCreationErrorMessage';
import FlightCreatedSuccessfully from '@salesforce/label/c.FlightCreatedSuccessfully';

export default class GenerateFlights extends NavigationMixin(LightningElement) {

  label = {
    FlightCreationErrorMessage,
    FlightCreatedSuccessfully
  };

  showSpinner = true;
  arrivalAirportId;
  departureAirportId;
  generateFlightDisabled = true;

  /**
   * @description set selected record id to variable
   * @param event of input field changing
   */
  handleChangeArrivalAirport(event) {
    this.arrivalAirportId = event.detail.value[0];
    this.checkBothAirportsSelected();
  }

  /**
   * @description set selected record id to variable
   * @param event of input field changing
   */
  handleChangeDepartureAirport(event) {
    this.departureAirportId = event.detail.value[0];
    this.checkBothAirportsSelected();
  }

  /**
   * set the generate flight button availability only if both airports are selected
   */
  checkBothAirportsSelected() {
    this.generateFlightDisabled = (!(this.arrivalAirportId !== undefined && this.departureAirportId !== undefined));
  }

  connectedCallback() {
    this.showSpinner = false;
  }

  /**
   * @description submit flight record to insert
   */
  generateFlight() {
    this.showSpinner = true;
    this.template.querySelector('lightning-record-edit-form').submit();
  }

  /**
   * @description on success submission method fires show toast and navigate to flight record
   * @param event success event
   */
  flightCreationHandler(event) {
    this.showSpinner = false;
    showToast(this, 'Success', 'success', this.label.FlightCreatedSuccessfully, 3000);
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId: event.detail.id,
        actionName: 'view'
      }
    });
  }

  /**
   * @description on error submission method fires show toast with error message
   * @param event error event
   */
  flightCreationErrorHandler(event) {
    this.showSpinner = false;
    showToast(this, 'Error', 'error', this.label.FlightCreationErrorMessage, 3000);
  }
}