import { Alert, PermissionsAndroid, Platform } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
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
      console.log('++++' + err);
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
    .then((res) => {
      // Alert after successful downloading
      console.log('res -> ', JSON.stringify(res));
      alert('File Downloaded Successfully.');
    });
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
      console.log('++++' + err);
    }
  }
};
const downloadFileBase64 = (fileUrl: string) => {
  ReactNativeBlobUtil.config({
    addAndroidDownloads: {
      useDownloadManager: true, // <-- this is the only thing required
      // Optional, override notification setting (default to true)
      notification: true,
      // Optional, but recommended since android DownloadManager will fail when
      // the url does not contains a file extension, by default the mime type will be text/plain
      mime: 'application/pdf',
      description: 'File downloaded by download manager.',
    },
  })
    .fetch(
      'GET',
      `${'https://cran.r-project.org/web/packages/BioMark/BioMark.pdf'}`
    )
    .then((res) => {
      console.log(res);
      // the path of downloaded file
      // resp.path()
      // let base64Str = fileUrl;
      let pdfLocation =
        ReactNativeBlobUtil.fs.dirs.DocumentDir + '/' + 'test.pdf';
      ReactNativeBlobUtil.fs.writeFile(
        pdfLocation,
        ReactNativeBlobUtil.base64.encode(fileUrl),
        'base64'
      );
    });
};
