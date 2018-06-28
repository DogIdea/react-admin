import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import CategorySelector from './category-selector.jsx';
import FileUploader from 'util/file-uploader/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';
import './save.scss';

const _mm = new MUtil();
const _product = new Product();
class Productsave extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        name: '',
        subtitle: '',
        categoryId: 0,
        parentCategoryId: 0,
        subImages: [],
        price: '',
        stock: '',
        detail: '',
        status: 1
      }
  }
  onValueChange(e) {
    let name =e.target.name,
        value=e.target.value.trim();
        this.setState({
            [name]: value
    })
  }
  onCategoryChange(categoryId,parentCategoryId) {
    this.setState({
        categoryId: categoryId,
        parentCategoryId: parentCategoryId
    })
  }
  onUploadSuccess(res) {
    let subImages =this.state.subImages;
    subImages.push(res);
    this.setState({
        subImages :subImages
    });
    console.log(subImages);
  }
  onUploadError(errMsg) {
    _mm.errorTips(errMsg);
  }
  onImageDelete(e) {
      let index = parseInt(e.target.getAttribute('index')),
      subImages = this.state.subImages;
      subImages.splice(index,1);
      this.setState({
          subImages:subImages
      })
  }
  onDetailValueChange(value) {
      this.setState({
          detail:value
      })
      console.log(value);
  }
  getSubImagesString() {
      return this.state.subImages.map((image)=>image.uri).join(',');
  }
  onSubmit(){
      let product = {
          name: this.state.name,
          subtitle: this.state.subtitle,
          categoryId: parseInt(this.state.categoryId),
          subImages: this.getSubImagesString(),
          detail: this.state.detail,
          price: parseFloat(this.state.price),
          stock: parseInt(this.state.stock),
          status: this.state.status
      },
      productcheckResult = _product.checkProduct(product);
      if(productcheckResult.status){
          _product.saveProduct(product).then((res)=>{
            _mm.successTips(res);
            this.props.history.push('/product/index');
          },(errMsg)=>{
            _mm.errorTips(errMsg);
          });
      }else {
        _mm.errorTips(productcheckResult.msg);
      }
      console.log(product);
  }
  render() {
    return (
        <div id="page-wrapper">
            <PageTitle title="添加商品"/>
            <div className="form-horizontal">
                <div className="form-group">
                    <label className="col-md-2 control-label">商品名称</label>
                    <div className="col-md-5">
                        <input type="text" className="form-control" placeholder="请输入商品名称" name="name" onChange={(e)=>this.onValueChange(e)}></input>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">商品描述</label>
                    <div className="col-md-5">
                        <input type="text" className="form-control" placeholder="请输入商品描述" name="subtitle" onChange={(e)=>this.onValueChange(e)}></input>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">所属分类</label>
                    <CategorySelector onCategoryChange={(categoryId,parentCategoryId) => this.onCategoryChange(categoryId,parentCategoryId)}/>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">商品价格</label>
                    <div className="col-md-3">
                        <div className="input-group">
                            <input type="number" className="form-control" placeholder="价格" name="price" onChange={(e)=>this.onValueChange(e)}></input>
                            <span className="input-group-addon">元</span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">商品库存</label>
                    <div className="col-md-3">
                        <div className="input-group">
                            <input type="number" className="form-control" placeholder="库存" name="stock" onChange={(e)=>this.onValueChange(e)}></input>
                            <span className="input-group-addon" >件</span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">商品图片</label>
                    <div className="col-md-10">
                        {
                            this.state.subImages.length ? this.state.subImages.map((image,index)=>(<div  key={index} className="img-con">
                                <img src={image.url}/>
                                <i className="fa fa-close" index={index} onClick={(e)=>this.onImageDelete(e)}></i>
                            </div>)) : (<div>请上传图片</div>)
                        }
                    </div>
                    <div className="col-md-offset-2 col-md-10 file-upload-con">
                        <FileUploader onSuccess={(res)=>this.onUploadSuccess(res)} onError={(errMsg)=>this.onUploadError(errMsg)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">商品详情</label>
                    <div className="col-md-10">
                        <RichEditor onValueChange={(value) => this.onDetailValueChange(value)}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-offset-2 col-md-10 ">
                        <button type="submit" className="btn btn-primary" onClick={(e)=>this.onSubmit(e)}>提交</button>
                    </div>
                </div>  
            </div>
        </div>
    );
  }
}
export default Productsave;