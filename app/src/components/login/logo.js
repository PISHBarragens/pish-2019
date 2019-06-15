import React from 'react';
import { HeaderView, HeaderTitle, LogoStyle, LogoText }from './styles';
import { Text } from 'react-native';

export default function Logo() {
  return(
    <HeaderView>
      <LogoStyle>
        <LogoText>
          B
        </LogoText>
      </LogoStyle>
      <HeaderTitle>
        Barragens
      </HeaderTitle>
    </HeaderView>
  );
}