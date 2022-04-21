import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Covid19 from '../../../app/assets/svgs/covid-19';
import fonts from '../../assets/fonts/fonts';
import { Button } from 'react-native-paper';
import colors from '../../assets/colors/colors';
// import styles from 'react-native-indicators/src/components/ball-indicator/styles';

export default function Covid19Btn({ text, onPress }) {
    return (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <TouchableOpacity>
                <View style={styles.circleBtn}>
                    <Covid19 />
                </View>
            </TouchableOpacity>
            <View>
                <Text style={{ fontFamily: fonts.bold, fontSize: 15, color: colors.heading }}>COVID-19</Text>
            </View>
        </View>
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