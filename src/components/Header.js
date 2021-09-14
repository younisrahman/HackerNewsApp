import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    StatusBar,
} from 'react-native';


const headerColor = '#FF6700';
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const Header: () => React$Node = (props) => {

    return (
        <View style={styles.headerMainBack}>
            <StatusBar
                animated={true}
                translucent
                backgroundColor={headerColor}
                barStyle="light-content" />
            <View style={styles.headerContainer}>


                <Text style={styles.logo}
                    numberOfLines={1}>
                    {props.data.title}
                </Text>

            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    headerMainBack: {
        backgroundColor: '#ebf6ff',
    },
    headerContainer: {
        backgroundColor: headerColor,
        height: HEIGHT * .08,
        borderBottomRightRadius: HEIGHT * .06,
        borderBottomLeftRadius: HEIGHT * .06,
        width: WIDTH,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: HEIGHT * .04,
    },
});


export default Header;