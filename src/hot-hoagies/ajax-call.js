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
    <iron-ajax id="ajax" on-response="_handleResponse" on-error="_handleError" handle-as="json" content-type="application/json"> </iron-ajax>
    `;
  }
  static get properties() {
    return {

    };
  }
  /**
   * @description:handle diferent  ajax calls  
  *@param {String} url url of specific location
  *@param {String} method method type:get/put/post/delete
  *@param {Object} postObj needs object as value for put/post and null for get/delete
  *@param {Boolean} sync true for synchronization and false for asynchronization
  **/
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
    console.log(data)
    console.log(this.action)
    console.log('data')
    //All the response has been handled through switch case by dispatching event details to the parent
    switch (this.action) {
      case 'login': this.dispatchEvent(new CustomEvent('login-status', { bubbles: true, composed: true, detail: { data } }))
      break;
      case 'review': this.dispatchEvent(new CustomEvent('review-orders', { bubbles: true, composed: true, detail: { data } }))
      break;
      case 'categoriesList': this.dispatchEvent(new CustomEvent('category-list', { bubbles: true, composed: true, detail: { data } }))
        break;
      case 'fetchItems': this.dispatchEvent(new CustomEvent('fetch-items', { bubbles: true, composed: true, detail: { data } }))
        break;
        case 'payments': this.dispatchEvent(new CustomEvent('payments-page', { bubbles: true, composed: true, detail: { data } }))
        break;
        case 'myOrders': this.dispatchEvent(new CustomEvent('getting-orders', { bubbles: true, composed: true, detail: { data } }))
      break;
        case 'preferencesList':
      this.dispatchEvent(new CustomEvent('preference-list', { bubbles: true, composed: true, detail: { data } }))
        break;
      default:
    }
  }
  _handleError(event) {
    //All the response has been handled through switch case by dispatching event details to the parent
    const data = event.detail.request.response;
    console.log(data)
    switch (this.action) {
      case 'login': this.dispatchEvent(new CustomEvent('login-status', { bubbles: true, composed: true, detail: { data } }))
      break;
    
  }
}
}
window.customElements.define('ajax-call', AjaxCall);
