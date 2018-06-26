import React from 'react';

class ListSearch extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            searchType : '',
            searchKeyword : ''
        }
    }
    onValueChange(e) {
        let name =e.target.name,
        value = e.target.value.trim();
        this.setState({
            [name]:value
        });
    }
    onSearch() {
        this.props.onSearch(this.state.searchType,this.state.searchKeyword)
    }
    render() {
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                <div className="form-inline">
                    <div className="form-group">
                        <select name="searchType" className="form-control" onChange={(e) => this.onValueChange(e)}>
                            <option value="productId">按商品ID查询</option>
                            <option value="productName">按商品名称查询</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input name="searchKeyword" type="text" className="form-control" id="exampleInputPassword3" placeholder="关键词" onChange={(e) => this.onValueChange(e)}></input>
                    </div>
                    <button className="btn btn-primary" onClick={(e) => this.onSearch()}>搜索</button>
                  </div>
                </div>
            </div>
        )
    }
}

export default ListSearch;