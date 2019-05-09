/* eslint-disable prefer-destructuring */
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
import {RoleResources, AddRoles} from '@/services/api';

let checkedValues = {};
const rol = [
  {
    menu: '权限列表',
    child: [
      // {
      //   title: '帐户列表',
      //   child: [{ value: 1, label: '访问' }, { value: 2, label: '新增' }, { value: 3, label: '编辑' }, { value: 4, label: '删除' }, { value: 5, label: '保存' },
      //   ]
      // },
      // {
      //   title: '角色列表',
      //   child: [{ value: 1, label: '访问' }, { value: 1, label: '新增' }, { value: 1, label: '编辑' }, { value: 1, label: '删除' }, { value: 1, label: '保存' },
      //   ]
      // },
      // {
      //   title: '菜单管理',
      //   child: [{ value: 1, label: '访问' }, { value: 1, label: '新增' }, { value: 1, label: '编辑' }, { value: 1, label: '删除' }, { value: 1, label: '保存' },
      //   ]
      // },
      // {
      //   title: '参数管理',
      //   child: [{ value: 1, label: '访问' }, { value: 1, label: '新增' }, { value: 1, label: '编辑' }, { value: 1, label: '删除' }, { value: 1, label: '保存' },
      //   ]
      // }
    ]
  },
  // {
  //   menu: '产品管理',
  //   child: [
  //     {
  //       title: '产品列表',
  //       child: [{ value: 1, label: '访问' }, { value: 1, label: '新增' }, { value: 1, label: '编辑' }, { value: 1, label: '删除' }, { value: 1, label: '保存' },
  //       ]
  //     }
  //   ]
  // },
  // {
  //   menu: '客户管理',
  //   child: [
  //     {
  //       title: '企业客户',
  //       child: [{ value: 1, label: '访问' }, { value: 1, label: '新增' }, { value: 1, label: '编辑' }, { value: 1, label: '删除' }, { value: 1, label: '保存' },
  //       ]
  //     },
  //     {
  //       title: 'APP客户',
  //       child: [{ value: 1, label: '访问' }, { value: 1, label: '新增' }, { value: 1, label: '编辑' }, { value: 1, label: '删除' }, { value: 1, label: '保存' },
  //       ]
  //     },
  //   ]
  // },
  // {
  //   menu: '运营管理',
  //   child: [
  //     {
  //       title: '机构套餐管理',
  //       child: [{ value: 1, label: '访问' }, { value: 1, label: '新增' }, { value: 1, label: '编辑' }, { value: 1, label: '删除' }, { value: 1, label: '保存' },
  //       ]
  //     },
  //     {
  //       title: '设备套餐管理',
  //       child: [{ value: 1, label: '访问' }, { value: 1, label: '新增' }, { value: 1, label: '编辑' }, { value: 1, label: '删除' }, { value: 1, label: '保存' },
  //       ]
  //     },
  //     {
  //       title: '视频通话套餐管理',
  //       child: [{ value: 1, label: '访问' }, { value: 1, label: '新增' }, { value: 1, label: '编辑' }, { value: 1, label: '删除' }, { value: 1, label: '保存' },
  //       ]
  //     }
  //   ]
  // },
  // {
  //   menu: '财务管理',
  //   child: [
  //     {
  //       title: '订单列表',
  //       child: [{ value: 1, label: '访问' }, { value: 1, label: '新增' }, { value: 1, label: '编辑' }, { value: 1, label: '删除' }, { value: 1, label: '保存' },
  //       ]
  //     }
  //   ]
  // },
  // {
  //   menu: '系统管理',
  //   child: [
  //     {
  //       title: '收款帐户管理',
  //       child: [{ value: 1, label: '访问' }, { value: 1, label: '新增' }, { value: 1, label: '编辑' }, { value: 1, label: '删除' }, { value: 1, label: '保存' },
  //       ]
  //     }
  //   ]
  // }
]
class RoleAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rolList : rol
    };
    
  }

  componentWillMount (){
    
  }

  getData = () => {
    const {rolList} = this.state;
    
    const key = {};
    const k = [];
    RoleResources().then(res => {
      
      res.data.forEach(element => {
        const temp = element.ResourceName.split("_"); // 中文名
        const temp2 = element.ResourceId.split("_"); // 英文名
        if( temp[0]!=='资源名称'){
          if(typeof key[temp2[0]] === 'undefined'){
            k.push(temp2[0]);
            key[temp2[0]] = {
              title: temp[0],
              child: [
                { value:  element.ResourceName, label: temp[1] }
              ]
            }
          }else{
            const child = {value: element.ResourceName, label: temp[1]}
            key[temp2[0]].child.push(child);
          }
        }
     
      });
      rol[0].child = [];
      k.forEach(ele => {
        rol[0].child.push(key[ele]);
      })
    })
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
    this.props.form.validateFields((err, values) => {
      if(!err){
        const formData = new FormData();
        formData.append("role", values.rol);
        for(let i = 0; i < checkedValues.length; i+=1){
          formData.append("resources", checkedValues[i])
        }
        AddRoles(formData).then(res => {
          console.log(res);
        })
        this.onClose();
      }
    });

   
  }

  handChange = (checkedValue) => {
    checkedValues = checkedValue;
    console.log('checked = ', checkedValues);
  }

  render() {
    this.getData();

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
    const {rolList} = this.state;
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
              {getFieldDecorator('role', {
                    rules: [{}, {
                      required: true, message: '请输入角色名',
                    }],
                    })(
                      <Input />
                )}
            </Form.Item>
            {rol.map(it => (
              <React.Fragment>
                <Checkbox.Group style={{ width: '100%' }} onChange={this.handChange}>
                  <Divider orientation="left">{it.menu}</Divider>
                  {it.child.map((items)=>(
                    <Row key={items.title}>
                      <Col span={5}><h4>{items.title}:</h4></Col>
                      {items.child.map((item)=>(<Col span={3} ><Checkbox value={item.value}>{item.label}</Checkbox></Col>))}
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

