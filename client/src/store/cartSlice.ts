import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    productId: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
    stockQuantity: number;
}

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

const loadCartFromStorage = (): CartItem[] => {
    try {
        const cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) : [];
    } catch {
        return [];
    }
};

const saveCartToStorage = (items: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(items));
};

const calculateTotals = (items: CartItem[]) => ({
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
});

const loadedItems = loadCartFromStorage();
const totals = calculateTotals(loadedItems);

const initialState: CartState = {
    items: loadedItems,
    totalItems: totals.totalItems,
    totalPrice: totals.totalPrice,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existing = state.items.find(
                (item) => item.productId === action.payload.productId
            );
            if (existing) {
                if (existing.quantity < existing.stockQuantity) {
                    existing.quantity += 1;
                }
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;
            saveCartToStorage(state.items);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.productId !== action.payload
            );
            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;
            saveCartToStorage(state.items);
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ productId: string; quantity: number }>
        ) => {
            const item = state.items.find(
                (i) => i.productId === action.payload.productId
            );
            if (item) {
                item.quantity = Math.max(
                    1,
                    Math.min(action.payload.quantity, item.stockQuantity)
                );
            }
            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;
            saveCartToStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
            localStorage.removeItem("cart");
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
