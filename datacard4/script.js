let data = [];
const parent = document.getElementById("root");

const success = (val) => {
  console.log("success", val);
  const data2 = val.json();
  parent.textContent = "";
  data2.then((val2) => {
    console.log("data", val2);
    data = val2;
    const { products } = data;
    createUI(products);
  });
};
const error = (val) => {
  console.log("fail", val);
};
const pr = fetch("https://dummyjson.com/products");
pr.then(success).catch(error);
const showItem = (card, product) => {
  const para = document.createElement("p");

  para.textContent = product;
  card.appendChild(para);
};
const addShow = (card, text, className, product) => {
  const div = document.createElement("div");
  div.textContent = text;
  div.className = className;

  div.addEventListener("click", () => showItem(card, product));

  card.appendChild(div);
};
const addPara = (card, text) => {
  const para = document.createElement("p");
  para.textContent = text;

  card.appendChild(para);
};
const addImage = (card, image, className) => {
  const img = document.createElement("img");
  img.src = image;
  img.className = className;
  card.appendChild(img);
};
const addButton = (card, text, className, idx) => {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.className = className;
  btn.addEventListener("click", (e) => deleteItem(e));
  card.appendChild(btn);
};
const deleteItem = (e) => {
  const elem = e.target.closest("div");
  elem.remove();
};
const createCard = (container, product, idx) => {
  const { id, title, price, rating, review, brand, thumbnail } = product;
  const card = document.createElement("div");
  card.className = "card";
  createCard.id = id;
  //   addPara(card, `Title : ${title}`);
  addImage(card, thumbnail, "images");
  //   addPara(card, `Price: ${price}`);
  //   addPara(card, rating);
  //   addPara(card, brand);
  //   addPara(card, review);

  const ans = Object.entries(product);
  console.log(ans);
  const allowed = ["id", "price", "rating", "title"];
  ans.forEach((arr) => {
    const key = arr[0];
    if (allowed.includes(key)) {
      addPara(card, `${arr[0]}:${arr[1]}`);
    }
  });
  addShow(card, "Show-more", "show-more", product, idx);
  addButton(card, "Delete", "delete-button", idx);
  container.appendChild(card);
};

const createUI = (arr) => {
  const container = new DocumentFragment();
  arr.forEach((obj, idx) => createCard(container, obj, idx));

  parent.appendChild(container);
};

function clicked() {
  const input = document.getElementById("input").value.toLowerCase();
  const api = fetch(`https://dummyjson.com/products/search?q=${input}`);
  api.then(success).catch(error);
}
