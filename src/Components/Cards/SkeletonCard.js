import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Skeleton } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import React from "react";

export default function SkeletonCard() {
  return (
    <div>
      <Card style={{ width: "100%" }}>
        <Skeleton loading={true} avatar active>
          <Meta avatar={<Avatar />} title="James Borris" />
          <div style={{ marginTop: "10px" }}>
            <h4>Who is the best footballer in the past two decades?</h4>
            <p>Posted 6min ago</p>
          </div>
          <Button
            type="ghost"
            icon={<EditOutlined />}
            style={{ float: "right" }}
          >
            Answer
          </Button>
        </Skeleton>
      </Card>
      <Card style={{ width: "100%" }}>
        <Skeleton loading={true} avatar active>
          <Meta avatar={<Avatar />} title="James Borris" />
          <div style={{ marginTop: "10px" }}>
            <h4>
              Which is the best Career Path when it comes to coding? software
              engineer, Backend Programmer or game developer?
            </h4>
            <p>Posted 10min ago</p>
          </div>
          <Button
            type="ghost"
            icon={<EditOutlined />}
            style={{ float: "right" }}
          >
            Answer
          </Button>
        </Skeleton>
      </Card>
      <Card style={{ width: "100%" }}>
        <Skeleton loading={true} avatar active>
          <Meta avatar={<Avatar />} title="James Borris" />
          <div style={{ marginTop: "10px" }}>
            <h4>Which Country as the smallest population in 2020</h4>
            <p>Posted 13min ago</p>
          </div>
          <Button
            type="ghost"
            icon={<EditOutlined />}
            style={{ float: "right" }}
          >
            Answer
          </Button>
        </Skeleton>
      </Card>
      <Card style={{ width: "100%" }}>
        <Skeleton loading={true} avatar active>
          <Meta avatar={<Avatar />} title="James Borris" />
          <div style={{ marginTop: "10px" }}>
            <h4>
              Who is the best President Nigeria ever had, if it ever had one lol
            </h4>
            <p>Posted 23min ago</p>
          </div>
          <Button
            type="ghost"
            icon={<EditOutlined />}
            style={{ float: "right" }}
          >
            Answer
          </Button>
        </Skeleton>
      </Card>
    </div>
  );
}
