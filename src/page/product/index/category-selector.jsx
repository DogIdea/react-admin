import React from 'react';
import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';
import './category-selector.scss'

const _product = new Product();
const _mm = new MUtil();
class CategorySelector extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
          firstCategoryList: [],
          firstCategoryId: 0,
          secondCategoryList: [],
          secondCategoryId: 0
      }
  }
  componentDidMount() {
    this.loadFirstCategory();
  }
  loadFirstCategory() {
      _product.getCategoryList().then((res)=>{
          this.setState({
            firstCategoryList: res
          })
      },(errMsg) =>{
          _mm.errorTips(errMsg);
      });
  }
  onFirstCategoryChange(e) {
      let newValue = e.target.value || 0;
      this.setState({
          firstCategoryId: newValue,
          secondCategoryId: 0,
          secondCategoryList: []
      },()=>{
          this.loadSecondCategory();
          this.onPropsCategoryChange();
      });
  }
  onSecondCategoryChange(e){
    let newValue = e.target.value || 0;
      this.setState({
          secondCategoryId: newValue,
      },()=>{
          this.onPropsCategoryChange();
      });
  }
  onPropsCategoryChange() {
      let categoryChangeable = typeof this.props.onCategoryChange == 'function'
      if(this.state.secondCategoryId){
        categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId);
      }else{
        categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId,0)
      }
  }
  loadSecondCategory() {
    _product.getCategoryList(this.state.firstCategoryId).then((res)=>{
        this.setState({
          secondCategoryList: res
        })
    },(errMsg) =>{
        _mm.errorTips(errMsg);
    });
  }
  render() {
    return (
        <div className="col-md-10">
            <select className="from-control cate-select" onChange={(e)=>this.onFirstCategoryChange(e)}>
                <option value="">请选择一级分类</option>
                {
                    this.state.firstCategoryList.map(
                        (category,index)=><option key={index} value={category.id}>{category.name}</option>
                    )
                }
            </select>
            {
                this.state.secondCategoryList.length ? (<select className="from-control cate-select" onChange={(e)=>this.onSecondCategoryChange(e)}>
                <option value="">请选择二级分类</option>
                {
                    this.state.secondCategoryList.map(
                        (category,index)=><option key={index} value={category.id}>{category.name}</option>
                    )
                }
                </select>) : null
            }
            
            
        </div>
    );
  }
}
export default CategorySelector;