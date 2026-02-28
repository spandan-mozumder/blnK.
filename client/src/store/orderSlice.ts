import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";

interface OrderItem {
    product: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

interface Order {
    _id: string;
    items: OrderItem[];
    totalAmount: number;
    paymentStatus: string;
    createdAt: string;
}

interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
    checkoutLoading: boolean;
    pagination: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
    } | null;
}

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
    checkoutLoading: false,
    pagination: null,
};

export const createCheckoutSession = createAsyncThunk(
    "orders/checkout",
    async (
        items: { productId: string; quantity: number }[],
        { rejectWithValue }
    ) => {
        try {
            const response = await api.post("/orders/checkout", { items });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Checkout failed"
            );
        }
    }
);

export const verifyPayment = createAsyncThunk(
    "orders/verifyPayment",
    async (sessionId: string, { rejectWithValue }) => {
        try {
            const response = await api.post("/orders/verify-payment", { sessionId });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Payment verification failed"
            );
        }
    }
);

export const fetchOrderHistory = createAsyncThunk(
    "orders/history",
    async (page: number = 1, { rejectWithValue }) => {
        try {
            const response = await api.get(`/orders/history?page=${page}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch orders"
            );
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createCheckoutSession.pending, (state) => {
            state.checkoutLoading = true;
            state.error = null;
        });
        builder.addCase(createCheckoutSession.fulfilled, (state) => {
            state.checkoutLoading = false;
        });
        builder.addCase(createCheckoutSession.rejected, (state, action) => {
            state.checkoutLoading = false;
            state.error = action.payload as string;
        });

        builder.addCase(fetchOrderHistory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchOrderHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload.orders;
            state.pagination = action.payload.pagination;
        });
        builder.addCase(fetchOrderHistory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default orderSlice.reducer;
