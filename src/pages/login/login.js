/**

 * @author Kang Yang

 * @date 2019-09-28 14:08

 */
import React, {Component} from 'react';

//引入antd的登录框所需组件
import { Form, Icon, Input, Button } from 'antd';

import logo from './images/logo.png'
import './login.less'

const Item = Form.Item

class Login extends Component {

    handleSubmit = e => {
        //阻止事件的默认行为：阻止表单的提交
        e.preventDefault();
        alert('发送登录的ajax请求')
    };

    render() {
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt=""/>
                    <h1>后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h1>用户登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;
