import {
  Space,
  Table,
  Button,
  Modal,
  Form,
  Input,
  //  DatePicker
} from "antd";
import React from "react";
import { TeacherList } from "../../api";
// import moment from "moment";
export default function Teachers() {
  const { Column } = Table;
  // 拿编辑页数据
  // const Ref = React.useRef();
  const [form] = Form.useForm();
  // 添加和编辑的确定
  const [add, setAdd] = React.useState("");
  // 接口数据
  const [rows, setRows] = React.useState([]);
  // 日期
  // const dateFormat = "YYYY/MM/DD";
  // 弹框内容
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const List = async function () {
    let result = await TeacherList();
    setRows(result.data.data.rows);
    // console.log(result.data.data.rows);
  };
  React.useEffect(() => {
    List();
  }, []);
  // 编辑
  const compile = (record) => {
    return () => {
      //  渲染
      setIsModalVisible(true);

      form.setFieldsValue(record);
    };
  };
  // 编辑确定
  const handleOk = () => {
    // 获取input信息
    // console.log(form.getFieldsValue());
    // format 代码格式化
    // const values = {
    //   ...fieldsValue,
    //   entrydate: fieldsValue["entrydate"].format("YYYY-MM-DD"),
    // };
    // 只针对日期
    // console.log(values);
    console.log(form.getFieldsValue());
    setIsModalVisible(false);
    // 删除input内容
    form.resetFields();
    if (add === "add") {
      // 添加接口
      console.log("add");
    } else if (add === "find") {
      //  查询
      console.log("find");
    } else {
      // 编辑接口
      console.log("change");
    }
    setAdd(false);
  };
  // 退出编辑
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addPerson = () => {
    setIsModalVisible(true);
    setAdd("add");
  };
  const delet = (record) => {
    return () => {
      // console.log(record._id);
    };
  };
  const FindPerson = () => {
    setIsModalVisible(true);
    setAdd("find");
  };

  return (
    <div>
      <Button type="primary" size="large" onClick={addPerson}>
        新增
      </Button>
      , &nbsp;&nbsp;&nbsp;&nbsp;
      <Button type="primary" size="large" onClick={FindPerson}>
        查询
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
                <Button type="primary" danger onClick={delet(record)}>
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
        footer={[
          <Button type="primary" htmlType="submit" onClick={handleOk}>
            保存
          </Button>,

          <Button key="back" onClick={handleCancel}>
            退出
          </Button>,
        ]}
      >
        <Form
          name="time_related_controls"
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
          {/* <Form.Item label="时间" name="entrydate">
            <DatePicker
              defaultValue={moment("", dateFormat)}
              format={dateFormat}
            />
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
        </Form>
      </Modal>
    </div>
  );
}
