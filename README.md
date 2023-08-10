# About App Fast React Pizza:

- This is very simple app where users can order one or more pizzas from a menu

- Requires no user accounts and no login: users just input their names before using the app

- Pizza menu is loaded from an API

- Users can add a multiple pizzas to a cart before ordering

- Ordering requires just the user name, phone number and address

- If possible GPS location should also be provided to make delivery easily

- Users can mark their order as a "priority" for an additional 20% of the card price

- Orders are made by sending a POST request with the order data (users data + selected pizzas) to the API

- All payments are made on delivery, so no payment processing is necessary in the app

- Each order will get a unique ID that should be displayed so the user can later look up their order based on the ID

- Users should be able to mark their order as priority order even after it has been placed

# Features

User, Menu, Cart, Order

# Necessary pages:

- Home Page ("/")
- Pizza Menu ("/menu")
- Cart ("/cart")
- Placing a new order ("/order/new")
- Looking up an order ("order/:orderId")

# Technology decision:

- Routing -> React Router
- Styling -> TailwindCSS
- Remote State Management -> React Router (v6.4+ new way of fetching - data "render-as-you-fetch")
- UI State Management -> Redux

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
