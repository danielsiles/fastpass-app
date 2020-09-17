/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
global.FormData = global.originalFormData || global.FormData;

if (window.FETCH_SUPPORT) {
  window.FETCH_SUPPORT.blob = false;
} else {
  global.Blob = global.originalBlob || global.Blob;
  global.FileReader = global.originalFileReader || global.FileReader;
}
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
