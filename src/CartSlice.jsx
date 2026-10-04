import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Sepetteki ürünlerin tutulacağı başlangıç dizisi
  },
  reducers: {
    // Ürünü sepete ekleme veya miktarını artırma
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // Ürünü adına göre sepetten tamamen silme
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },

    // Ürün miktarını yeni değere güncelleme
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Eylem oluşturucuları (action creators) dışa aktarma
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Reducer'ı store.js'de kullanmak üzere varsayılan olarak dışa aktarma
export default CartSlice.reducer;