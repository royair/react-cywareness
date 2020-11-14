import React, {useEffect} from 'react';
import styled from 'styled-components';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

import {useStores} from "../../hooks/useStores";
import {observer} from "mobx-react";

const HomePage = observer(() => {
  const {phishingStore} = useStores()
  useEffect(() => {
    if (!phishingStore.isReady) phishingStore.get()
  }, [phishingStore, phishingStore.isReady])

  return (
      <Container>
        <h1>Phishing Graph</h1>

        <LineChart width={600} height={300} data={phishingStore.phishings}>
          <Line type="monotone" dataKey="data" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>

      </Container>
  );
});

const Container = styled.div`
  text-align: center;

  .recharts-wrapper {
    display: inline-block;
    margin-top: 50px;
  }
`;

export default HomePage;
