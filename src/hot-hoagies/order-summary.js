import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import './ajax-call.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
/**
 * @customElement
 * @polymer
 */
class OrderSummary extends PolymerElement {
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
  </style>
  <ajax-call id="ajax"></ajax-call>
  <h1>Order Summary</h1>
    <paper-card image="../../images/carousal3.jpg">
    <ul>
    {{item}}
    <li>OrderId:{{myOrders.orderDetailId}}</li>
    <li>Price:{{myOrders.totalPrice}}</li>
    <li>Status:{{myOrders.orderStatus}}</li>
    <li>Time:{{myOrders.orderTime}}</li>
    <li>Items:
    <template is="dom-repeat" items={{myOrders.cartItems}} as="order">
    <ul>
    <li>Item Name:{{order.item.itemName}} </li>
    <li>Quantity:{{order.quantity}}</li>
    <li>ItemPrice:{{order.price}}</li>
    </ul>
    </template>
    </li>
    </ul>
    </paper-card>
    `;
  }
  static get properties() {
    return {
      myOrders:{
        type:Object,
      }
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
    this.$.ajax._makeAjaxCall('get',`http://10.117.189.28:8085/hothoagies/orders/${sessionStorage.getItem('orderId')}`,null,'myOrders')  
  }
   /**
   * 
   * @param {customEvent} event provide the data for dom-repeat to show the details of order
   */
  _gettingOrders(event){  
      this.myOrders=event.detail.data
  }
}

window.customElements.define('order-summary', OrderSummary);
