/**

 * @author Kang Yang

 * @date 2019-09-28 14:08

 */
import React, {Component} from 'react';

//引入antd的登录框所需组件
import { Form, Icon, Input, Button } from 'antd';

import logo from './images/logo.png'
import './login.less'


class Login extends Component {

    handleSubmit = e => {
        //阻止事件的默认行为：阻止表单的提交
        e.preventDefault();

        //取出输入的相关数据
        const form = this.props.form;
        const values = form.getFieldsValue();
        const username = form.getFieldValue('username');
        const password = form.getFieldValue('password');
        console.log(values, username, password);
        alert('发送登录的ajax请求')
    };

    render() {

        const {getFieldDecorator} = this.props.form;

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
                            {
                                getFieldDecorator('username', { // 配置对象：属性名是一些特定名称
                                    rules: [ //声明式验证：使用插件已定好的规则进行验证
                                        /*用户名和密码的合法性要求
                                         * 1、必须输入
                                         * 2、必须大于等于4位
                                         * 3、必须小于等于12位
                                         * 4、必须是英文、数字或下划线组成*/
                                        { required: true, whitespace: true, message: '请输入用户名' },
                                        { min: 4, message: '用户名不能小于4位' },
                                        { max: 12, message: '用户名不能大于12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: []
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
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

/*利用Form.create()包装Form组件生成一个新的组件
Form组件：包含<Form>的组件
新组件会向Form组件传递一个属性：属性名:form, 属性值对象

高阶函数：
    定义：接收的参数是函数，或者返回值是函数
    常见：数组遍历相关的方法、定时器、Promise、高阶组件
    作用：实现一个更强大、动态的功能

高阶组件：
    本质是一个函数
    函数接收一个组件，返回一个新组件
    Form.create()返回的就是一个高阶组件
*/
const WrapperForm = Form.create()(Login);

export default WrapperForm;
