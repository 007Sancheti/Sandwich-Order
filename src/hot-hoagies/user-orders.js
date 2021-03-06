import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import './ajax-call.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
/**
 * @customElement
 * @polymer
 */
class UserOrders extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        paper-card
        {
            width:350px;
            margin-right:20px;
            margin-left:20px;
        }
        span{
          display:flex;
          justify-content: center;
        }
      </style>
      <ajax-call id="ajax"></ajax-call>
      <span><h2>Past Orders</h2></span>
      <template is="dom-repeat" items={{myOrders}}>
        <paper-card image="../../images/carousal3.jpg">
        <ul>
        <li>OrderId:{{item.orderDetailId}}</li>
        <li>Price:{{item.totalPrice}}</li>
        <li>Date:{{item.orderDate}}</li>
        <li>PaymentMode:{{item.paymentMode}}</li>
        <li>Status:{{item.orderStatus}}</li>
        <li>Items:
        <template is="dom-repeat" items={{item.cartItems}} as="order">
        {{order.item.itemName}},
        </template>
        </li>
        </ul>
        </paper-card>
    `;
  }
  static get properties() {
    return {
      myOrders:{
        type:Array,
        value:[]
      },
    };
  }
   /**
   * listening customEvents sent from child elements
   */
  ready()
  {
    super.ready();
    this.addEventListener('getting-orders', (e) => this._gettingOrders(e))
  }
    /**
   * call the API to fetch the data to render it on the screen
   */
  connectedCallback()
  {
    super.connectedCallback();
  this.$.ajax._makeAjaxCall('get',`http://10.117.189.28:8085/hothoagies/users/${sessionStorage.getItem('userId')}/orders`,null,'myOrders')  
  }
  /**
   * 
   * @param {customEvent} event provide the data for dom-repeat to show the details of order
   */
  _gettingOrders(event){ 
      this.myOrders=event.detail.data
  }
}

window.customElements.define('user-orders', UserOrders);
