import React, { useState, useEffect } from "react";
import { fetchAlbums, fetchUsers } from "../API/data";
import { Card, Layout, Space, Spin, Table, Typography } from "antd";
import { useParams } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

function User() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch user from API
  useEffect(() => {
    fetchUsers().then((users) => {
      const user = users.find((user) => user.id === parseInt(id));
      setUser(user);
      console.log(user);
      setLoading(false);
    });
  }, [id]);

  // fetch user's albums from API
  useEffect(() => {
    fetchAlbums().then((albums) => {
      const userAlbums = albums.filter(
        (album) => album.userId === parseInt(id)
      );
      setAlbums(userAlbums);
      setLoading(false);
    });
  }, [id]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      width: "auto",
      render: () => <a>View Album</a>,
    },
  ];

  return (
    <Layout className="user-layout">
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        User Details
      </Typography.Title>
      <Content className="user-content">
        <Space direction="vertical">
          <Card
            title={user.name || "Loading..."}
            loading={loading}
            className="card"
          >
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
          </Card>
          <Card title="Albums" loading={loading} className="card">
            {loading ? (
              <Spin />
            ) : (
              // render a list of albums not in a table
              <Table
                tableLayout="auto"
                dataSource={albums}
                columns={columns}
                rowKey="id"
                sticky
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      window.location.href = `/albums/${record.id}`;
                      //   pass the album id to the album page
                    },
                  };
                }}
              />
            )}
          </Card>
        </Space>
      </Content>
    </Layout>
  );
}

export default User;
