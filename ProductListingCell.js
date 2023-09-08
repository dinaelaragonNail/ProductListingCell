
// const TEMPLATE = styles + HTMLTemplate



class productListingCell extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.name;
    this.link;
    this.mainImage;
    this.hoverImage;
    this.price;
    this.specialPrice;
    this.sku;
    this.isInStock;
  }
  attributeChangedCallback(nameAtr, oldValue, newValue) {
    switch (nameAtr) {
      case 'name':
        this.name = newValue
        break;
      case "link":
        this.link = newValue
        break;
      case "main-image":
        this.mainImage = newValue
        break;
      case "hover-image":
        this.hoverImage = newValue
        break;
      case "price":
        this.price = newValue
        break;
      case "specialPrice":
        this.specialPrice = newValue
        break;
      case "sku":
        this.sku = newValue
        break;
      case "isInStock":
        this.isInStock = newValue
        break;
    }
  }
  static get observedAttributes() {
    return ["link", "main-image", "hover-image", "price", "specialPrice", "name", "sku", "isInStock"];
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
<div class="card-container">
<slot name="cartButton" class="addtocart"></slot>
<a class="link-product" href=${this.link}>
  <div class="initial product-image ">
    <img src=${this.mainImage} alt="" class="main-image" />
  </div>
  ${this.hoverImage ?
        `<div class="hoverme product-image">
    <img src=${this.hoverImage} alt="" class="hover-image" />
  </div>`
        :
        ` <div class="hoverme product-image ">
  <img src=${this.mainImage} alt="" class="main-image" />
</div>`
      }
</a>
<slot name="toggle"></slot>
<a class="information" href=${this.link}>
  <div class="prices">
    <span class=${this.specialPrice ? 'origin-price' : 'regular-price'}>${this.price || ''}</span>
    <span class="special-price">${this.specialPrice || ''}</span>
  </div>
  <h2 class="name">${this.name || ''}</h2>
  <h4 class="sku">${this.sku || ''}</h4>
</a>
</div>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  cursor: pointer;
  color: #000;
}
.card-container {
  max-width: 280px;
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(50px, minmax(fit-content, 1fr)));
  grid-template-columns: minmax(150px, 280px);
  justify-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 1px rgba(0,0,0, 0.15);
}
.product-image {
  width: 100%;
  margin-top: -20px;
  z-index: 0;
  opacity: 1;
  height: 260px;
}
.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  padding: 5px;
}
.hoverme {
  display: none;
}
.initial{
  display: block;
}
.initial:hover{
  display: none!important;
}
.product-image:hover~.hoverme {
  display: block!important;
}
.addtocart {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 0;
  z-index: 2;
}
.addtocart svg {
  width: 27px;
  aspect-ratio: 1/1;
}
.information {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px 5px 20px 0;
}
.name {
  font-size: 1.4375rem;
  font-weight: 700;
  text-align: center;
}
.sku {
  font-size: 1.25rem;
  font-weight: 300;
  padding-top: 5px;
  text-align: center;
}
</style>
    `
  }

}


customElements.define('product-listing-cell', productListingCell);

