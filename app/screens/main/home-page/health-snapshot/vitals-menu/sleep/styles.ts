import { StyleSheet } from 'react-native';

export const makeStyles = () =>
  StyleSheet.create({
    view: {
      borderTopWidth: 2,
      borderTopColor: '#DAE0EB',
      width: '100%',
      height: 100,
      paddingTop: 10,
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    details: {
      flexDirection: 'column',
      width: '50%',
      height: 50,
    },
    middleTextContainer: {
      alignItems: 'center',
    },
    middleText: {
      marginRight: 5,
      fontSize: 19,
      fontWeight: '700',
    },
    middleTextType: {
      fontSize: 15,
      fontWeight: '400',
      color: '#8493AE',
    },
    activityHeaderContainer: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    activityHeaderColor: {
      height: 15,
      width: 15,
      borderRadius: 7,
      overflow: 'hidden',
      marginRight: 5,
    },
    activityHeader: {
      fontSize: 13,
      color: '#8493AE',
    },
    activityContentContainer: {
      flexDirection: 'row',
      marginBottom: 5,
      alignItems: 'center',
    },
    activityContent: {
      marginRight: 5,
      fontSize: 15,
      fontWeight: '700',
    },
    activityContentType: {
      fontSize: 12,
      color: '#8493AE',
    },
    yAxisLabel: {
      fontSize: 10,
      color: '#8493AE',
    },
    xAxisLabel: {
      fontSize: 10,
      color: '#8493AE',
      marginLeft: 8,
    },
  });

export default makeStyles;
