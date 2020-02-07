import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-form/iron-form.js';
import './ajax-call';
import '@polymer/app-route/app-location.js';
/**
 * @customElement
 * @polymer
 */
class LoginPage extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      height:80.8vh;
      overflow-y:hidden;
      background-size:cover;
    }
    img{
      margin-top:20px;
      margin-bottom: 0;
      width:150px;
      height:50px
    }
    #google{
      float: right;
    }
    paper-button{
      background-color: darkblue;
      color: whitesmoke;
    }
    .form
    {
      background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
      width:40%;
      margin:70px auto;
      padding:15px;
      box-shadow:0px 0px 5px 5px;
    }
    span{
      display:flex;
      margin-top: 10px;
      justify-content: center;
    }
  </style>
  <app-location route={{route}}></app-location>
  <paper-toast text={{message}} id="toast"></paper-toast>
  <ajax-call id="ajax"></ajax-call>
  <iron-form>
  <form class="form">
  <paper-input id="mobileNo" maxlength="10" type="text" label="Mobile Number"></paper-input>
  <span>
  <paper-button on-click="_signIn" raised id="loginBtn">LogIn</paper-button></span>
  <img id="facebook" src="../../images/facebook.png"/>
  <img id="google" src="../../images/google-logo.png"/>
  </form>
  </iron-form>
    `;
  }
  static get properties() {
    return {
      message:{
        type:String,
        value:''
      }
    };
  }
  /**
   * listening customEvents sent from child elements
   */
  ready()
  {
    super.ready();
    this.addEventListener('login-status', (e) => this._loginStatus(e))
  }
  /**
   * 
   * @param {mouseEvent} event on SignIn click event is fired
   * validate if mobile No. has 10 digits or not
   * get the user details from the database
   */
  _signIn(event){
  const mobileNo=this.$.mobileNo.value;
   if(mobileNo.length==10){
    const mobileNumber = this.$.mobileNo.value;
    let postObj={mobileNumber}
     this.$.ajax._makeAjaxCall('post',`http://10.117.189.28:8085/hothoagies/login`,postObj,'login')  
    }
    else{
      alert('enter valid mobile no.')
    }
  } 
  /**
   * 
   * @param {*} event 
   * handles the response sent by the database
   * transfer the user on the base of role as customer or staff to respective page
   */
  _loginStatus(event)
  {
    const data=event.detail.data;
      this.message=`${data.message}`
      this.$.toast.open();
      sessionStorage.setItem('userId',data.userId);
      if(event.detail.data.statusCode!=404){
      sessionStorage.setItem('isLogin',true);
      if(data.role=='CUSTOMER')
      this.set('route.path','./user-home')
      else if(data.role=='STAFF')
      this.set('route.path','./staff-home')
  }}
  /**
   * is handle carousel effect on the rendering of login page
   */
  connectedCallback(){
    super.connectedCallback();
    let currentImage = 0;
    let images = [
      "url(../../images/carousal2.jpg)",
      "url(../../images/carousal1.jpg)",
      "url(../../images/carousal3.jpg)"
    ];
    let nextImage = () => {
      currentImage = (currentImage + 1) % images.length;
      this.shadowRoot.host.style.background = images[currentImage];
      this.shadowRoot.host.style.backgroundSize = 'cover';
      setTimeout(nextImage, 5000)
    }
      nextImage();
  }
}

window.customElements.define('login-page', LoginPage);
