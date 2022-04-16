import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import fonts from '../../assets/fonts/fonts';
import colors from '../../assets/colors/colors';
import YourHealth from '../../../app/assets/svgs/your-health';
import { Button } from 'react-native-paper';
// import styles from 'react-native-indicators/src/components/ball-indicator/styles';

export default function YourHealthBtn({ text, onPress }) {
    return (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <TouchableOpacity>
                <View style={styles.circleBtn}>
                    <YourHealth />
                </View>
            </TouchableOpacity>
            <View>
                <Text style={{ fontFamily: fonts.bold, fontSize: 15, color: colors.heading }}>Your Health</Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    circleBtn: {
        // borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 300,
        paddingHorizontal: 12,
        paddingVertical: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 10,
        marginBottom: 5,

    }
})