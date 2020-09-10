import React, {createContext, useMemo} from 'react';
import {View} from 'react-native';
import useEffectAfterMount from '../../hooks/useEffectAfterMount';
import useExpanded from '../../hooks/useExpanded';
import Content from './Expandable.Content';
import Header from './Expandable.Header';
import Icon from './Expandable.Icon';

export const ExpandableContext = createContext();

const Expandable = ({
  children,
  onExpand = () => {},
  shouldExpand,
  ...props
}) => {
  const isControlled = shouldExpand !== undefined;

  const {isExpanded, toggle} = useExpanded();
  useEffectAfterMount(() => {
    onExpand(isExpanded);
  }, [isExpanded]);

  const getState = isControlled ? shouldExpand : isExpanded;
  const getToggle = isControlled ? onExpand : toggle;

  const value = useMemo(
    () => ({
      isExpanded: getState,
      toggle: getToggle,
    }),
    [getState, getToggle],
  );

  return (
    <ExpandableContext.Provider value={value}>
      <View {...props}>{children}</View>
    </ExpandableContext.Provider>
  );
};

Expandable.Header = Header;
Expandable.Icon = Icon;
Expandable.Content = Content;

export default Expandable;
