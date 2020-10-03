import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import ForecastMain from '@component/weather-forecast/ForecastMain';
import DayDetails from '@component/weather-forecast/DayDetails';

const MainScreenNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: ForecastMain,
      navigationOptions: {
        header: null,
      },
    },
    DayDetails: {screen: DayDetails},
  },
  {
    initialRouteName: 'HomeScreen',
    transitionConfig: getSlideFromRightTransition,
    // headerMode: 'none',
    headerLayoutPreset: 'center',
    // headerBackTitleVisible: false,
    // navigationOptions: {
    // gesturesEnabled: false,
    // header: null,
    // },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      MainNavi: MainScreenNavigator,
    },
    {
      initialRouteName: 'MainNavi',
    },
  ),
);
