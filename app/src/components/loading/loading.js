import React from 'react';
import { ActivityIndicator, View } from 'react-native'
import styled from 'styled-components/native';
import Constants from '../../util/constants.util';

export default function Loading() {
  return (
    <LoadingBackground>
      <ActivityIndicator size={50} color={Constants.COLOR_2} />
    </LoadingBackground>
  )
}

const LoadingBackground = styled.View`
  position: absolute;
  flex: 1;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #00000061;
  width: 100%;
  height: 100%;
`;
