import "../../styles/goods.scss";
const CART_KEY = "cart";

export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product) => {
  const cart = getCart();
  const existing = cart.find((item) => item.id_SP === product.id_SP);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
};

export const getTotalQuantity = () => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
