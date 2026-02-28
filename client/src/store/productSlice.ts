import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";

interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    stockQuantity: number;
    image: string;
    createdAt: string;
    updatedAt: string;
}

interface Pagination {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface ProductState {
    products: Product[];
    currentProduct: Product | null;
    pagination: Pagination | null;
    loading: boolean;
    error: string | null;
    filters: {
        search: string;
        category: string;
        sortBy: string;
        order: string;
        page: number;
    };
}

const initialState: ProductState = {
    products: [],
    currentProduct: null,
    pagination: null,
    loading: false,
    error: null,
    filters: {
        search: "",
        category: "",
        sortBy: "createdAt",
        order: "desc",
        page: 1,
    },
};

export const fetchProducts = createAsyncThunk(
    "products/fetchAll",
    async (
        params: {
            page?: number;
            limit?: number;
            search?: string;
            category?: string;
            sortBy?: string;
            order?: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.set("page", params.page.toString());
            if (params.limit) queryParams.set("limit", params.limit.toString());
            if (params.search) queryParams.set("search", params.search);
            if (params.category) queryParams.set("category", params.category);
            if (params.sortBy) queryParams.set("sortBy", params.sortBy);
            if (params.order) queryParams.set("order", params.order);

            const response = await api.get(`/products?${queryParams.toString()}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch products"
            );
        }
    }
);

export const fetchProductById = createAsyncThunk(
    "products/fetchById",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch product"
            );
        }
    }
);

export const createProduct = createAsyncThunk(
    "products/create",
    async (data: Partial<Product>, { rejectWithValue }) => {
        try {
            const response = await api.post("/products", data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create product"
            );
        }
    }
);

export const updateProduct = createAsyncThunk(
    "products/update",
    async (
        { id, data }: { id: string; data: Partial<Product> },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.put(`/products/${id}`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update product"
            );
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            await api.delete(`/products/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete product"
            );
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.pagination = action.payload.pagination;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        builder.addCase(fetchProductById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentProduct = action.payload.product;
        });
        builder.addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.products.unshift(action.payload.product);
        });

        builder.addCase(updateProduct.fulfilled, (state, action) => {
            const index = state.products.findIndex(
                (p) => p._id === action.payload.product._id
            );
            if (index !== -1) {
                state.products[index] = action.payload.product;
            }
            state.currentProduct = action.payload.product;
        });

        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter(
                (p) => p._id !== action.payload
            );
        });
    },
});

export const { setFilters, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
