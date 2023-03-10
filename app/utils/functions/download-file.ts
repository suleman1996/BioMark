import { Alert, PermissionsAndroid, Platform } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
// import { Launch } from 'react-native-openanything';
// import { showMessage } from 'react-native-flash-message';

// const fileUrl =
//   'https://www.techup.co.in/wp-content/uploads/2020/01/techup_logo_72-scaled.jpg';
export const checkPermissionAndDownload = async (file: string) => {
  // Function to check the platform
  // If Platform is Android then check for permissions.
  if (Platform.OS === 'ios') {
    downloadFile(file);
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'Application needs access to your storage to download File',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Start downloading
        downloadFile(file);
      } else {
        // If permission denied then show alert
        Alert.alert('Error', 'Storage Permission Not Granted');
      }
    } catch (err) {
      // To handle permission related exception
      console.error('Storage permission error' + err);
    }
  }
};
const downloadFile = (fileUrl: string) => {
  // Get today's date to add the time suffix in filename
  let date = new Date();
  // File URL which we want to download
  let FILE_URL = fileUrl;
  // Function to get extention of the file url
  let file_ext: any = getFileExtention(fileUrl);
  file_ext = '.' + file_ext[0];
  // config: To get response by passing the downloading related options
  // fs: Root directory path to download
  const { config, fs } = ReactNativeBlobUtil;
  let RootDir = fs.dirs.PictureDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      path:
        RootDir +
        '/file_' +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        file_ext,
      description: 'downloading file...',
      notification: true,
      // useDownloadManager works with Android only
      useDownloadManager: true,
    },
  };
  config(options)
    .fetch('GET', FILE_URL)
    .then(() => {});
};
const getFileExtention = (fileUrl: string) => {
  // To get the file extension
  return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
};
export const checkPermissionAndDownloadBase64 = async (file: string) => {
  // Function to check the platform
  // If Platform is Android then check for permissions.
  if (Platform.OS === 'ios') {
    downloadFileBase64(file);
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'Application needs access to your storage to download File',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Start downloading
        downloadFileBase64(file);
        // Alert.alert('Success', 'Storage Permission  Granted');
      } else {
        // If permission denied then show alert
        Alert.alert('Error', 'Storage Permission Not Granted');
      }
    } catch (err) {
      // To handle permission related exception
      console.error('Storage permission error ' + err);
    }
  }
};
const downloadFileBase64 = (fileUrl: string) => {
  console.log('fileUrl', fileUrl);

  var name = Math.floor(Date.now() / 1000);
  const { dirs } = ReactNativeBlobUtil.fs;
  const dirToSave =
    Platform.OS == 'ios'
      ? dirs.DocumentDir + '/' + name + '.pdf'
      : dirs.DownloadDir + '/' + name + '.pdf';
  if (Platform.OS === 'ios') {
    // ReactNativeBlobUtil.fs.writeFile(dirToSave, fileUrl, 'base64');
    // ReactNativeBlobUtil.ios.previewDocument(dirToSave);
    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        title: name + '.pdf',
        path: dirToSave,
        appendExt: 'pdf',
      },
    });
    ReactNativeBlobUtil.config(configOptions)
      .fetch('GET', fileUrl, {})
      .then((res) => {
        if (Platform.OS === 'ios') {
          ReactNativeBlobUtil.fs.writeFile(dirToSave, res.data, 'base64');
          ReactNativeBlobUtil.ios.previewDocument(dirToSave);
        }
      })
      .catch((e) => {
        Alert.alert(e.message);
      });
  } else {
    const { config, fs } = ReactNativeBlobUtil;
    let PictureDir = fs.dirs.DownloadDir; // this is the pictures directory. You can check the available directories in the wiki.
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification: true,
        path: PictureDir + '/file_' + name + '.pdf', // this is the path where your downloaded file will live in
        description: 'Downloading image.',
      },
    };
    config(options)
      .fetch('GET', fileUrl)
      .then((res) => {
        console.log('re', res);
        // do some magic here
      });
  }
};
