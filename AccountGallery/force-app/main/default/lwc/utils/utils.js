/**
 * Created by Alena Shaliuta on 12/7/2022.
 */

import { ShowToastEvent } from "lightning/platformShowToastEvent";

export function showToast(_this, title, variant, message, duration) {
  const toastEvent = new ShowToastEvent({
    title: title,
    message: message,
    variant: variant,
    duration: duration ? duration : undefined,
    mode: duration ? 'dismissible' : 'sticky'
  });
  _this.dispatchEvent(toastEvent);
}