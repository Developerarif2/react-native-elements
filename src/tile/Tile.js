import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  BackgroundImage,
  TextPropTypes,
  ViewPropTypes,
  withTheme,
} from '../config';

import Text from '../text/Text';
import Icon from '../icons/Icon';
import FeaturedTile from './FeaturedTile';

const Tile = props => {
  const {
    featured,
    imageSrc,
    icon,
    title,
    children,
    caption,
    titleStyle,
    onPress,
    activeOpacity,
    overlayContainerStyle,
    captionStyle,
    iconContainerStyle,
    imageContainerStyle,
    containerStyle,
    contentContainerStyle,
    titleNumberOfLines,
    ...attributes
  } = props;

  let { width, height } = props;

  if (!width) {
    width = Dimensions.get('window').width;
  }

  if (!height) {
    height = width * 0.8;
  }

  if (featured) {
    const featuredProps = {
      title,
      icon,
      caption,
      imageSrc,
      onPress,
      activeOpacity,
      containerStyle,
      imageContainerStyle,
      overlayContainerStyle,
      titleStyle,
      captionStyle,
      width,
      height,
    };
    return <FeaturedTile {...featuredProps} />;
  }

  return (
    <TouchableOpacity
      {...attributes}
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={StyleSheet.flatten([
        {
          width,
          height,
        },
        containerStyle && containerStyle,
      ])}
    >
      <BackgroundImage
        source={imageSrc}
        style={StyleSheet.flatten([
          styles.imageContainer,
          imageContainerStyle && imageContainerStyle,
        ])}
        resizeMode="cover"
      >
        <View
          style={StyleSheet.flatten([
            styles.iconContainer,
            iconContainerStyle && iconContainerStyle,
          ])}
        >
          {icon && <Icon {...icon} />}
        </View>
      </BackgroundImage>
      <View
        style={StyleSheet.flatten([
          styles.contentContainer,
          contentContainerStyle && contentContainerStyle,
        ])}
      >
        <Text
          testID="tileTitle"
          h4
          style={StyleSheet.flatten([styles.text, titleStyle && titleStyle])}
          numberOfLines={titleNumberOfLines}
        >
          {title}
        </Text>
        {children}
      </View>
    </TouchableOpacity>
  );
};

Tile.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
  caption: PropTypes.string,
  imageSrc: Image.propTypes.source,
  onPress: PropTypes.func,
  activeOpacity: PropTypes.number,
  containerStyle: ViewPropTypes.style,
  imageContainerStyle: ViewPropTypes.style,
  iconContainerStyle: ViewPropTypes.style,
  overlayContainerStyle: ViewPropTypes.style,
  titleStyle: TextPropTypes.style,
  captionStyle: TextPropTypes.style,
  width: PropTypes.number,
  height: PropTypes.number,
  featured: PropTypes.bool,
  children: PropTypes.any,
  contentContainerStyle: ViewPropTypes.style,
  titleNumberOfLines: PropTypes.number,
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flex: 2,
  },
  text: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 5,
  },
  contentContainer: {
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export { Tile };
export default withTheme(Tile, 'Tile');
