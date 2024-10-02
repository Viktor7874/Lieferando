function basketHtml(j){

return`
    <div id="shoppingCart" class="shoppingCart"> 
    

    <div id="menuu${j}" class="menuu">
      <div id="amount" class="amount">${amountBasket[j]} </div>
      <div id="menuu" class="menuu"> <p class="menuNames">${basketMenu[j]}</p> </div><br>
      <div><button id="spliceButton" onclick="spliceMenu(${j})">-</button> </div>
      <div><button id="addButton" onclick="pushIn(${j})">+</button> </div>
      <img src="img/pen.png" class="penImg" </div>
      <div id="price" class="price">${basketPrice[j]}€</div>
      <img src="img/trash.png" class="penImg" onclick="remove(${j})" 
      
   ></img></div>`;

}


function endPriceHtml(lastPrice,deliveryCosts,endPrice){
    return  `<div id="tableStyle">
    
    <table class="tableBody">
        <tr>
            <td>Zwischensumme</td>
            <td id="firstPrice">${lastPrice}€</td>
        </tr>
        <tr>
            <td>Lieferkosten</td>
            <td id="deliveryCosts">${deliveryCosts}€</td>
        </tr>
        <tr style="font-weight: bold;">
            <td>Gesamt</td>
            <td id="summedOrderPrice">${endPrice}€</td>
        </tr>
    </table>
        </div>
<button id="orderButton" onclick='orderNotification()'>Jetzt Bestellen </button>

    `;
}

function menuTemplate(i){
    return`   

 <div class="menu" onclick="toggleBasket(${i})"> 
 <div class="menuHeadline"> 
  <h1>${menu[i]}</h1>
  <button class="buttonStyle" toggleMenu() ">+</button>
  </div>
  <div class="menuPics">
    <p class="description"> ${description[i]}</p>
    <span><img src="${images[i]}" class="menuImg"> </span>
    </div>
<P class="price">${prices[i]}€</P>
 </div>

</div>`;
}