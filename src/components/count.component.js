import {useEffect, useState} from 'react';
import styled from 'styled-components';
import { COLORS } from '../styles/colors';

import {API} from '../services/api';

const CountWrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 20px;
  background: ${COLORS.secondary};
  color: ${COLORS.light0};
  padding: 16px;
  min-width: 100px;
  width: fit-content;
  max-width: 40%;
  border: 2px solid rgba(0,0,0,0.2);
  p{
    font-size: 12px;
  }
  b{
    font-size: 20px;
  }
`

const Count = () => {

  const [count, setCount] = useState(0);

  const handleGetCount = async () => {
    const response = await API.get('/count');
    setCount(response.data.count);
  }

  useEffect(() => {
    handleGetCount();
  }, [])

  return (
    <CountWrapper>
      <p>
        Nº de acessos: 
      </p>
      <p>
        <b>{count}</b>
      </p>
    </CountWrapper>
  )
};

export default Count;