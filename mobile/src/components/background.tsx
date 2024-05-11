import { ImageBackground } from 'react-native';

import backgroundImg from '../assets/ticket/header.png';

interface Props {
  children: React.ReactNode;
}

export function Background({ children }: Props) {
  return (
    <ImageBackground className='bg-green-500 flex-1 w-100'
      source={backgroundImg}

      defaultSource={backgroundImg}
    >
      {children}
    </ImageBackground>
  );
}