import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import colors from '../../assets/colors/colors';

const HomeRoute = () => <Text>Home</Text>
const InboxRoute = () => <Text>Inbox</Text>
const AppointmentRoute = () => <Text>Appointment</Text>
const AccountRoute = () => <Text>Account</Text>

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([

    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'inbox', title: 'Inbox', icon: 'inbox' },
    { key: 'appointment', title: 'Appointment', icon: 'calendar' },
    { key: 'account', title: 'Account', icon: 'account' },

  ]);

  const renderScene = BottomNavigation.SceneMap({

    home: HomeRoute,
    inbox: InboxRoute,
    appointment: AppointmentRoute,
    account: AccountRoute,


  });

  return (
    <BottomNavigation
      style={{ backgroundColor: colors.blue }}
      barStyle={{ backgroundColor: colors.whiteColor }}
      navigationState={{ index, routes }}
      activeColor={colors.blue}
      inactiveColor={'#8493AE'}
      onIndexChange={setIndex}
      renderScene={renderScene}
      keyboardHidesNavigationBar={true}
      sceneAnimationEnabled={false}


    />
  );
};

export default MyComponent;