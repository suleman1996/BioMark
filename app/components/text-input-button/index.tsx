import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { heightToDp, widthToDp } from '../../utils/functions/responsiveDimentions';
import { responsiveFontSize } from '../../utils/functions/responsiveText';
import { GlobalFonts } from '../../utils/theme/fonts';
import { GlobalColors } from '../../utils/theme/globalColors';
import { TextInput } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'

type Props = {
    question: string
    onPress: any,
    onChangeText: any
    value:any
    placeholder:any
}

const Textinput = ({ question, onPress, onChangeText,value,placeholder }: Props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    style={styles.input}
                    activeUnderlineColor="transparent"
                    underlineColor="transparent"
                    onChangeText={onChangeText}
                />
                <Pressable style={styles.addBtn} onPress={onPress}>
                    <Ionicons
                        color={GlobalColors.primaryGray}
                        name="add"
                        size={responsiveFontSize(35)}
                    />
                </Pressable>
            </View>
        </View>
    );
};

export default Textinput

const styles = StyleSheet.create({
    container: {
    },
    question: {
        // paddingHorizontal: widthToDp(4),
        fontSize: responsiveFontSize(20),
        fontFamily: GlobalFonts.medium,
        color: GlobalColors.darkPrimary,
        marginTop: heightToDp(2),
        paddingHorizontal: heightToDp(5),
        fontWeight:'bold'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingHorizontal: heightToDp(5),
    },
    input: {
        width: '85%',
        height: heightToDp(6),
        borderRadius: widthToDp(2),
        marginTop: heightToDp(2),
        marginRight: widthToDp(2),
        backgroundColor: GlobalColors.primaryGray
    },
    addBtn: {
        width: widthToDp(20),
        height: heightToDp(6),
        borderRadius: widthToDp(5),
        backgroundColor: GlobalColors.primary,
        position: 'absolute',
        right: widthToDp(4),
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: widthToDp(4),
        marginTop: heightToDp(3),
    },
    tag: {
        borderWidth: 1,
        borderColor: GlobalColors.darkPrimary,
        paddingHorizontal: widthToDp(3),
        paddingVertical: widthToDp(2),
        borderRadius: widthToDp(4),
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: widthToDp(3),
        marginTop: heightToDp(1.5)
    },
    tagText: {
        marginRight: widthToDp(2),
        fontFamily: GlobalFonts.regular,
        fontSize: responsiveFontSize(15),
    }
});