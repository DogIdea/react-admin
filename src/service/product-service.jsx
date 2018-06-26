import MUtil from 'util/mm.jsx'

const _mm = new MUtil();
class Product{
    getProductList(pageNum){
        return _mm.request({
            type: 'post',
            url: '/manage/product/list.do',
            data: {
                pageNum: pageNum
            }
        })        
    }
    setProductStatus(productInfo) {
        return _mm.request({
            type: 'post',
            url: '/manage/product/set_sale_status.do',
            data: productInfo
        }) 
    }
}
export default Product;