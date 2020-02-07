import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-spinner/paper-spinner.js';
import './ajax-call.js';
/**
 * @customElement
 * @polymer
 */
class UserHome extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        #items
        {
          width:100%;
        }
        paper-card ul
        {
          display:flex;
          justify-content:space-between;
          align-items:center;
          list-style:none;
        }
        paper-card ul li
        {
          width:120px;
        }
        paper-tabs
        {
          --paper-tab-ink:blue;
          --paper-tabs-selection-bar-color:blue;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
      <ajax-call id="ajax"></ajax-call>
      <template is="dom-repeat" items={{preferences.details}}>
      <template is="dom-repeat" items={{item.items}} as="list">
    <paper-card elevation="2" animated-shadow="false">
      <div class="card-content">
        <p>Name: {{list.ItemName}}</p>
        <p>Category: {{item.categoryName}}</p>
      </div>
      <div class="card-actions">
      <paper-icon-button id="removeBtn" on-click="_handleRemove" icon="remove"></paper-icon-button>
      <span id="quantity{{list.itemId}}">0</span>
      <paper-icon-button id="addBtn" on-click="_handleAdd" icon="add"></paper-icon-button>
      </div>
    </paper-card>
    </template>
    </template>
    <paper-tabs selected="{{selected}}" scrollable>
    <template is="dom-repeat" items={{categories}}>
      <paper-tab on-click="_filterCategory"> {{item.categoryName}}</paper-tab>
    </template>
</paper-tabs>
<template is="dom-repeat" items={{categoryItems}}>
<paper-card id="items">
<ul><li>item:{{item.foodItemName}}</li>
<li>Price:{{item.price}}</li>
<li><paper-icon-button id="removeBtn" on-click="_handleRemove" icon="remove"></paper-icon-button>
<span id="quantity{{item.foodItemId}}">0</span>
<paper-icon-button id="addBtn" on-click="_handleAdd" icon="add"></paper-icon-button></li>
</ul>
</paper-card>
</template>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'hot-hoagies'
      },
      preferences: {
        type: Object,
        value: {
          details: [{
            categoryId: 1,
            categoryName: "Veg-Pizza",
            items: [{
              itemId: 7,
              ItemName: "margherita pizza"
            },
            {
              itemId: 9,
              ItemName: "classic pizza"
            }]
          }],
          statusCode: 200,
          message: "abhinav"
        }
      },
      categoryItems:{
        type:Array,
        value:[]
      },
      categories: {
        type: Array,
        value:
          [{
            categoryId: 1,
            categoryName: "Veg Pizza"
          },
          {
            categoryId: 2,
            categoryName: "Non-Veg Pizza"
          },
          {
            categoryId: 3,
            categoryName: "Sandwich"
          },
          {
            categoryId: 4,
            categoryName: "Burgers"
          }]
      },
      items: {
        type: Object,
        value: {
          list: [{
            itemId: 1,
            ItemName: "String"
          }],
          statusCode: 200,
          message: "String"
        }
      },
      cart: {
        type: Array,
        value: [{
          itemId: 1,
          quantity: 0
        }]
      }
    };
  }
    /**
   * listening customEvents sent from child elements
   */
  ready() {
    super.ready();
    this.addEventListener('category-list', (e) => this._fetchingCategories(e))
    this.addEventListener('fetch-items', (e) => this._fetchingItems(e))
  }
      /**
   * call the API to fetch the data to render it on the screen
   */
  connectedCallback() {
    super.connectedCallback();
    this.$.ajax._makeAjaxCall('get', `http://10.117.189.245:8085/hothoagies/categories`, null, 'categoriesList')
  }
   /**
   * @param {customEvent} event provide the data for dom-repeat to show the details of categories
   */
  _fetchingCategories(event) {
    this.categories = event.detail.data
  }
   /**
   * @param {customEvent} event provide the data for dom-repeat as the category is clicked
   */
  _filterCategory(event) {
    let categoryId = event.model.item.categoryId;
    this.$.ajax._makeAjaxCall('get',`http://10.117.189.28:8085/hothoagies/categories/${categoryId}/fooditems`,null,'fetchItems')
  }
  _fetchingItems(event) {
    console.log(event.detail.data)
    this.categoryItems=event.detail.data.foodItemList
  }
  /**
   * @param {clickEvent} event Adding the quantity whenever the add button is pressed
   */
  _handleAdd(event) {
    console.log(event.model.item.foodItemId)
    let itemId;
    if(event.model.list)
    {
     itemId = event.model.list.itemId;
    }
    else
    {
     itemId = event.model.item.foodItemId;
    }
    let quantity = `quantity${itemId}`
    let span = this.shadowRoot.querySelector(`#${quantity}`)
    span.innerHTML = parseInt(span.innerHTML) + 1
    let obj = this.cart.find(item => {
      return itemId == item.itemId
    })
    if (obj) {
      this.cart.forEach(element => {
        if (element.itemId == itemId) {
          element.quantity += 1
          console.log(this.cart)
        }
      });
    }
    else {
      let pushObj = { itemId: itemId, quantity: 1 }
      this.cart.push(pushObj)
      console.log(this.cart)
    }
    sessionStorage.setItem('myCart', JSON.stringify(this.cart))
  }
    /**
   * @param {clickEvent} event Subtracting the quantity whenever the add button is pressed
   */
  _handleRemove(event) {
    console.log(event.model.item.foodItemId)
    let itemId;
    if(event.model.list)
    {itemId = event.model.list.itemId;}
    else
    {
      itemId = event.model.item.foodItemId;
    }
    let quantity = `quantity${itemId}`
    let span = this.shadowRoot.querySelector(`#${quantity}`)
    if (span.innerHTML != 0) {
      span.innerHTML = parseInt(span.innerHTML) - 1
      let obj = this.cart.find(item => {
        return itemId == item.itemId
      })
      console.log(obj)
      if (obj) {
        let i = 0;
        this.cart.forEach(element => {
          if (element.itemId == itemId) {
            if (element.quantity == 1) {
              this.splice("cart", i, 1)
            }
            else {
              element.quantity -= 1
            }
            console.log(this.cart)
          }
          i++;
        });
      }
      else {
        let pushObj = { itemId, quantity: 1 }
        this.cart.push(pushObj)
      }
    }
    sessionStorage.setItem('myCart', JSON.stringify(this.cart))
  }
}

window.customElements.define('user-home', UserHome);
