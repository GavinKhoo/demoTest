import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import {ListItem} from 'react-native-elements';
import {ImageIcon} from '@element';
import {allImages} from '@image/all';
import * as storageRedux from '@reducers/storage/ducks';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const isObjectEmpty = data =>
  !data || Object.getOwnPropertyNames(data).length === 0;

class ForecastMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherForeCast: {},
    };
  }

  componentDidMount() {
    this.props.getWeatherCast();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.storageData.weatherData !== this.props.storageData.weatherData
    ) {
      this.setState({weatherForeCast: this.props.storageData.weatherData});
    }
  }

  keyExtractor = (item, index) => index.toString();

  renderList = () => {
    const {weatherForeCast} = this.state;
    const {data = []} = weatherForeCast;

    if (!isObjectEmpty(weatherForeCast)) {
      return (
        <FlatList
          keyExtractor={this.keyExtractor}
          data={data}
          renderItem={this.renderItem}
        />
      );
    }
  };

  renderItem = ({item}) => {
    const {weatherForeCast} = this.state;
    const {city_name} = weatherForeCast;
    const {min_temp, max_temp, datetime, weather = {}} = item;
    const {icon, description} = weather;

    return (
      <ListItem
        bottomDivider
        onPress={() =>
          this.props.navigation.navigate('DayDetails', {
            item: item,
            city_name: city_name,
          })
        }>
        <ListItem.Content style={{flexDirection: 'row', alignItems: 'center'}}>
          <ListItem.Content>
            <ListItem.Title>
              {moment(datetime, 'YYYY-MM-DD').format('dddd DD MMM YYYY')}
            </ListItem.Title>
            <ListItem.Subtitle style={{paddingVertical: 2}}>
              {min_temp + '°C - ' + max_temp + '°C'}
            </ListItem.Subtitle>
            <ListItem.Subtitle>{description}</ListItem.Subtitle>
          </ListItem.Content>
          <ImageIcon imageName={allImages[icon]} size={15} />
        </ListItem.Content>
        <ListItem.Chevron color={'#39D2D4'} size={25} />
      </ListItem>
    );
  };

  renderNavBar = () => {
    const {weatherForeCast} = this.state;
    const {city_name, data = []} = weatherForeCast;
    const {min_temp, max_temp, weather = {}} = data[0] || [];
    const {icon, description} = weather;

    return (
      <View style={style.navContainer}>
        <View style={style.statusBar} />
        <View style={style.navBar}>
          <View>
            <Text>{city_name}</Text>
            <Text>{moment().format('dddd DD MMM YYYY')}</Text>
          </View>
          <View>
            <Text>{min_temp + '°C - ' + max_temp + '°C'}</Text>
            <Text>{description}</Text>
          </View>
        </View>
      </View>
    );
  };

  parralaxTitle = () => {
    const {weatherForeCast} = this.state;
    const {city_name = 'fetching', data = []} = weatherForeCast;
    const {min_temp = 0, max_temp = 0, weather = {}} = data[0] || [];
    const {icon, description} = weather;

    return (
      <View style={[style.alignCenter, style.titleContainer]}>
        <Text style={[style.textColor]}>{city_name}</Text>
        <Text style={[style.textColor]}>
          {moment().format('dddd DD MMM YYYY')}
        </Text>
        <View style={{paddingVertical: 5}} />
        <Text style={{fontSize: 30, color: '#008B8B'}}>
          {min_temp + '°C - ' + max_temp + '°C'}
        </Text>
        <View style={{paddingVertical: 5}} />
        <ImageIcon imageName={allImages[icon]} />
        <Text style={[style.textColor]}>{description}</Text>
        <View style={{paddingVertical: 30}} />
      </View>
    );
  };

  render() {
    return (
      <>
        <ReactNativeParallaxHeader
          headerMinHeight={HEADER_HEIGHT}
          headerMaxHeight={280}
          extraScrollHeight={20}
          navbarColor="#3498db"
          alwaysShowTitle={false}
          // titleStyle={style.titleStyle}
          title={this.parralaxTitle()}
          // backgroundImage={}
          // backgroundImageScale={1.2}
          alwaysShowNavBar={false}
          renderNavBar={this.renderNavBar}
          renderContent={this.renderList}
          containerStyle={style.container}
          contentContainerStyle={style.contentContainer}
          innerContainerStyle={style.container}
          // scrollViewProps={{
          //   onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
          //   onScrollEndDrag: () => console.log('onScrollEndDrag'),
          // }}
        />
      </>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  titleContainer: {
    paddingTop: 40,
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textColor: {
    color: '#008B8B',
  },
});

const mapStateToProps = store => ({
  storageData: store[storageRedux.NAME].storageReducer,
});
const mapDispatchToProps = {
  getWeatherCast: storageRedux.getWeather,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForecastMain);
