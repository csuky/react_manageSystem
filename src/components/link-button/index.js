/**

 * 自定义的看似连接实则是button的组件
 * 1、{...props}：将接收所有属性传递给子标签
 * 2、children标签属性：
 *  字符串：<LinkButton>xxx</LinkButton>
 *  标签对象或标签对象数组：<LinkButton><span></span></LinkButton>
 */
import React from 'react'

import './index.less'

function LinkButton (props) {
    return (
        <button className="link-button" {...props}/>
    );
}

export default LinkButton;
