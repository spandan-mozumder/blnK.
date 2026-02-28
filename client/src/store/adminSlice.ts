import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";

interface Analytics {
    overview: {
        totalSales: number;
        totalRevenue: number;
        avgOrderValue: number;
        totalProducts: number;
    };
    recentOrders: any[];
    salesByCategory: any[];
    lowStockProducts: any[];
    dailySales: any[];
}

interface AdminState {
    analytics: Analytics | null;
    allOrders: any[];
    loading: boolean;
    error: string | null;
    ordersPagination: any;
}

const initialState: AdminState = {
    analytics: null,
    allOrders: [],
    loading: false,
    error: null,
    ordersPagination: null,
};

export const fetchAnalytics = createAsyncThunk(
    "admin/analytics",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/analytics");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch analytics"
            );
        }
    }
);

export const fetchAllOrders = createAsyncThunk(
    "admin/orders",
    async (
        params: { page?: number; status?: string } = {},
        { rejectWithValue }
    ) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.set("page", params.page.toString());
            if (params.status) queryParams.set("status", params.status);
            const response = await api.get(
                `/admin/orders?${queryParams.toString()}`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch orders"
            );
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAnalytics.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAnalytics.fulfilled, (state, action) => {
            state.loading = false;
            state.analytics = action.payload;
        });
        builder.addCase(fetchAnalytics.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        builder.addCase(fetchAllOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.allOrders = action.payload.orders;
            state.ordersPagination = action.payload.pagination;
        });
        builder.addCase(fetchAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default adminSlice.reducer;
