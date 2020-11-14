import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const SpinCentered = () => {
  return (
    <Container>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 44, color: 'var(--white)' }} />} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;  
`;

export default SpinCentered;
