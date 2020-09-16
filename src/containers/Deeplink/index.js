import React, {useEffect, useState} from 'react';
import {Text, View, Linking} from 'react-native';

const DeepLink = ({params}) => {
  const [initUrl, setUrl] = useState('');

  useEffect(() => {
    const getUrlAsync = async () => {
      Linking.addEventListener('url', handleOpenUrlCallback);

      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      setUrl(initialUrl);
    };

    getUrlAsync();

    // return Linking.removeAllListeners();
  }, []);

  const handleOpenUrlCallback = ({url}) => {
    console.log('url :>> ', url);
  };

  return (
    <View>
      <Text>DeepLink is: {initUrl}</Text>
    </View>
  );
};

export default DeepLink;
