import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";

interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user" | "seller";
    sellerDetails?: {
        storeName: string;
        description: string;
    };
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    "auth/register",
    async (
        data: { name: string; email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.post("/auth/register", data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (
        data: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.post("/auth/login", data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

export const getProfile = createAsyncThunk(
    "auth/profile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/auth/profile");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch profile"
            );
        }
    }
);

export const becomeSellerContext = createAsyncThunk(
    "auth/become-seller",
    async (
        data: { storeName: string; description: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.post("/auth/become-seller", data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to upgrade account"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.user = action.payload.user;
        });

        builder.addCase(becomeSellerContext.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(becomeSellerContext.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        });
        builder.addCase(becomeSellerContext.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
