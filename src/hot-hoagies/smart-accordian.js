import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-collapse/iron-collapse.js';
class SmartAccordion extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
    }
    ::slotted([slot="summary"])
            {
                display:inline;
            }
            .accordion {
                background-image: linear-gradient(to right, #2980b9, #6dd5fa, #ffffff);;
                cursor: pointer;
                padding: 18px;
                width: 100%;
                border: none;
                text-align: left;
                outline: none;
                font-size: 15px;
                margin-top:10px;
            }
            a{
                list-style-type: disc;
                text-decoration: none;
                color:black;
            }
            a:visited{
                color:black;
            }
            .active::after {
                transform: rotate(90deg);
                transition: 0.3s ease-out;
            }
            iron-collapse {
                transition: 0.3s ease;
            }
            .accordion::after {
                transition: 0.4s ease-out;
                font-weight: bold;
                float: right;
                margin-left: 5px;
                content: ">";
            }
  </style>
  <button class="accordion" on-click="_collapse"><slot name="summary"></slot></button>
  <iron-collapse opened="[[opened]]">
      <slot></slot>
  </iron-collapse>
    `;
  }
  static get properties() {
    return {
        opened: Boolean
    }
}
/**
 * changing the value for the opened variable whenever the accordian button is clicked
 */
_collapse() {
    let acc = this.shadowRoot.querySelector('.accordion');
    acc.classList.toggle("active");
    this.opened=!this.opened
}
}

window.customElements.define('smart-accordion', SmartAccordion);
