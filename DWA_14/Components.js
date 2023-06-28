import {LitElement,css, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';


export class MyElement extends LitElement {
    static properties = {
        count: {type:Number},
        minReach: {type:Boolean},
        maxReach: {type:Boolean},
        reset: {type: Boolean},
    };
   
    static styles = css`
    :root{
        --color-green:#31c48d;
        --color-white: #ffffff;
        --color-dark-grey:#33333d;
        --color-medium-gray:#424250;
        --color-light-grey:#9ca3ae;
    }
    
    *{
        box-sizing: border-box;
    } 
      :host {
        display: inline-block;
        padding: 10px;
        background: lightgray;
      }
      .planet {
        color: #ffffff;
      }
      .controls{
        background: yellow;
     }
     /**************************
     Counter  
     *************************/
    .counter{
        background: #33333d;
    
    }
    
    .counter_value{
        width: 100%;
        height: 15rem;
        text-align: center;
        font-size: 6rem;
        font-weight: 900;
        background: none;
        color: #ffffff
        border-width: 0;
        border-bottom: 1px solid #9ca3ae;
    }
    
    .counter_actions{
        display: flex;
    }
    
    
    .button{
        background: none;
        width: 50%;
        border-width: 0;
        color: #ffffff;
        font-size: 3rem;
        /* height: 10rem; */
        border-bottom: 1px solid #9ca3ae;
        transition: transform 0.1s;
        transform: translateY(0);
    
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .counter_button:disabled{
        opacity: 0.2;
    
    }
    
    
    .counter_button:active{
        background: #424250;
        transform: translateY(2%);
    }
    
    .counter_button_first{
        border-right: 1px solid #9ca3ae;
    }
    
    .reset{
        width: 100%;
    
    }
    .footer{
        background:#9ca3ae;
        color: var(--color-light-grey);
        padding: 2rem;
        font-size: 0.9rem;
        text-align: center;
    }
    
    .footer_link{
        color: #ffffff;
    
    }
    html{
        height: 100vh;
    }
    
    body{
        margin: 0;
        background-color: #424250;
        color: #ffffff ;
        font-family: Roboto,Arial, Helvetica, sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
    
    /***************************
    Header
     **************************/
    
     .header{
        display: flex;
        justify-content: space-between;
        margin: 5px;
     }
    
     .header_title{
        font-size: 3rem;
        font-weight: 900;
        color:#9ca3ae ;
     }
    `;
  
    constructor() {
      super();
      this.count = 0;
      this.minReach = false;
      this.maxReach = false;
      this.reset = false;
    }

    add() {
        if (this.count < 15) {
            this.count += 1;
            this.minReach =false;
            this.maxReach = false;
            this.reset = false
            
        } else {
            this.maxReach = true;
        }
    }

    subtract() {
        if (this.count > -15) {
            this.count -= 1;
            this.maxReach = false;
            this.minReach = false;
            this.reset = false;
        } else {
            this.minReach = true;
        }
    }

    resetinfo() {
        this.maxReach = false;
        this.minReach = false;
        this.reset = true;
        this.count = 0 
    }

    render() {
      return html`
      <main class= "counter">
      <input data-key="number" class="counter_value" readonly value=${this.count} />
      <div class="counter_actions">
          <button @click=${this.subtract} ?disabled=${this.minReach} data-key="subtract" size='large' class="counter_button counter_button_first button" >-</button>
          <button @click=${this.add} ?disabled=${this.maxReach} data-key="add" size='large' class="counter_button button" >+</button>
      </div>
      
  </main>
<button @click=${this.resetinfo}   data-key="reset"  class="reset" >Reset</button>
  <footer class="footer">
      Inspired By <a class="footer_link" href="https://tallycount.app/">Tally Count</a>. Note this is a student
      practice project for learning
      JavaScript.
  </footer>
      `;
    }
  
    
    }
  
  customElements.define('my-element', MyElement);
  