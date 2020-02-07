import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import './ajax-call.js';
/**
 * @customElement
 * @polymer
 */
class OrderCheckout extends PolymerElement {
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
  <h2>Hello [[prop1]]!</h2>
  <ajax-call id="ajax"></ajax-call>
  <h1>Review your Orders</h1>
  <template is="dom-repeat" items={{reviewOrders}}>
    <paper-card>
    <ul>
    <li>Items:
    <template is="dom-repeat" items={{item.items}} as="order">
    <ul>
    Item Name:{{order.itemName}}  
    Quantity:{{order.quantity}}</ul>
    </template>
    </li>
    <li>OrderId:{{item.cartId}}</li>
    <li>Price:{{item.totalPrice}}</li>
    </ul>
    </paper-card>
    </template>

    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'order-checkout'
      },
      reviewOrders:{
        type:Array,
        value:[{items: [{ itemId:'123', quantity:'234'},{ itemId:'003', quantity:'23'}],cartId:'123456', totalPrice:'2000'}]
      }
    };
  }
  ready()
  {
    super.ready();
    this.addEventListener('review-orders', (e) => this._gettingOrders(e))
  }
  connectedCallback()
  {  const myCart= JSON.parse(sessionStorage.getItem('myCart'));
    super.connectedCallback();
    // this.$.ajax._makeAjaxCall('get',`http://10.117.189.208:8085/foodplex/users/${myCart}/vendororders`,null,'review')  
  }
  _gettingOrders(event){  
      this.reviewOrders=event.detail.data.orders
  }
}

window.customElements.define('order-checkout', OrderCheckout);
