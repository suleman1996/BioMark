import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { IAppState } from '../store/IAppState';
import AuthNavigator from './autth-navigator';
import AppNavigator from './app-navigator'

type Props = {}

const MainNavigationCheck = (props: Props) => {
          const auth = useSelector((state: IAppState) => state.auth);
          const userToken = auth.userToken ? auth.userToken : null;


  return <>{userToken ? <AppNavigator /> : <AuthNavigator />}</>;
}

export default MainNavigationCheck

const styles = StyleSheet.create({})