export const paths = {
  user: {
    home: '/',
    product: '/products/:id',
    products: '/products',
    cart: '/cart',
    about: '/about',
    signIn: '/sign-in',
    signUp: '/sign-up',
  },
  admin: {
    home: '/admin',
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    products: '/admin/products',
    createProduct: '/admin/create-product',
    editProduct: '/admin/edit-product/:productId',
    categories: '/admin/categories',
  },
} as const;
