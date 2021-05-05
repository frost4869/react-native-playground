import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import Txt from '../../components/Txt';
import styles from './styles';

const Intro = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerWrapper}>
      <Txt style={{...styles.text, fontSize: 14, fontWeight: '500'}}>Background{`\n`}</Txt>
      <Txt style={styles.text}>
        On one evening when I hung out with some of my friends from college at Hokaido Sushi, we
        stumped upon a problem where one guy had to implement a button for his mobile application.
        Said button has to have a progress indicator as its border, as well as a label showing the
        progress percentage.{`\n`}
      </Txt>
      <Txt style={styles.text}>
        We exchanged various ideas and approches. One of which is to have circle with diameter equal
        to the button diagonal line, and then has lines projected from the center of the button,
        indicating the progress. Wherever the lines connect with the button edges, that would be a
        step for the progress.{`\n`}
      </Txt>
      <Txt style={styles.text}>
        Although that was not the final solution (which you can find{' '}
        <Txt
          onPress={() => navigation.navigate('AnimationsDemo', {screen: 'AnimatedButton'})}
          style={styles.link}>
          here
        </Txt>
        ), it was still a quite interesting challenge to implement using React Native, and the
        bellow is my attemp :){`\n`}
      </Txt>
    </View>
  );
};

export default Intro;
