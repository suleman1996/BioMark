/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './app.tsx';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';
import i18n from './app/i18n/index';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
AppRegistry.registerComponent(appName, () => App);
