
import { createContext, useReducer } from "react";

export const Cart = createContext();

function reducer(state, action) {
  if (action.type === "ADD_ITEMS") {
    const newItem = action.payload;
    const AddedItem = state.cart.Items.find(
      (tempItem) => tempItem._id === newItem._id
    );

    const Items = AddedItem
      ? state.cart.Items.map((tempItem) =>
          tempItem._id === AddedItem._id ? newItem : tempItem
        )
      : [...state.cart.Items, newItem];
    //store the items in local in case when refreshing the page, they wont lose
    localStorage.setItem("Items", JSON.stringify(Items));
    return { ...state, cart: { ...state.cart, Items } };
  } else if (action.type === "REMOVE_ITEMS") {
    const Items = state.cart.Items.filter(
      (item) => item._id !== action.payload._id
    );
    localStorage.setItem("Items", JSON.stringify(Items));
    return { ...state, cart: { ...state.cart, Items } };
  } else if (action.type === "CART_CLEAR") {
    return {
      ...state,
      cart: {
        ...state.cart,
        Items: [], ///cartItems: []
      },
    };
  } else if (action.type === "SIGN_IN") {
    return { ...state, Info: action.payload };
  } else if (action.type === "SIGN_OUT") {
    return {
      ...state,
      Info: null,
      cart: {
        Items: [],
        addressInfo: {},
        paymentMethod: "",
        pay: "",
      },
    };
  } else if (action.type === "UPLOAD_ADDRESS") {
    return {
      ...state,
      cart: {
        ...state.cart,
        addressInfo: action.payload,
      },
    };
  } else if (action.type === "SAVE_PAY") {
    return {
      ...state,
      cart: {
        ...state.cart,
        pay: action.payload,
      },
    };
  } else if (action.type === "SAVE_PAYMENT_METHOD") {
    return {
      ...state,
      cart: {
        ...state.cart,
        paymentMethod: action.payload,
      },
    };
  } else return state;

  // switch (action.type) {
  //   case 'ADD_ITEMS':
  //     // add to cart
  //     return {
  //       ...state,
  //       cart: {
  //         ...state.cart,
  //         Items: [...state.cart.Items, action.payload],
  //       },
  //     };

  //default:
}

const iniCart = {
  Info: localStorage.getItem("Info")
    ? JSON.parse(localStorage.getItem("Info"))
    : null,

  cart: {
    addressInfo: localStorage.getItem("addressInfo")
      ? JSON.parse(localStorage.getItem("addressInfo"))
      : {},

    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "",

    pay: localStorage.getItem("pay") ? localStorage.getItem("pay") : "",

    Items: localStorage.getItem("Items")
      ? JSON.parse(localStorage.getItem("Items"))
      : [],
  },
};

export function CartFunction(props) {
  const [state, dispatch] = useReducer(reducer, iniCart);
  const result = { state, dispatch };
  return <Cart.Provider value={result}>{props.children} </Cart.Provider>;
}