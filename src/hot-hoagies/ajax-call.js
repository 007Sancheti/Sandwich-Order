import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js'
/**
 * @customElement
 * @polymer
 */
class AjaxCall extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
    <iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type="application/json"> </iron-ajax>
    `;
  }
  static get properties() {
    return {

    };
  }
  /**
   * @description: ???
   * @author: ???
  *@param {String} url url of specific location
  *@param {String} method method type:get/put/post/delete
  *@param {Object{}|Null} postObj needs object as value for put/post and null for get/delete
  *@param {Boolean} sync true for synchronization and false for asynchronization
  **/
 /**
  * 
  * @param {*} method 
  * @param {*} url 
  * @param {*} obj 
  * @param {*} action 
  */
  _makeAjaxCall(method, url, obj, action) {
    const ajax = this.$.ajax
    this.action = action
    ajax.body = obj ? JSON.stringify(obj) : undefined;
    ajax.method = method;
    ajax.url = url;
    ajax.generateRequest();
  }

/**
 * @description: Fired everytime when ajax call is made.It handles response of the ajax 
 * @param {*} event 
 */
  _handleResponse(event) {
    const data = event.detail.response
    console.log(event.detail.response)
    //All the response has been handled through switch case by dispatching event details to the parent
    switch (this.action) {
      case 'search': this.dispatchEvent(new CustomEvent('search-flights', { bubbles: true, composed: true, detail: { data } }))
        break;
      case 'filter': this.dispatchEvent(new CustomEvent('filter-flights', { bubbles: true, composed: true, detail: { data } }))
        break;
      case 'booking-confirmed': this.dispatchEvent(new CustomEvent('booking-confirmed', { bubbles: true, composed: true, detail: { data } }))
        break;
      case 'myBookings': this.dispatchEvent(new CustomEvent('myBookings', { bubbles: true, composed: true, detail: { data } }))
        break;
      default:

    }
  }
}
window.customElements.define('ajax-call', AjaxCall);
