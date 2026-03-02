import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { becomeSellerContext, clearError } from "@/store/authSlice";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { LogIn01 } from "@untitledui/icons";
import toast from "react-hot-toast";

export const BecomeSellerPage = () => {
    const [storeName, setStoreName] = useState("");
    const [description, setDescription] = useState("");
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector((state) => state.auth);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(clearError());
        
        try {
            await dispatch(becomeSellerContext({ storeName, description })).unwrap();
            toast.success("Successfully upgraded to a Seller account!");
            navigate("/admin");
        } catch (err: any) {
            toast.error(err || "Failed to upgrade account");
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-secondary">
            <div className="w-full max-w-md space-y-8 bg-primary p-8 rounded-2xl shadow-xl border border-secondary">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
                        Become a Seller
                    </h2>
                    <p className="mt-2 text-center text-sm text-tertiary">
                        Start selling your own music and merchandise on blnK. today.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <Input
                            label="Store Name"
                            type="text"
                            isRequired
                            placeholder="Enter your store's name"
                            value={storeName}
                            onChange={(val) => setStoreName(val as string)}
                        />
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-secondary">
                                Store Description
                            </label>
                            <textarea
                                required
                                rows={4}
                                className="w-full rounded-lg border border-primary bg-primary px-3 py-2 text-primary placeholder-tertiary shadow-xs focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-secondary disabled:text-disabled sm:text-sm transition-all duration-200"
                                placeholder="Tell customers about what you sell..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-md bg-error-secondary p-3 text-sm text-error-primary">
                            {error}
                        </div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            color="primary"
                            className="w-full"
                            isDisabled={loading || !storeName || !description}
                            iconLeading={loading ? undefined : LogIn01}
                        >
                            {loading ? "Upgrading..." : "Register Store"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
