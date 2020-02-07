import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import './smart-accordian.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';


/**
* @customElement
* @polymer
*/
class PaymentPage extends PolymerElement {
  static get template() {
    return html`
<style>
  :host {
    display: block;
  }

  /* Credit Card */
  .credit-card {
    width: 360px;
    height: 400px;
    margin: 20px auto 0;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, .10);
  }
  .form-header {
    height: 60px;
    padding: 20px 30px 0;
    border-bottom: 1px solid #e1e8ee;
}
 
.form-body {
    height: 340px;
    padding: 30px 30px 20px;
}
.title {
    font-size: 18px;
    margin: 0;
    color: #5e6977;
}
.card-number,
.cvv-input input,
.month select,
.year select {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
}
 .year
 {
   position:relative;
 }
.card-number,
.month select,
.year select {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
}
 
.card-number,
.cvv-details,
.cvv-input input,
.month select,
.year select {
    opacity: .7;
    color: #86939e;
}
.card-number {
    width: 100%;
    margin-bottom: 20px;
    padding-left: 20px;
    border: 2px solid #e1e8ee;
    border-radius: 6px;
}
.month select,
.year select {
    width: 145px;
    margin-bottom: 20px;
    padding-left: 20px;
    border: 2px solid #e1e8ee;
    border-radius: 6px;
    background-position: 85% 50%;
    float: right;
    float: left;
  }
.cvv-input input {
    float: left;
    width: 145px;
    padding-left: 20px;
    border: 2px solid #e1e8ee;
    border-radius: 6px;
    background: #fff;
}
 
.cvv-details {
    font-size: 12px;
    font-weight: 300;
    line-height: 20px;
    float: right;
    margin-bottom: 20px;
}
.cvv-details p {
    margin-top: 6px;
}
.proceed-btn {
    margin-bottom: 10px;
    background: #7dc855;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    border-color: transparent;
    border-radius: 6px;
}
.proceed-btn a {
    text-decoration: none;
    color: #fff;
}
 
paper-input
{
  width:300px;
}
iron-icon
{
position:absolute;
right:5%;
}
</style>
<ajax-call id="ajax"></ajax-call>
<smart-accordion>
  <div slot="summary">Credit Card/Debit Card</div>
  <ul>
    <form class="credit-card">
      <div class="form-header">
        <h4 class="title">Credit card detail</h4>
      </div>

      <div class="form-body">
        <!-- Card Number -->
        <input type="text" class="card-number" placeholder="Card Number">

        <!-- Date Field -->
        <div class="date-field">
          <div class="month">
            <select name="Month">
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="august">August</option>
              <option value="september">September</option>
              <option value="october">October</option>
              <option value="november">November</option>
              <option value="december">December</option>
            </select>
          </div>
          <div class="year">
          <iron-icon icon=icons:arrow-drop-down></iron-icon>
            <select name="Year">
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2024">2025</option>
              <option value="2024">2026</option>
              <option value="2024">2027</option>
              <option value="2024">2028</option>
            </select>
          </div>
        </div>

        <!-- Card Verification Field -->
        <div class="card-verification">
          <div class="cvv-input">
            <input type="text" placeholder="CVV">
          </div>
          <div class="cvv-details">
            <p>3 or 4 digits usually found <br> on the signature strip</p>
          </div>
        </div>

        <!-- Buttons -->
        <button type="submit"  on-click="_handleSubmit" class="proceed-btn">Proceed</button>
      </div>
    </form>
  </ul>
</smart-accordion>
<smart-accordion>
  <div slot="summary">UPI ID</div>
  <paper-input label="Enter your upi"><div slot="suffix">@upi</div></paper-input>
  <button type="submit"  on-click="_handleSubmit" class="upi-btn">Proceed</button>
</smart-accordion>
<smart-accordion>
  <div slot="summary">Wallets</div>
  <paper-radio-group selected="phonePe" id="payment">
    <paper-radio-button name="PhonePe">PhonePe</paper-radio-button>
    <paper-radio-button name="PayTM">PayTM</paper-radio-button>
    <paper-radio-button name="GooglePay">GooglePay</paper-radio-button>
</paper-radio-group>
<button type="submit" on-click="_handleSubmit" class="wallet-btn">Proceed</button>
</smart-accordion>
`;
  }
  static get properties() {
    return {
      postObj: {
        type: Object,
        value: {}
      }
    };
  }
  ready() {
    //listening custom events sent as a response by makeAjaxCall 
    super.ready();
    this.addEventListener('booking-confirmed', (e) => this._bookingConfirmed(e))
    this.addEventListener('filter-flights', (e) => this._filterFlights(e))
  }
  //submitting the details of the booking with traveller details, flight details, and payment details after final payments
  _handleSubmit() {
    let travellerDetails = JSON.parse(sessionStorage.getItem('travelDetail'))
    let { flightId, finalDate } = JSON.parse(sessionStorage.getItem('flightDetails')); // object deconstruct/destr
    this.postObj.travelDate = finalDate;
    this.postObj.paymentType = this.$.payment.selected;
    this.postObj.travellerList = travellerDetails;
    console.log(this.postObj)
    this.$.ajax._makeAjaxCall('post', `http://10.117.189.208:8085/easefly/flights/${flightId}/bookings`, this.postObj, 'booking-confirmed')
  }
  _bookingConfirmed(event) {
    let { bookingId } = event.detail.data;
    alert(`Booking successful with booking ID ${bookingId}`)
  }
}

window.customElements.define('payment-page', PaymentPage);