import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform, Dimensions, TouchableOpacity, Linking, Alert, Modal, TextInput } from 'react-native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

let monthname = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Item = ({ data, index }) => {
    // var number = "000";

    const [getNumber, setgetNumber] = useState(false)
    const [number, setnumber] = useState(null)

    const OpenURL = ({ url }) => {
        if (url !== undefined) {
            Linking.openURL(url)
        }
        else {
            Alert.alert(
                "This Post Have No URL",
                "press ok to continue",
                [
                    {
                        text: 'OK'
                    },
                ],
                { cancelable: false },
            );
        }
    }

    const getNumberModalOpen = () => {
        setgetNumber(true)
    }

    const ShareSms = (data) => {
        // console.log(number)
        if (number !== null) {
            try {

                let date = new Date(data.time);

                const MESSAGE = `${data.title} 
            ${data.text !== undefined ?
                        data.text
                        :
                        null
                    } 
              ${data.score} points by ${data.by} | ${date.getDate()} ${monthname[date.getMonth()]} ${date.getFullYear()} | ${data.kids !== undefined ? data.kids.length + " comments" : null}
              ${data.url !== undefined ?
                        "URL : " + data.url
                        :
                        null
                    }
            `

                const separator = Platform.OS === 'ios' ? '&' : '?'
                const url = `sms:${number} ${separator}body=${MESSAGE}`
                setgetNumber(false)

                Linking.openURL(url)
            } catch (error) {
                console.log(error)
                setgetNumber(false)
            }
        }
        else {
            Alert.alert(
                "Please enter mobile",
                "press ok to continue",
                [
                    {
                        text: 'OK',onPress: () => {
                            setgetNumber(false)
                        }
                    },
                ],
                { cancelable: false },
            );
        }
    }



    let date = new Date(data.time);
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{index + 1}. {data.title}</Text>
            {data.text !== undefined ?
                <Text style={styles.text}>{data.text}</Text>
                :
                null
            }
            <Text style={styles.info}>{data.score} points by {data.by} | {date.getDate()} {monthname[date.getMonth()]} {date.getFullYear()} | {data.kids !== undefined ? data.kids.length + " comments" : null}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => OpenURL(data)}
                    style={styles.Button}
                >
                    <Text style={styles.ButtonTxt}>
                        Full Story
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => getNumberModalOpen()}
                    style={styles.Button}
                >
                    <Text style={styles.ButtonTxt}>
                        Share now
                    </Text>
                </TouchableOpacity>
            </View>


            {/* modal to get number */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={getNumber}

            >
                <View style={{
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0, .5)',
                }}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalEnterTxt}>Enter phone number</Text>
                        <TextInput
                            style={styles.textInputs}
                            placeholder={`Enter Phone Number`}
                            autoCapitalize='none'
                            // value={fieldData}
                            onChangeText={(text) => {
                                setnumber(text)
                            }}
                        // placeholderTextColor={placeHolderTxtColor}
                        ></TextInput>
                        <View style={styles.modelButtonContainer}>
                            <TouchableOpacity onPress={() => {
                                setgetNumber(false)
                            }} style={styles.changeButton}>
                                <Text style={styles.modelButtonTxt}>Cancle</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    ShareSms(data)
                                }}
                                style={styles.changeButton}
                            >
                                <Text style={styles.modelButtonTxt}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


        </View>
    );
}


const styles = StyleSheet.create({

    item: {
        backgroundColor: '#F6F6EF',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        padding: 10
    },
    title: {
        fontSize: HEIGHT * .028,
        fontWeight: 'bold'
    },
    info: {
        fontSize: HEIGHT * .02,
        opacity: .7
    },
    text: {
        fontSize: HEIGHT * .02,
        opacity: .6,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: HEIGHT * .01
    },
    Button: {
        backgroundColor: "#FF6700",
        height: HEIGHT * .05,
        width: WIDTH * .35,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: WIDTH * .03,
        borderRadius: WIDTH * .05
    },
    ButtonTxt: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: HEIGHT * .022

    },

    modalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        width: WIDTH * .95,
        height: HEIGHT * .2,
        borderRadius: HEIGHT * .04
    },
    modalEnterTxt: {
        fontSize: HEIGHT * .022,
        fontWeight: 'bold',
    },
    textInputs: {
        width: WIDTH * .9,
        height: HEIGHT * .08,
        borderRadius: HEIGHT * .06,
        fontSize: HEIGHT * .022,
        backgroundColor: '#bbb',
        borderStyle: "solid",
        borderWidth: HEIGHT * .01,
        borderColor: "#fff",
        paddingLeft: HEIGHT * .02
    },
    changeButton: {
        backgroundColor: "#FF6700",
        width: WIDTH * .4,
        height: HEIGHT * .05,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: HEIGHT * .03
    },
    modelButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: WIDTH * .85
    },
    modelButtonTxt: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: HEIGHT * .018
    }
});

export default Item