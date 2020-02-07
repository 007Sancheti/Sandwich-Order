import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

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
  <h2>Hello [[prop1]]!</h2>
  <ajax-call id="ajax"></ajax-call>
  <h1>Order Summary</h1>
  <template is="dom-repeat" items={{myOrders}}>
    <paper-card>
    <ul>
    <li>Items:
    <template is="dom-repeat" items={{item.items}} as="order">
    <ul>Item Name:{{order.itemName}}  
    Quantity:{{order.quantity}}
    </ul>
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
        value: 'order-summary'
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
    // this.$.ajax._makeAjaxCall('get',`http://10.117.189.208:8085/foodplex/users/${sessionStorage.getItem('userId')}/vendororders`,null,'myOrders')  
  }
   /**
   * 
   * @param {customEvent} event provide the data for dom-repeat to show the details of order
   */
  _gettingOrders(event){  
      this.myOrders=event.detail.data.orders
  }
}

window.customElements.define('order-summary', OrderSummary);
