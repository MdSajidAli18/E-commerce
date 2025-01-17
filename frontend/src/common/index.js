const backendDomain = "http://localhost:8080";

const SummaryApi = {

    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },
    allUser: {
        url: `${backendDomain}/api/all-users`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: "get"
    },
    categoryWiseProduct: {
        url: `${backendDomain}/api/category-product`,
        method: "post"
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: "post"
    },
    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: "post"
    },
    cartProductCount: {
        url: `${backendDomain}/api/countCartProduct`,
        method: "get"
    },
    cartProductView: {
        url: `${backendDomain}/api/view-cart-product`,
        method: "get"
    },
    updateCartProductt: {
        url: `${backendDomain}/api/update-cart-product`,
        method: "post"
    },
    deleteCartProductt: {
        url: `${backendDomain}/api/delete-cart-product`,
        method: "post"
    },
    searchProductt: {
        url: `${backendDomain}/api/search`,
        method: "get"
    },
    filterProductt: {
        url: `${backendDomain}/api/filter-product`,
        method: "post"
    },
    userAddresss: {
        url: `${backendDomain}/api/address`,
        method: "post"
    }
    // paymentt: {
    //     url: `${backendDomain}/api/checkout`,
    //     method: "post"
    // }


};


export default SummaryApi