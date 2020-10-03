import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import moment from 'moment';
import {ListItem} from 'react-native-elements';
import {ImageIcon} from '../../element';
import {allImages} from '@image/all';
import * as storageRedux from '@reducers/storage/ducks';

const isArrayEmpty = data => !data || data.length === 0;
const isObjectEmpty = data =>
  !data || Object.getOwnPropertyNames(data).length === 0;

class DayDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherForeCast: {},
    };
  }

  componentDidMount() {
    this.setState({weatherForeCast: this.props.storageData.weatherData});
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
    const {min_temp, max_temp, datetime, weather = {}} = item;
    const {icon, description} = weather;

    return (
      <ListItem>
        <ListItem.Content style={style.detailsContainer}>
          <Text>
            {moment(datetime, 'YYYY-MM-DD').format('dddd DD MMM YYYY')}
          </Text>
          <ImageIcon imageName={allImages[icon]} size={15} />
        </ListItem.Content>
      </ListItem>
    );
  };

  render() {
    const {navigation} = this.props;
    const {params = {}} = navigation.state;
    const {item, city_name} = params;
    const {min_temp, max_temp, weather = {}, datetime} = item;
    const {icon, description} = weather;

    return (
      <SafeAreaView style={[style.container]}>
        <View style={[style.alignCenter]}>
          <Text style={[style.textColor]}>{city_name}</Text>
          <Text style={[style.textColor]}>
            {moment(datetime, 'YYYY-MM-DD').format('dddd DD MMM YYYY')}
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
        {this.renderList()}
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textColor: {
    color: '#008B8B',
  },
});

const mapStateToProps = store => ({
  storageData: store[storageRedux.NAME].storageReducer,
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DayDetails);
