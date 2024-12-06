export const apiEndPoint = {
    getProductList : `${process.env.REACT_APP_BASE_URL}/api/products?populate=*`,
    addNewProduct : `${process.env.REACT_APP_BASE_URL}/api/products/?populate=*`,
    deleteProductList:(product_id)=> `${process.env.REACT_APP_BASE_URL}/api/products/${product_id}`,
    productDetail: (product_id)=>`${process.env.REACT_APP_BASE_URL}/api/products/${product_id}/?populate=*`,
    editProductDetail: (product_id)=>`${process.env.REACT_APP_BASE_URL}/api/products/${product_id}/?populate=*`,
    uploadedImage:`${process.env.REACT_APP_BASE_URL}/api/upload`
}