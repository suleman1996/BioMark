import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import QrScanner from '../../assets/svgs/qr-scanner'
import colors from '../../assets/colors/colors';

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <Searchbar
    style={{ marginLeft:15, borderWidth: 0, borderRadius:8, borderBottomLeftRadius:0,borderTopLeftRadius:0,borderBottomRightRadius:8,borderTopRightRadius:8}}
      placeholder="Search Biomark app"
      placeholderTextColor={'#8493AE'}
      iconColor={colors.blue}
      onChangeText={onChangeSearch}
      value={searchQuery}  
    />
  );
};

export default MyComponent;