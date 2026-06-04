export const paths = {
  admin: {
    categories: "/admin/categories",
    createProduct: "/admin/create-product",
    dashboard: "/admin/dashboard",
    editProduct: "/admin/edit-product/:productId",
    home: "/admin",
    products: "/admin/products",
    users: "/admin/users",
  },
  user: {
    about: "/about",
    cart: "/cart",
    home: "/",
    product: "/products/:id",
    products: "/products",
    signIn: "/sign-in",
    signUp: "/sign-up",
  },
} as const;
