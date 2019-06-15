import styled from 'styled-components/native';
import Constants from '../../util/constants.util';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10%;
  width: 100%;
  margin: auto;
`;

export const HeaderView = styled.View`
  margin-bottom: 30px;
`;

export const HeaderTitle = styled.Text`
  color: ${Constants.COLOR_2};
  font-size: 20px;
  text-align: center;
  margin: 10px;
`;

export const LogoStyle = styled.View`
  border-radius: 100;
  width: 100px;
  height: 100px;
  border: 10px solid ${Constants.COLOR_3};
  background: ${Constants.COLOR_2};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoText = styled.Text`
  color: ${Constants.COLOR_3};
  font-size: 70px;
  font-family: sans-serif;
`;