/**
应用根组件
 * @author Kang Yang

 * @date 2019-09-24 22:42

 */
import React, {Component} from 'react';
//HashRouter浏览器url里有#，BrowserRouter则没有
import {BrowserRouter, Switch, Route} from "react-router-dom";

//引入路由：登录页面路由和主页面路由
import Login from './pages/login/login';
import Admin from './pages/admin/admin';

//应用根组件
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    {/*Admin的路由匹配不能放在前面，因为采用的模糊匹配规则，放在前面则/login永远无法匹配到*/}
                    <Route path="/" component={Admin} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;