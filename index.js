import {AppRegistry} from 'react-native';
// import Main from './src/init/main';
import Main from '@init/main';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Main);
