//custom web component for displaying a clothing item
class ClothingItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      // component's HTML template
      this.shadowRoot.innerHTML = `
        <style>
          /* Component styles */
          .clothing-item {
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 10px;
          }
  
          .title {
            font-weight: bold;
          }
  
          .price {
            color: green;
          }
        </style>
  
        <div class="clothing-item">
          <div class="title">${this.getAttribute('name')}</div>
          <div class="price">Price: ${this.getAttribute('price')}</div>
          <button>Add to Cart</button>
        </div>
      `;
    }
  }
  
  // Define the custom element
  customElements.define('clothing-item', ClothingItem);
  