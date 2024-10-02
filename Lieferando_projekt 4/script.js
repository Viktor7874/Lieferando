let menu = ["CheeseBurger", "Hamburger", "Pizza Calzone", "Pizza Hawaii", "Pizza Waikiki"];
let prices = [5.00, 7.00, 8.00, 10.00, 12.00];
let description = ["Saftiges Rindersteak mit knusprigen Bratkartoffeln.", "Frischer Caesar-Salat mit Hähnchen und Parmesan.",
  "Cremige Tomatensuppe mit knusprigem Brot.", "Knusprige Pizza mit frischen Tomaten und Basilikum.", "Süßes Schokoladenmousse mit frischen Beeren."];
let images = ['img/cheeseburger.png', 'img/hamburger.png', 'img/pizzacalzone.png', 'img/pizzahawaii.png', 'img/pizzawaikiki.png'];


let basket = [`<h1>WarenKorb </h1>`];
let basketMenu = [];
let basketPrice = [];
let amountBasket = [];
let totalPrice = [];
let wholePrice = [];
let deliveryCosts = [2];


function render() {
  let shoppingBasket = document.getElementById("shoppingBasket");
  shoppingBasket.innerHTML = `${basket}`;
  for (j = 0; j < basketMenu.length; j++) {
    shoppingBasket.innerHTML += basketHtml(j);
  }
  renderEndPrice();
}


function renderMenus() {
  let menuu = document.getElementById("menu");
  for (i = 0; i < prices.length; i++) {
    menuu.innerHTML += menuTemplate(i);
  }
}


function toggleBasket(i) {
  basket = `<h1>WarenKorb </h1>`;
  pushInBasket(i);
}


function pushInBasket(i) {
  if (basketMenu.includes(menu[i])) {
    let index = basketMenu.indexOf(menu[i]);
    amountBasket[index]++;
    basketPrice[index] += prices[i];
  } else {
    basketMenu.push(menu[i]);
    basketPrice.push(prices[i]);
    amountBasket.push(1);
  }
  render(i);
}


function updatePrices() {
  basketMenu.forEach((item, j) => {
    let menuIndex = menu.indexOf(item);
    if (menuIndex !== -1) {
      basketPrice[j] = prices[menuIndex] * amountBasket[j];
    }
  });
}


function checkEmptyBasket() {
  if (basketMenu.length === 0) {
    let shoppingBasket = document.getElementById('shoppingBasket');
    shoppingBasket.classList.replace("displayBlock", "displayNone");
    toggleBasket2();
  }
}


function spliceMenu(i) {
  amountBasket[i]--;

  if (amountBasket[i] === 0) {
    basketMenu.splice(i, 1);
    basketPrice.splice(i, 1);
    amountBasket.splice(i, 1);
  }
  updatePrices();
  checkEmptyBasket();
  render();
}


function pushIn(i) {
  amountBasket[i]++;
  for (let j = 0; j < basketMenu.length; j++) {
    let menuIndex = menu.indexOf(basketMenu[j]);
    if (menuIndex !== -1) {
      basketPrice[j] = prices[menuIndex] * amountBasket[j];
    }else {
      basketMenu.push(menu[i]);
      basketPrice.push(prices[i]);
      amountBasket.push(1);
    }toggleMenu();
  }
  renderEndPrice();
  render();
}


function calculatePrice() {
  let summe = basketPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  totalPrice.splice(0, totalPrice.length, summe);
}


function calculateSum(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}


function calculateDeliveryCosts(price) {
  return price <= 10 ? 0 : 2;
}


function renderEndPrice() {
  let summe = calculateSum(basketPrice);
  let deliveryCosts = calculateDeliveryCosts(summe);
  let endPrice = summe + deliveryCosts;

  wholePrice.push(summe);
  basketIcon(summe);
  document.getElementById("shoppingBasket").innerHTML += endPriceHtml(summe, deliveryCosts, endPrice);
}


