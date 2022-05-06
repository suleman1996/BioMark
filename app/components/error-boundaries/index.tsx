import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from 'assets/colors';
import fonts from 'assets/fonts';

import Logo from 'assets/svgs/logo-name';

class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log('from error boundary', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <View style={styles.container}>
            <View style={styles.icon}>
              <Logo height="120" width="170" />
            </View>
            <Text style={styles.heading}>System Under Maintenance</Text>
            <Text style={styles.subHeading}>
              BioMark App is not available at the moment.
            </Text>
            <Text style={styles.subHeading}>Please come again later.</Text>
          </View>
        </>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteColor,
    height: '100%',
    alignItems: 'center',
    paddingVertical: '20%',
  },

  icon: {
    alignSelf: 'center',
    marginBottom: 60,
  },
  heading: {
    fontFamily: fonts.bold,
    fontSize: 25,
    alignSelf: 'center',
    color: colors.blue,
    marginTop: 20,
    marginBottom: 25,
  },
  subHeading: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 20,
  },
});

export default ErrorBoundary;
