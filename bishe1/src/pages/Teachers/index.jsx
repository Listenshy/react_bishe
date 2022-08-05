import { Space, Table, Button, Modal, Form, Input, DatePicker } from "antd";
import React from "react";
import { TeacherList } from "../../api";

export default function Teachers() {
  const { Column } = Table;
  // 拿编辑页数据
  // const Ref = React.useRef();
  const [form] = Form.useForm();

  // 弹框内容
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  // 接口数据
  const [rows, setRows] = React.useState([]);

  const List = async function () {
    let result = await TeacherList();
    setRows(result.data.data.rows);
  };
  React.useEffect(() => {
    List();
  }, []);
  // 编辑
  const compile = (record) => {
    return () => {
      // console.log(record);
      setIsModalVisible(true);
    };
  };
  // 编辑确定
  const handleOk = (e) => {
    // 获取input信息
    // console.log(form.getFieldsValue());
    console.log(e);
    setIsModalVisible(false);
    // 删除input内容
    form.resetFields();
  };
  // 退出编辑
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addPerson = () => {
    setIsModalVisible(true);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
    return dateString;
  };

  return (
    <div>
      <Button type="primary" size="large" onClick={addPerson}>
        新增
      </Button>
      <Table dataSource={rows}>
        <Column title="时间" dataIndex="entrydate" key="entrydate"></Column>
        <Column title="职务" dataIndex="jobnumber" key="jobnumber" />
        <Column title="姓名" dataIndex="name" key="name" />
        <Column title="电话" dataIndex="phone" key="phone" />
        <Column title="角色" dataIndex="role" key="role" />
        <Column
          title="角色"
          dataIndex="role"
          render={(text, record, index) => {
            // console.log(text, record, index);
            return (
              <Space>
                <Button type="primary" onClick={compile(record)}>
                  编辑
                </Button>
                <Button type="primary" danger>
                  删除
                </Button>
              </Space>
            );
          }}
        />
      </Table>
      <Modal
        title="教师编辑界面"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer
      >
        <Form
          name="basic"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={handleOk}
          form={form}
        >
          <Form.Item label="时间" name="entrydate">
            <DatePicker />
          </Form.Item>
          {/* <Form.Item name="date-picker" label="DatePicker">
            <DatePicker />
          </Form.Item> */}
          <Form.Item label="职务" name="jobnumber">
            <Input />
          </Form.Item>
          <Form.Item label="姓名" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="电话" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="角色" name="role">
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button key="back" onClick={handleCancel}>
              退出
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
