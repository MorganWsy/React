import React, { Component } from 'react';
import {nanoid} from 'nanoid';
import {connect} from 'react-redux';
import {Input, Button, Table} from 'antd';
import {UserOutlined, SmileOutlined} from '@ant-design/icons';
import {createAddPersonAction} from '../../redux/actions/person';

class Person extends Component {
  state = {
    pagination: {
      current: 1,
      pageSize: 2
    }
  }
  columns = [
    {title: 'id',dataIndex: 'id',width: '40%'},
    {title: 'name', dataIndex: 'name'},
    {title: 'age', dataIndex: 'age'}
  ]
  addUserHandler = () => {
    const username = this.usernameDom.state.value;
    const age = this.ageDom.state.value - 0;
    const perObj = {id: nanoid(),name: username,age};
    this.props.addPerson(perObj);

    // 添加成功后，清空input框
    this.usernameDom.state.value = '';
    this.ageDom.state.value = '';
  }
  // 选择不同页码，渲染不同的数据
  handleTableChange = (pagination) => {
    this.setState({pagination: pagination});
  }
  render() {
    const {persons} = this.props;
    return (
      <div>
        <h1>这是Person组件，Count组件的和为：{this.props.count}</h1>
        <Input placeholder='请输入用户名' prefix={<UserOutlined/>} className='usernameInput' ref={dom=>this.usernameDom = dom}/><br />
        <Input placeholder='请输入年龄' prefix={<SmileOutlined />} className='ageInput' ref={dom=>this.ageDom = dom}/>
        <Button type='primary' onClick={this.addUserHandler} className='userBtn'>添加</Button>
        <Table columns={this.columns} dataSource={persons} pagination={this.state.pagination} onChange={this.handleTableChange} rowKey={record => record.id}/>
        {/* 使用原生HTML */}
        {/* <ul className='user-list'>
          {
            persons.map((perObj) => {
              return (
                <li key={perObj.id}>{perObj.name}————{perObj.age}</li>
              )
            })
          }  
        </ul> */}
      </div>
    )
  }
}

// 映射状态（此时的state包含Count组件和Person组件的状态）
const mapStateToProps = (state) => ({persons: state.persons,count: state.count});
// 映射操作状态的方法
const mapDispatchToProps = (dispatch) => {
  return {
    addPerson: (perObj) => {dispatch(createAddPersonAction(perObj))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Person);
