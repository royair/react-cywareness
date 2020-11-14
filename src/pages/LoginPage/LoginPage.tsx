import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Form, Input, Button} from 'antd';
import {useHistory, useLocation} from 'react-router-dom';

import {useStores} from "../../hooks/useStores";
import {observer} from "mobx-react";

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};

const LoginPage = observer(() => {
  const {userStore} = useStores();
  const history = useHistory();
  const location: any = useLocation();
  let {from} = location.state || {from: {pathname: '/'}};
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (userStore.isAuthenticated) history.replace(from);
  }, [userStore.isAuthenticated, from, history]);


  const onFinish = async (values: { username: string, password: string }) => {
    try {
      setSubmitting(true)
      await userStore.login(values)
    } finally {
      setSubmitting(false)
    }
  };

  const onFinishFailed = (errorInfo: object) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <Container>
        <Form
            {...layout}
            name="basic"
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
          <Form.Item
              label="Username"
              name="username"
              rules={[{required: true, message: 'Please input your username!'}]}
          >
            <Input disabled={submitting} />
          </Form.Item>

          <Form.Item
              label="Password"
              name="password"
              rules={[{required: true, message: 'Please input your password!'}]}
          >
            <Input.Password disabled={submitting} />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Container>
  );
});

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  
  .ant-form {
    padding: 30px;
    border: 1px solid var(--black-10);
    border-radius: 5px;
  }
`;

export default LoginPage;
