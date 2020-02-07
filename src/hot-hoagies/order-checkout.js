import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import './ajax-call.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-location.js';
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
    span{
      display:flex;
      justify-content: center;
    }
    paper-button{
      background-color: darkblue;
      color: whitesmoke;
    }
    paper-card
    {
        width:350px;
        margin-right:20px;
        margin-left:20px;
    }
  </style>
  <ajax-call id="ajax"></ajax-call>
  <app-location route={{route}}></app-location>
  <span><h2>Review your Orders</h2></span>
  <template is="dom-repeat" items={{reviewOrders}}>
    <paper-card image="../../images/carousal1.jpg">
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
   <paper-button raised on-click="_handlePay">proceed to pay</paper-input>
    `;
  }
  static get properties() {
    return {
      reviewOrders:{
        type:Array,
        value:[{items: [{ itemId:'123', quantity:'234'},{ itemId:'003', quantity:'23'}],cartId:'123456', totalPrice:'2000'}]
      },
      postObj:{
        type:Object,
        value:{}
      }
    };
  }
   /**
   * listening customEvents sent from child elements
   */
  ready()
  {
    super.ready();
    this.addEventListener('review-orders', (e) => this._gettingOrders(e))
  }
  /**
   * get the object from session storage 
   * call the API to fetch the data to render it on the screen
   */
  connectedCallback()
  {  const myCart= JSON.parse(sessionStorage.getItem('myCart'));
    super.connectedCallback();
    console.log(myCart)
    this.postObj.items=myCart
    console.log(this.postObj)
    this.$.ajax._makeAjaxCall('get',`http://10.117.189.245:8085/hothoagies/users/${sessionStorage.getItem('userId')}/carts`,this.postObj,'review')  
  }
  /**
   * 
   * @param {customEvent} event provide the data for dom-repeat to show the details of order
   */
  _gettingOrders(event){  
      this.reviewOrders=event.detail.data.orders
  }
  _handlePay(){
    this.set('route.path','/payment')
  }
}

window.customElements.define('order-checkout', OrderCheckout);
