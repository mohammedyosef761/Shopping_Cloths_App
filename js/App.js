
  const productsDom =document.querySelector('.products-center');
  const cartItems = document.querySelector('.cart-items');

  const BlackScreen =document.querySelector('.black-screen');
  const loginLogout = document.querySelector('#logout');
   let totalPrice ;

 
  const showCart =document.querySelector('.showCart');
const itemContainer =document.querySelector('.item-container');

const close =document.querySelectorAll('#close')[0];







class UI {
    displayProducts(products){
      let result = '';
      products.forEach(product => {
          result  += `
          <!--single product-->
          <article class="product">
              <div class="img-container">
              <img src=${product.image} alt="product" class="product-img">
              <button class="bag-btn" data-id=${product.id}> 
                  <i class="fas fa-shopping-cart">add to bag</i>
              </button>
           </div>
           <h3>${product.title}</h3>
           <h4>${product.price}</h4>
          </article>
             <!--end of single product--> 
             
           
          ` ;
          
      });

      productsDom .innerHTML = result ;


      //listener to the button and added to the cart

   const allBuyButtons =document.querySelectorAll('.bag-btn');  
    console.log(allBuyButtons);
    allBuyButtons.forEach(item=>{
    item.addEventListener('click',(eo)=>{
        item.setAttribute("disabled","");
        // item.innerText ="DONE";
        let id=item.dataset.id;
       let cartItem= {...Storage.getProduct(id),amount:1};
       cart = [...cart,cartItem];

       localStorage.setItem("cart",JSON.stringify(cart));

     console.log(cart);


    totalPrice=document.querySelector('.total-price');

      cartItems.innerText='';
       this.price(cart);
       this.displayCart(cart);
       this.totalPrieceCart();


      
          
    })
  })

}
totalPrieceCart(){
  totalPrice.innerText = (JSON.parse(localStorage.getItem('totalPrice')));
}

displayCart(cart){
  
    let resCart='<div  id="close" class="pleaseClose">&#10006;</div>';
    cart.forEach(item=>{
     resCart  +=`

     <div dir="rtl" class="item-container" >
     <div class="img-title-parent"style="display:flex;align-items:center;width:33px;">
        <img src="${item.image}" alt="">
        <p class="product-name title-sm">${item.title}</p>
    </div>
    <div style="display: flex; align-items: center;">
    <input type="number" value="1" min="1"  class="input-quantity" dir="ltr" id="input-quantity" data-id=${item.id} >
    <p >:Quantity</p>
    
    </div>
    
    <div class="price" style="color:yellow">
    ${item.price}
    </div>
    
    
    <button class="btn btn-secondary" data-id=${item.id}>
        Delete
    </button>

    </div>
     `;
       
    });
    BlackScreen.innerHTML =resCart;
    BlackScreen.innerHTML +=`
    <article class="confirm-by">
    <div>
        <p>Total price</p>
        <div class="total-price">0$</div>
      </div>
      <button style="color:white;background-color:red;padding:15px; border-radius:15px;cursor:pointer;margin-left:10px"><a href="checkout.html" >Purshase</a></button>
      </article>
      <button class="btn-prim">Clear All</button>
    `

    totalPrice=document.querySelector('.total-price');

}


price(cart){
    let num=0;
    let total=0;
    cart.map(item=>{
      num+=Number(item.amount);
      total+=(item.price * item.amount);
    })
    
    cartItems.innerText =num;
    console.log(total);
    //console.log(totalPrice);
    localStorage.setItem('totalPrice',JSON.stringify(parseFloat(total.toFixed(2))));
}




}

let objUi=new UI();
close.addEventListener('click',(eo)=>{
  
BlackScreen.style.transform="translateX(-110vw)";

console.log("YESSSSSSs");
})

 //show the cart 
 showCart.addEventListener('click',(eo)=>{
   if(cart.length)BlackScreen.style.transform = "translateX(0)";
    })

  BlackScreen.addEventListener('click',(eo)=>{
      if(eo.target.classList.contains('pleaseClose')){
        BlackScreen.style.transform="translateX(-110vw)";
      }
      else if(eo.target.classList.contains('input-quantity')){
        let addAmount =eo.target;
        let id = addAmount.dataset.id;
        console.log(id);
        let tempItem = cart.find(item=>item.id===id);
        tempItem.amount = eo.target.value;
        totalPrice=document.querySelector('.total-price');
        cartItems.innerText='';
        objUi.price(cart);
        objUi.totalPrieceCart();
        console.log(totalPrice);
        //totalPrice.innerText = (JSON.parse(localStorage.getItem('totalPrice')));
      
}

else if(eo.target.classList.contains('btn-secondary')){
  // let btnPrim=document.querySelector('.btn-prim');
  // console.log(btnPrim);
   console.log("here",eo.target);
   let id= eo.target.dataset.id;
   console.log(id);
   console.log("cart",cart);
   cart =cart.filter(item=> item.id !==id);
   console.log("cart after",cart)
   objUi.price(cart);
   objUi.displayCart(cart);
   objUi.totalPrieceCart();
   localStorage.setItem('cart',JSON.stringify(cart));
   if(cart.length==0){
    BlackScreen.innerHTML = '';
    BlackScreen.style.transform="translateX(-110vw)";
   }

}
else if(eo.target.classList.contains('btn-prim')){
  
  let btnPrim=document.querySelector('.btn-prim');
  console.log(btnPrim);
  

  cart=[];
  localStorage.setItem('cart',cart);
  objUi.price(cart);
  objUi.displayCart(cart);
  objUi.totalPrieceCart();
  BlackScreen.innerHTML = '';
  BlackScreen.style.transform="translateX(-110vw)";



}
  })


 




  let cart = [];
  let buttonDom=[];
//getting the products
class Products{
 
    async getProducts(){
    try{
    let result = await fetch('product.json');
    let data   =await result.json(); 
    let products = data.items;
    products = products.map(item =>{
    const {title,price} = item.fields;
    const {id} = item.sys;
    const image = item.fields.image.fields.file.url;

    return {title,price,id,image};

    });
    return products;
    }
    catch(error){
            console.log(error);
    }
    }
    
}



class Storage{

    static saveProducts(products){
        localStorage.setItem("products",JSON.stringify(products))
    }

    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product =>product.id ===id);
        }

    

}


document.addEventListener("DOMContentLoaded", ()=>{
    const ui = new UI();
    const products = new Products();

    if(localStorage.getItem("username")){
      loginLogout.innerHTML = localStorage.getItem("username")
    }

    // get all prpducts
    products.getProducts().then(products=>{ 
        ui.displayProducts(products);
        Storage.saveProducts(products);
});

});