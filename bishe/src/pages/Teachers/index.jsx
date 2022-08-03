import { Space, Table, Tag } from "antd";
import React from "react";
import { TeacherList } from "../../api";

export default function Teachers() {
  const data = [
    // {
    //   key: "1",
    //   lastName: "Brown",
    //   age: 32,
    //   address: "New York No. 1 Lake Park",
    //   tags: ["nice", "developer"],
    // },
    // {
    //   key: "2",
    //   lastName: "Green",
    //   age: 42,
    //   address: "London No. 1 Lake Park",
    //   tags: ["loser"],
    // },
    // {
    //   key: "3",
    //   lastName: "Black",
    //   age: 32,
    //   address: "Sidney No. 1 Lake Park",
    //   tags: ["cool", "teacher"],
    // },
  ];
  const { Column } = Table;
  const [rows, setRows] = React.useState([]);
  const List = function () {
    TeacherList().then((res) => {
      console.log(res.data.data.rows);
      setRows(res.data.data.rows);
    });
  };
  React.useEffect(() => {
    List();
  }, []);

  return (
    <div>
      <Table dataSource={rows}>
        {/* <Column title="Age" dataIndex="age" key="id" /> */}
        <Column title="Address" dataIndex="entrydate" key="entrydate" />
        {/* <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags) => (
            <>
              {tags.map((tag) => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              Invite {record.lastName}
              Delete
            </Space>
          )}
        /> */}
      </Table>
    </div>
  );
}
