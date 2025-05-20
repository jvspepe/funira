<<<<<<< HEAD
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TCartProduct } from '@/@types/product';
=======
import { CartProduct } from '@/@types/models';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
>>>>>>> feat/chakraui-3-migration

type CartState = {
  cart: CartProduct[];
  total: number;
};

<<<<<<< HEAD
const LOCAL_STORAGE_CART_SLICE_KEY = 'cartState';
=======
const LOCAL_STORAGE_CART_KEY = 'funira-cart';
>>>>>>> feat/chakraui-3-migration

function getCartState(): CartState {
  if (!localStorage.getItem(LOCAL_STORAGE_CART_KEY)) {
    return { cart: [], total: 0 };
  }

  const cartState = JSON.parse(
<<<<<<< HEAD
    localStorage.getItem(LOCAL_STORAGE_CART_SLICE_KEY) || ''
=======
    localStorage.getItem(LOCAL_STORAGE_CART_KEY) ?? ''
>>>>>>> feat/chakraui-3-migration
  ) as CartState;

  return cartState;
}

function calculateTotal(cart: CartProduct[]) {
  return cart.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0
  );
}

function saveToLocalStorage(cartState: CartState) {
  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartState));
}

const initialState: CartState = getCartState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartProduct>) {
      const draft = state;

<<<<<<< HEAD
      const isProductInCart = draft.cart.findIndex(
        (product) => product.id === action.payload.uid
=======
      const cartItemIndex = draft.cart.findIndex(
        (product) => product.id === action.payload.id
>>>>>>> feat/chakraui-3-migration
      );

      if (cartItemIndex >= 0) {
        draft.cart[cartItemIndex].quantity += action.payload.quantity;
      } else {
        draft.cart.push(action.payload);
      }
      draft.total = calculateTotal(draft.cart);

      saveToLocalStorage(draft);

      return draft;
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const draft = state;

      const productIndex = draft.cart.findIndex(
        (product) => product.id === action.payload
      );

      draft.cart[productIndex].quantity += 1;

      draft.total = calculateTotal(draft.cart);

      saveToLocalStorage(draft);

      return draft;
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const draft = state;

      const productIndex = draft.cart.findIndex(
        (product) => product.id === action.payload
      );

      if (draft.cart[productIndex].quantity === 1) {
        draft.cart.splice(productIndex, 1);
      } else {
        draft.cart[productIndex].quantity -= 1;
      }

      draft.total = calculateTotal(draft.cart);

      saveToLocalStorage(draft);

      return draft;
    },
    changeQuantity(
      state,
      action: PayloadAction<{ uid: string; quantity: number }>
    ) {
      const draft = state;

      const cartItemIndex = draft.cart.findIndex(
        (item) => item.id === action.payload.uid
      );

      if (cartItemIndex >= 0) {
        if (action.payload.quantity > draft.cart[cartItemIndex].quantity) {
          draft.cart[cartItemIndex].quantity += 1;
        } else {
          draft.cart[cartItemIndex].quantity -= 1;
        }
      }

      draft.total = calculateTotal(draft.cart);
      saveToLocalStorage(draft);
      return draft;
    },
    removeFromCart(state, action) {
      const draft = state;

      const productIndex = draft.cart.findIndex(
        (product) => product.id === action.payload
      );

      draft.cart.splice(productIndex, 1);

      draft.total = calculateTotal(draft.cart);

      saveToLocalStorage(draft);

      return draft;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  changeQuantity,
  decreaseQuantity,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
