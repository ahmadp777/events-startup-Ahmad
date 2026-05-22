import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "cartItems";

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    function addToCart(event) {
        setCartItems((previousItems) => {
            const existingItem = previousItems.find((item) => item.id === event.id);

            if (existingItem) {
                return previousItems.map((item) =>
                    item.id === event.id ? { ...item, quantity: item.quantity + 1 } : item,
                );
            }

            return [
                ...previousItems,
                {
                    id: event.id,
                    name: event.name,
                    price: event.price,
                    quantity: 1,
                },
            ];
        });
    }

    function removeFromCart(eventId) {
        setCartItems((previousItems) => previousItems.filter((item) => item.id !== eventId));
    }

    function clearCart() {
        setCartItems([]);
    }

    function updateQuantity(eventId, quantity) {
        const parsedQuantity = Number(quantity);

        if (!Number.isFinite(parsedQuantity)) {
            return;
    }

        if (parsedQuantity <= 0) {
            removeFromCart(eventId);
            return;
        }

        setCartItems((previousItems) =>
            previousItems.map((item) =>
                item.id === eventId ? { ...item, quantity: parsedQuantity } : item,
            ),
        );
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                updateQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}