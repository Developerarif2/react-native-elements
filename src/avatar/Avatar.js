import React, { PropTypes } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import Text from '../text/Text'

const Avatar = (props) => {
  const {
    component,
    onPress,
    onLongPress,
    containerStyle,
    icon,
    iconStyle,
    source,
    small,
    medium,
    large,
    xlarge,
    avatarStyle,
    rounded,
    title,
    titleStyle,
    overlayContainerStyle,
    activeOpacity,
  } = props;

  let {
    width,
    height,
  } = props;

  let titleSize = 17

  if(small) {
    width = 34
    height = 34
    titleSize = 17
  } else if (medium) {
    width = 50
    height = 50
    titleSize = 25
  } else if (large) {
    width = 75
    height = 75
    titleSize = 37.5
  } else if (xlarge) {
    width = 150
    height = 150
    titleSize = 75
  } else if(!width && !height) {
    width = 34
    height = 34
  } else if (!width) {
    width = height
    titleSize = width/2
  } else if (!height) {
    height = width
    titleSize = height/2
  }

  let Component = onPress || onLongPress ? TouchableOpacity : View
  if (component) {
    Component = component
  }

  const renderContent = () => {
    if (source) {
      return (
        <Image
          style={[ styles.avatar, rounded && { borderRadius: width/2 }, avatarStyle && avatarStyle]}
          source={source}
        />
      )
    } else if (title) {
      return (
        <Text
          style={[ styles.title, titleStyle && titleStyle ]}>
          {title}
        </Text>
      )
    } else if (icon) {
      return (
        <Icon
          style={[ styles.icon, iconStyle && iconStyle ]}
          color={icon.color}
          name={icon.type && icon.type}
          size={icon.size} />
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      borderBottomColor: '#ededed',
      borderBottomWidth: 1,
      backgroundColor: 'transparent'
    },
    avatar: {
      width: width,
      height: height
    },
    overlayContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
      alignSelf: 'stretch',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: width,
      height: height
    },
    title: {
      color: '#ffffff',
      fontSize: titleSize,
      backgroundColor: 'rgba(0,0,0,0)',
      textAlign: 'center',
    },
    icon: {
      fontSize: 20,
      color: 'red',
    }
  });

  return (
    <Component
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={activeOpacity}
      style={[styles.container, containerStyle && containerStyle]}>
      <View
        style={[
          styles.overlayContainer, rounded && { borderRadius: width/2 },
          overlayContainerStyle && overlayContainerStyle,
        ]}
      >
      {renderContent()}
      </View>
    </Component>
  );
};

Avatar.propTypes = {
  component: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  containerStyle: PropTypes.any,
  source: PropTypes.object,
  avatarStyle: PropTypes.any,
  rounded: PropTypes.bool,
  title: PropTypes.string,
  titleStyle: PropTypes.any,
  overlayContainerStyle: PropTypes.any,
  activeOpacity: PropTypes.number,
};

export default Avatar;
