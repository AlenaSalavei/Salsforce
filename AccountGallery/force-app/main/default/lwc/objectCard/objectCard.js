/**
 * Created by ElenaSolovey on 12/14/2022.
 */

import { api, LightningElement } from "lwc";

export default class ObjectCard extends LightningElement {
  @api accountRecord;

  handleOpenDetails() {
    console.log('---2--', this.accountRecord);
  }
}