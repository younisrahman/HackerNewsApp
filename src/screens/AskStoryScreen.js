import React, { useContext } from 'react'
import { View, Text, Modal, StyleSheet, FlatList,Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import LoadingModal from '../components/LoadingModal'
import { MyContext } from '../../App'
import Item from '../components/Item'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const AskStoryScreen = () => {
    
    const askContext = useContext(MyContext)
    const renderItem = ({ item, index }) => (
        <Item data={item} index={index} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header data={{ title: "Ask Question" }} />
            <FlatList
                contentContainerStyle={styles.flatlistContainer}
                data={askContext.data.ask}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={askContext.data.loadingModalAsk}
                onRequestClose={() => {
                }}
            >
                <LoadingModal />
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ebf6ff"

    },
    flatlistContainer:{
        paddingBottom: HEIGHT *.25
    },
  });


export default AskStoryScreen
