"use strict";

const products = [
  { id: 1, name: "Ноутбук", price: 350000, category: "Техника", inStock: true },
  { id: 2, name: "Мышь", price: 7000, category: "Аксессуары", inStock: true },
  { id: 3, name: "Монитор", price: 120000, category: "Техника", inStock: false },
  { id: 4, name: "Клавиатура", price: 15000, category: "Аксессуары", inStock: true },
  { id: 5, name: "Наушники", price: 28000, category: "Аудио", inStock: true },
  { id: 6, name: "Микрофон", price: 45000, category: "Аудио", inStock: false }
];

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  
  if (!product.inStock) {
    card.classList.add("product-card--out");
  }

  const title = document.createElement("h3");
  title.className = "product-card__title";
  title.textContent = product.name;

  const category = document.createElement("p");
  category.className = "product-card__category";
  category.textContent = "Категория: " + product.category;

  const price = document.createElement("p");
  price.className = "product-card__price";
  price.textContent = "Цена: " + product.price + " ₽";

  const stock = document.createElement("p");
  stock.className = "product-card__stock";
  stock.textContent = product.inStock ? "В наличии" : "Нет в наличии";

  card.append(title, category, price, stock);
  
  return card;
}

function calculateStats(items) {
  return items.reduce((acc, item) => {
    acc.count += 1;
    
    if (item.inStock) {
      acc.availableCount += 1;
    }
    
    acc.totalPrice += item.price;

    if (!acc.mostExpensive || item.price > acc.mostExpensive.price) {
      acc.mostExpensive = item;
    }

    return acc;
  }, { 
    count: 0, 
    availableCount: 0, 
    totalPrice: 0, 
    mostExpensive: null 
  });
}

function countByCategory(items) {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = 0;
    }
    acc[item.category] += 1;
    return acc;
  }, {});
}

function renderCatalog(items) {
  const catalogContainer = document.querySelector("#catalog");
  const categoryStatsContainer = document.querySelector("#category-stats");

  if (catalogContainer) catalogContainer.replaceChildren();
  if (categoryStatsContainer) categoryStatsContainer.replaceChildren();

  items.forEach(item => {
    const card = createProductCard(item);
    if (catalogContainer) catalogContainer.appendChild(card);
  });

  const stats = calculateStats(items);
  
  const productCountEl = document.querySelector("#product-count");
  if (productCountEl) productCountEl.textContent = stats.count;

  const availableCountEl = document.querySelector("#available-count");
  if (availableCountEl) availableCountEl.textContent = stats.availableCount;

  const totalPriceEl = document.querySelector("#total-price");
  if (totalPriceEl) totalPriceEl.textContent = stats.totalPrice;
  
  const mostExpensiveEl = document.querySelector("#most-expenseive"); 
  if (mostExpensiveEl) {
    mostExpensiveEl.textContent = stats.mostExpensive 
      ? stats.mostExpensive.name + " - " + stats.mostExpensive.price + " ₽" 
      : "";
  }

  const categories = countByCategory(items);
  if (categoryStatsContainer) {
    for (const category in categories) {
      if (Object.hasOwn(categories, category)) {
        const li = document.createElement("li");
        li.textContent = category + ": " + categories[category];
        categoryStatsContainer.appendChild(li);
      }
    }
  }

  return items.length;
}

window.domSrs = {
  products,
  createProductCard,
  calculateStats,
  countByCategory,
  renderCatalog,
};

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#catalog")) {
    renderCatalog(products);
  }
});