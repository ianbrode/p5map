import React, {useState} from "react";
import {
  Layout,
  Row,
  Col,
  Button,
  Tooltip,
  Collapse,
  InputNumber,
  Typography
} from "antd";
import P5Wrapper from 'react-p5-wrapper';

import {
  CloudDownloadOutlined,
  CloudUploadOutlined,
  PlusOutlined
} from "@ant-design/icons";

import "antd/dist/antd.css";
import "./App.css";

import sketch from './sketch/sketch';

const { Header, Footer, Sider, Content } = Layout;
const { Panel } = Collapse;
const { Title } = Typography;

function App() {
  const [offset, setOffset] = useState([0,0])

  return (
    <Layout className="layout">
      <Content>
        <Row>
          <Col span={6}>
            <div>
              <Title level={3} mark>
                Fog
              </Title>
            </div>
            <div>
              <Tooltip title="Add fog">
                <Button
                  size="large"
                  shape="circle"
                  icon={<CloudDownloadOutlined />}
                />
              </Tooltip>
              <Tooltip title="Remove fog">
                <Button
                  type="primary"
                  danger
                  size="large"
                  shape="circle"
                  icon={<CloudUploadOutlined />}
                />
              </Tooltip>
            </div>

            <div>
              <Title level={3} mark>
                Offset
              </Title>
            </div>
            <div>
              <InputNumber value={offset[0]} onChange={(v) => {setOffset([v, offset[1]])}} />
              <InputNumber value={offset[1]} onChange={(v) => {setOffset([offset[0], v])}} />
            </div>

            <div>
              <Title level={3} mark>
                Chars
              </Title>
              <Tooltip title="Add fog">
                <Button shape="circle" icon={<PlusOutlined />} />
              </Tooltip>
            </div>
            <Row>
              <Col span={12}>
                <Collapse accordion>
                  <Panel header="This is panel 1" key="1">
                    <p>{"123"}</p>
                  </Panel>
                </Collapse>
              </Col>
            </Row>

            <div>
              <Title level={3} mark>
                Enemies
              </Title>
              <Tooltip title="Add fog">
                <Button shape="circle" icon={<PlusOutlined />} />
              </Tooltip>
            </div>
            <Row>
              <Col span={12}>
                <Collapse accordion>
                  <Panel header="This is panel 1" key="1">
                    <p>{"123"}</p>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          </Col>
          <Col span={18}>
            <P5Wrapper sketch={sketch} offset={offset} />
          </Col>
        </Row>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
