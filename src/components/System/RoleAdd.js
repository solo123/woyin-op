/* eslint-disable react/destructuring-assignment */
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import React from 'react';
import { 
    Modal,
    Checkbox,
    Row,
    Col,
    Divider,
    Form,
    Input
  } from 'antd';

class RoleAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClose = () => {
    const { dispatch } = this.props;
      dispatch({
        type: 'ModalAction/Open',
         payload: {
          SystemRole: false
         },
    });
  }

  handleOk = e => {
    this.AddInfo.validateFields((err, values) => {
      console.log(values);
    });
  }

  render() {
    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
      }
    const rol = [
        {
            menu: '系统管理',
            child:[
                {
                 title: '帐户列表',
                 child:[{value: 1, label: '访问'}, {value: 2, label: '新增'}, {value: 3, label: '编辑'}, {value: 4, label: '删除'}, {value: 5, label: '保存'},
                ]
                },
                {
                 title: '角色列表',
                 child:[{value: 1, label: '访问'}, {value: 1, label: '新增'}, {value: 1, label: '编辑'}, {value: 1, label: '删除'}, {value: 1, label: '保存'},
                 ]
                },
                {
                 title: '菜单管理',
                 child:[{value: 1, label: '访问'}, {value: 1, label: '新增'}, {value: 1, label: '编辑'}, {value: 1, label: '删除'}, {value: 1, label: '保存'},
                 ]
                },
                {
                 title: '参数管理',
                 child:[{value: 1, label: '访问'}, {value: 1, label: '新增'}, {value: 1, label: '编辑'}, {value: 1, label: '删除'}, {value: 1, label: '保存'},
                 ]
                }
            ] 
        },
        {
            menu: '产品管理',
            child:[
                {
                 title: '产品列表',
                 child:[{value: 1, label: '访问'}, {value: 1, label: '新增'}, {value: 1, label: '编辑'}, {value: 1, label: '删除'}, {value: 1, label: '保存'},
                 ]
               }
            ] 
        },
        {
            menu: '客户管理',
            child:[
                {
                 title: '企业客户',
                 child:[{value: 1, label: '访问'}, {value: 1, label: '新增'}, {value: 1, label: '编辑'}, {value: 1, label: '删除'}, {value: 1, label: '保存'},
                 ]
                },
                {
                 title: 'APP客户',
                 child:[{value: 1, label: '访问'}, {value: 1, label: '新增'}, {value: 1, label: '编辑'}, {value: 1, label: '删除'}, {value: 1, label: '保存'},
                 ]
                },
            ] 
        },
        {
            menu: '运营管理',
            child:[
                {
                 title: '机构套餐管理',
                 child:[{value: 1, label: '访问'}, {value: 1, label: '新增'}, {value: 1, label: '编辑'}, {value: 1, label: '删除'}, {value: 1, label: '保存'},
                ]
               },
               {
                title: '设备套餐管理',
                child:[{value: 1, label: '访问'}, {value: 1, label: '新增'}, {value: 1, label: '编辑'}, {value: 1, label: '删除'}, {value: 1, label: '保存'},
               ]
              },
              {
                title: '视频通话套餐管理',
                child:[{value: 1, label: '访问'}, {value: 1, label: '新增'}, {value: 1, label: '编辑'}, {value: 1, label: '删除'}, {value: 1, label: '保存'},
               ]
              }
            ] 
        },
        {
            menu: '财务管理',
            child:[
                {
                 title: '订单列表',
                 child:[{value: 1, label: '访问'}, {value: 1, label: '新增'}, {value: 1, label: '编辑'}, {value: 1, label: '删除'}, {value: 1, label: '保存'},
                ]
             }
            ] 
        },
        {
            menu: '系统管理',
            child:[
                {
                 title: '收款帐户管理',
                 child:[{value: 1, label: '访问'}, {value: 1, label: '新增'}, {value: 1, label: '编辑'}, {value: 1, label: '删除'}, {value: 1, label: '保存'},
                ]
               }
            ] 
        }
    ]
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 3 },
        },
        wrapperCol: {
          xs: { span: 8 },
          sm: { span: 8 },
        },
      };
    return (
      <div>
        <Modal
          title={`${formatMessage({ id : 'system.role-add-role'})}`}
          transparent
          width={900}
          style={{ top: 20}}
          maskClosable={false}
          visible={this.props.ModalVisi.SystemRole}
          onCancel={this.onClose}
          onOk={this.handleOk}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item
              label="角色名："
            >
              {getFieldDecorator('email', {
                    rules: [{}, {
                      required: true, message: '请输入角色名',
                    }],
                    })(
                      <Input />
                )}
            </Form.Item>
            {rol.map(it => (
              <React.Fragment>
                <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                  <Divider orientation="left">{it.menu}</Divider>
                  {it.child.map((items)=>(
                    <Row>
                      <Col span={5}><h4>{items.title}:</h4></Col>
                      {items.child.map((item)=>(<Col span={3}><Checkbox value={item.value}>{item.label}</Checkbox></Col>))}
                    </Row>
                  ))}
                </Checkbox.Group>
              </React.Fragment>
              ))
            }
          </Form>
        </Modal>
      </div>
    );
  }
}

const RoleAdds = Form.create({ name: 'register' })(RoleAdd);

export default connect(({ModalAction})=>({
    ModalVisi: ModalAction.ModalVisi,
}))(RoleAdds);