function orderNotification() {
  if (basketPrice != 0) {
    basket += `Vielen Dank für ihre Bestellung.`;
    clearBasket(i);
  } else {
    basket = `<h1>WarenKorb </h1>`;
    basket += `Bitte Artikel hinzufügen.`;
    render();
  }
}


function toggleMenu() {
  let menu = document.getElementById("allMenus");
  let shoppingBasket = document.getElementById("shoppingBasket");
  let header = document.querySelector("header");
  
  updateMenuWidth(menu, header, shoppingBasket);
  window.addEventListener('resize', updateMenuWidth);
  const observer = new MutationObserver(updateMenuWidth);
  observer.observe(shoppingBasket, { attributes: true, attributeFilter: ['class'] });
  updateMenuWidth();
}


function updateMenuWidth(menu, header, shoppingBasket) {
  if (!menu || !shoppingBasket) {
    return console.error("Das allMenus-Element oder das Shopping-Basket-Element wurde nicht gefunden");
  }

  const isNarrowScreen = window.matchMedia("(max-width: 1065px)").matches;
  const isDisplayBlock = shoppingBasket.classList.contains("displayBlock");

  const width = isDisplayBlock ? (isNarrowScreen ? "100%" : "70%") : "";
  menu.style.width = width;
  header.style.width = width;
}


function toggleMenuwithoutBasket() {
  let basket = document.getElementById("shoppingBasket");
  let header = document.querySelector("header");
  let menu = document.getElementById("allMenus");
  menu.style.width = "100%";
  header.style.width = "100%";
  basket.style.remove = "displayBlock";
}

function constForToggleBasket(){
  const shoppingBasket = document.getElementById("shoppingBasket");
  const header = document.querySelector('header');
  const menu = document.getElementById("allMenus");
  toggleBasket2(shoppingBasket,header,menu);
}


function toggleBasket2(shoppingBasket,header,menu) { 
  constForToggleBasket();
  if (!shoppingBasket) {
    return console.error("Das shoppingBasket-Element wurde nicht gefunden");
  }
  const isDisplayBlock = shoppingBasket.classList.toggle("displayBlock");
  shoppingBasket.classList.toggle("displayNone", !isDisplayBlock);
  const width = isDisplayBlock ? "70%" : "100%";
  menu.style.width = width;
  header.style.width = "100%";

  render();
}


document.addEventListener("DOMContentLoaded", function () {
  const basketIcon = document.getElementById("basket_icon");
  const shoppingBasket = document.getElementById("shoppingBasket");
  const header = document.querySelector("header");
  const menu = document.getElementById("allMenus");
  const headImg = document.querySelector(".headImg");
  const isNarrowScreen = window.matchMedia("(max-width: 1065px)");

  
  function adjustLayout() {
    const isDisplayBlock = shoppingBasket.classList.contains("displayBlock");
    const width = (isNarrowScreen.matches || !isDisplayBlock) ? "100%" : "70%";
    
    applyWidth(width);
  }

 
  function applyWidth(width) {
    header.style.width = width;
    menu.style.width = width;
    headImg.style.width = width;
  }

  
  function toggleBasket() {
    shoppingBasket.classList.toggle("displayBlock");
    shoppingBasket.classList.toggle("displayNone");
    adjustLayout();
  }

  
  function addEventListeners() {
    window.addEventListener('resize', adjustLayout);
    basketIcon.addEventListener("click", toggleBasket);
  }

  adjustLayout();
  addEventListeners();
});


function basketIcon(lastPrice) {
  let basketIcon = document.getElementById("basketIconImg");
  basketIcon.innerHTML = `${lastPrice}€`;

}


function clearBasket() {
  basketMenu = [];
  basketPrice = [];
  amountBasket = [];
  basket += [];
  render();
}


function remove(j) {
  basketMenu.splice(j, 1);
  basketPrice.splice(j, 1);
  amountBasket.splice(j, 1);

  render();
}