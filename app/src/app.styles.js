import styled from 'styled-components/native';
import Constants from './util/constants.util';

export const Input = styled.TextInput`
  width: 100%;
  margin: 16px;
  border: 1px solid black;
  padding: 10px;
  position: relative;
`;

export const DefaultButton = styled.TouchableHighlight`
  width: 100%;
  padding: 16px;
  margin: 16px;
  background: ${Constants.COLOR_2};
`;

export const DefaultButtonText = styled.Text`
  color: white;
  margin: auto;
  font-size: 16px;
`;

export const OutlineButton = styled.TouchableHighlight`
  width: 100%;
  padding: 16px;
  margin: 16px;
  background: transparent;
  border: 1px solid ${Constants.COLOR_2};
`;

export const OutlineButtonText = styled.Text`
  color: ${Constants.COLOR_2}
  margin: auto;
  font-size: 16px;
`;