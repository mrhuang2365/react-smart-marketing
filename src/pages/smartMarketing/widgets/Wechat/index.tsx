import React, { useState } from 'react';
import { WechatOutlined } from '@ant-design/icons'
import { Input, Button, Checkbox, Form  } from 'antd';
import { INode } from 'src/types/task';
import './index.scss'
const CheckboxGroup = Checkbox.Group;

export const options = {
  id: 'wechat',
  name: '微信',
  icon: <WechatOutlined className="icon"/>,
  defaultParams:{
    values: [ '小程序' ],   
  }
}

interface IProps {
  node: INode,
  onCancel: () => void;
  onOk: () => void;
}

const plainOptions = ['小程序', '公众号', 'H5'];

const WechatCmpt = (props: IProps) => {
  const [name, setName] = useState<string>(props.node.name);
  const [params, setParams] = useState<any>(props.node.params);
  
  const onChange = (e: any) => {
    setName (e.target.value);
  }
  const onOk = () => {
    props.node.setName(name);
    props.node.setParams(params)
    props.onOk();
  }
  const onSelectChange = (checkedValue: any) => {
    setParams({
      ...params,
      values: checkedValue
    })
  }
  return (
    <div>
      <Form>
        <Form.Item label="节点名称" required tooltip="请输入节点名称">
          <Input placeholder="请输入节点名称" defaultValue={name} onChange={onChange}></Input>
        </Form.Item>
        <Form.Item  label="类型选择">
          <CheckboxGroup
            options={plainOptions}
            value={params.values}
            onChange={onSelectChange} />
        </Form.Item>
      </Form>
    
      <div className="footer-buttons">
          <Button type="dashed" className="footer-btn" onClick={props.onCancel}>取消</Button>
          <Button type="primary" className="footer-btn" onClick={onOk}>确认</Button>
      </div>
    </div>
  )
}
export default WechatCmpt;
