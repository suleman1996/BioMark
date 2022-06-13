import Share from 'react-native-share';

export const sharePdfFile = async (base64Data: any) => {
  const options = {
    //   url: 'data:<data_type>/<file_extension>;base64,<base64_data>',
    url: `data:pdf/pdf;base64,${base64Data}`,
    type: 'application/pdf',
  };
  Share.open(options)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      err && console.log(err);
    });
};
