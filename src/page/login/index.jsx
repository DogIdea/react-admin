import React from 'react';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';
import './index.scss'

const _mm = new MUtil();
const _user = new User();
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:"",
            redirect: _mm.getUrlParam('redirect') || '/'
        }
    }
    componentWillMount() {
        document.title ='登陆 - React Admin';
    }
    onInputChange(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]: inputValue
        })
    }
    onInputKeyUp (e) {
        if(e.keyCode === 13) {
            this.onSubmit();
        }
    }
    onSubmit() {
      let loginInfo = {
        username: this.state.username,
        password: this.state.password
      },
      checkResult = _user.checkLoginInfo(loginInfo);
      if (checkResult) {
        _user.login(loginInfo).then((res) => {
            _mm.setStorage('userInfo',res);
            this.props.history.push(this.state.redirect);
        },(errMsg)=> {
            _mm.errorTips(errMsg);
        })
      }else{
        _mm.errorTips(checkResult.msg);
      }
      
    }
    render() {
      return (
        <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default login-panel"></div>
            <div className="panel-heading">欢迎登陆ReactAdmin管理系统</div>
            <div className="panel-body">
                <div>
                    <div className="form-group">
                        <input type="text" className="form-control" 
                        name="username"
                        placeholder="请输入用户名" 
                        onChange={(e) => this.onInputChange(e)}
                        onKeyUp={(e) => this.onInputKeyUp(e)}></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" 
                        placeholder="请输入密码"
                        name="password"
                        onChange={(e) => this.onInputChange(e)}
                        onKeyUp={(e) => this.onInputKeyUp(e)}
                        ></input>
                    </div>
                        <button
                        className="btn btn-lg btn-primary btn-block"
                        onClick={(e) => {this.onSubmit(e)}}>
                        登陆</button>
                </div>
            </div>
        </div>
      );
    }
}

export default Login;