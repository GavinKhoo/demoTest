import React from 'react';
import PropTypes from 'prop-types';
import {Image, Dimensions} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const propTypes = {
  size: PropTypes.number,
};

const defaultProps = {
  size: 20,
};

const ImageIcon = ({imageName, source, size, style, onPress, ...rest}) => {
  const RES_WIDTH = w => SCREEN_WIDTH * (w / 100);

  return (
    <Image
      resizeMode="contain"
      style={[
        {
          width: RES_WIDTH(size),
          height: RES_WIDTH(size),
        },
        style,
      ]}
      source={imageName ? imageName : source}
      {...rest}
    />
  );
};

ImageIcon.propTypes = propTypes;
ImageIcon.defaultProps = defaultProps;
export default ImageIcon;
