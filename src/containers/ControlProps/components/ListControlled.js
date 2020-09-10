import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Expandable from '../../../components/Expandable/Expandable';

const data = [
  {
    id: 1,
    header: 'Emlyn Chatteris',
    content:
      'Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
  },
  {
    id: 2,
    header: 'Fair Chatell',
    content:
      'Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus.',
  },
  {
    id: 3,
    header: 'Zachariah Ternott',
    content:
      'Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.',
  },
  {
    id: 4,
    header: 'Hendrik Gawkes',
    content:
      'Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.',
  },
  {
    id: 5,
    header: 'Salomi Fairburne',
    content:
      'Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
  },
];

const ListControlledExpandable = () => {
  const [expandingIndex, setExpand] = useState();
  const handleExpand = index => {
    if (index === expandingIndex) {
      setExpand();
    } else {
      setExpand(index);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.state}>
        Expanding index: {expandingIndex >= 0 && expandingIndex + 1}
      </Text>
      {data.map((item, index) => {
        const isExpanded = index === expandingIndex;
        return (
          <Expandable
            onExpand={() => handleExpand(index)}
            shouldExpand={isExpanded}
            key={item.id}>
            <Expandable.Header>
              <Text>{item.header}</Text>
              <Expandable.Icon />
            </Expandable.Header>
            <Expandable.Content style={styles.content}>
              <Text>{item.content}</Text>
            </Expandable.Content>
          </Expandable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  state: {
    marginBottom: 8,
  },
  content: {
    backgroundColor: 'pink',
  },
});

export default ListControlledExpandable;
