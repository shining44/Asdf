"use client"

import React, { createContext, useContext, useReducer, useEffect } from "react"
import { CartItem, Product } from "./types"

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number; subscriptionInterval?: "weekly" | "biweekly" | "monthly" | null } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "UPDATE_SUBSCRIPTION"; payload: { productId: string; interval: "weekly" | "biweekly" | "monthly" | null } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "SET_CART_OPEN"; payload: boolean }
  | { type: "LOAD_CART"; payload: CartItem[] }

const initialState: CartState = {
  items: [],
  isOpen: false,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.subscriptionInterval === action.payload.subscriptionInterval
      )

      if (existingIndex > -1) {
        const newItems = [...state.items]
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + action.payload.quantity,
        }
        return { ...state, items: newItems, isOpen: true }
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            product: action.payload.product,
            quantity: action.payload.quantity,
            subscriptionInterval: action.payload.subscriptionInterval || null,
          },
        ],
        isOpen: true,
      }
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload.productId),
      }
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== action.payload.productId),
        }
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }
    }

    case "UPDATE_SUBSCRIPTION": {
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, subscriptionInterval: action.payload.interval }
            : item
        ),
      }
    }

    case "CLEAR_CART": {
      return { ...state, items: [] }
    }

    case "TOGGLE_CART": {
      return { ...state, isOpen: !state.isOpen }
    }

    case "SET_CART_OPEN": {
      return { ...state, isOpen: action.payload }
    }

    case "LOAD_CART": {
      return { ...state, items: action.payload }
    }

    default:
      return state
  }
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number, subscriptionInterval?: "weekly" | "biweekly" | "monthly" | null) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateSubscription: (productId: string, interval: "weekly" | "biweekly" | "monthly" | null) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (isOpen: boolean) => void
  itemCount: number
  subtotal: number
  subscriptionDiscount: number
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("tomoca-cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: parsedCart })
      } catch {
        // Invalid cart data, ignore
      }
    }
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("tomoca-cart", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (product: Product, quantity = 1, subscriptionInterval?: "weekly" | "biweekly" | "monthly" | null) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity, subscriptionInterval } })
  }

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } })
  }

  const updateSubscription = (productId: string, interval: "weekly" | "biweekly" | "monthly" | null) => {
    dispatch({ type: "UPDATE_SUBSCRIPTION", payload: { productId, interval } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  const setCartOpen = (isOpen: boolean) => {
    dispatch({ type: "SET_CART_OPEN", payload: isOpen })
  }

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const subtotal = state.items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity
  }, 0)

  const subscriptionDiscount = state.items.reduce((sum, item) => {
    if (!item.subscriptionInterval) return sum
    const discountPercent = item.subscriptionInterval === "weekly" ? 20 : item.subscriptionInterval === "biweekly" ? 15 : 10
    return sum + (item.product.price * item.quantity * discountPercent) / 100
  }, 0)

  const total = subtotal - subscriptionDiscount

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addItem,
        removeItem,
        updateQuantity,
        updateSubscription,
        clearCart,
        toggleCart,
        setCartOpen,
        itemCount,
        subtotal,
        subscriptionDiscount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
