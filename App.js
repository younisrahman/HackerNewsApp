import React, { useEffect, useState, useReducer, createContext } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsScreen from './src/screens/NewsScreen';
import JobScreen from './src/screens/JobScreen';
import AskStoryScreen from './src/screens/AskStoryScreen';
import ShowStoryScreen from './src/screens/ShowStoryScreen';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const Tab = createBottomTabNavigator();

var newsData = []
var jobData = []
var askData = []
var showData = []


export const MyContext = createContext()

const iState = {
  news: [],
  job: [],
  ask: [],
  show: [],
  loadingModalNews: true,
  loadingModalJob: true,
  loadingModalAsk: true,
  loadingModalShow: true,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NEWS':
      return {
        ...state,
        news: action.payload,
        loadingModalNews: false
      }
    case 'SET_JOBS':
      return {
        ...state,
        job: action.payload,
        loadingModalJob: false
      }
    case 'SET_ASK':
      return {
        ...state,
        ask: action.payload,
        loadingModalAsk: false
      }
    case 'SET_SHOW':
      return {
        ...state,
        show: action.payload,
        loadingModalShow: false
      }

    default:
      return state
  }
}

const App = () => {

  const [data, dispatch] = useReducer(reducer, iState)

  //Component Did Mount
  useEffect(() => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json", requestOptions)
      .then(response => response.json())
      .then(result =>
        _loadAllnews(result)
      )
      .catch(error => console.log('error', error));

  }, [])

  //Load News Data
  const _loadAllnews = (news_array) => {

    for (let i = 0; i < Math.floor(news_array.length / 20); i++) {
      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`https://hacker-news.firebaseio.com/v0/item/${news_array[i]}.json?print=pretty`, requestOptions)
        .then(response => response.json())
        .then(result =>
          _addNewsToVar(result)
        )
        .catch(error => console.log('error', error)).
        finally(() => {
          if ((i + 1) == Math.floor(news_array.length / 20)) {
            dispatch({ type: 'SET_NEWS', payload: newsData })
            _loadAlljob()
          }
        })
    }
  }

  //set news Data in veriable
  const _addNewsToVar = (data) => {
    newsData = [...newsData, data]
  }

  //get all job id
  const _loadAlljob = () => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://hacker-news.firebaseio.com/v0/jobstories.json", requestOptions)
      .then(response => response.json())
      .then(result => _loadAllJobsData(result))
      .catch(error => console.log('error', error));
  }
  //get job Data 
  const _loadAllJobsData = (jobs_array) => {

    for (let i = 0; i < Math.floor(jobs_array.length / 6); i++) {
      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`https://hacker-news.firebaseio.com/v0/item/${jobs_array[i]}.json?print=pretty`, requestOptions)
        .then(response => response.json())
        .then(result =>
          _addJobToVar(result)
        )
        .catch(error => console.log('error', error)).
        finally(() => {
          if ((i + 1) == Math.floor(jobs_array.length / 6)) {
            dispatch({ type: 'SET_JOBS', payload: jobData })
            _loadAllAsk()
          }
        })
      // newsArr = [...newsArr, data]
    }
  }
  //set job Data in veriable
  const _addJobToVar = (data) => {
    jobData = [...jobData, data]
  }


  //get all ask Data id
  const _loadAllAsk = () => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://hacker-news.firebaseio.com/v0/askstories.json", requestOptions)
      .then(response => response.json())
      .then(result => _loadAllAskData(result))
      .catch(error => console.log('error', error));
  }
  //get ask Data
  const _loadAllAskData = (asks_array) => {

    for (let i = 0; i < Math.floor(asks_array.length / 6); i++) {
      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`https://hacker-news.firebaseio.com/v0/item/${asks_array[i]}.json?print=pretty`, requestOptions)
        .then(response => response.json())
        .then(result =>
          _addAskToVar(result)
        )
        .catch(error => console.log('error', error)).
        finally(() => {
          if ((i + 1) == Math.floor(asks_array.length / 6)) {
            dispatch({ type: 'SET_ASK', payload: askData })
            _loadAllShow()
          }
        })
    }

  }
  //set ask Data in veriable
  const _addAskToVar = (data) => {
    askData = [...askData, data]
  }

  //get show id
  const _loadAllShow = () => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://hacker-news.firebaseio.com/v0/showstories.json", requestOptions)
      .then(response => response.json())
      .then(result => _loadAllShowData(result))
      .catch(error => console.log('error', error));
  }
  //get show Data
  const _loadAllShowData = (show_array) => {

    for (let i = 0; i < Math.floor(show_array.length / 7); i++) {
      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`https://hacker-news.firebaseio.com/v0/item/${show_array[i]}.json?print=pretty`, requestOptions)
        .then(response => response.json())
        .then(result =>
          _addShowToVar(result)
        )
        .catch(error => console.log('error', error)).
        finally(() => {
          if ((i + 1) == Math.floor(show_array.length / 7)) {
            dispatch({ type: 'SET_SHOW', payload: showData })
          }
        })
    }
  }

  //set news Data in veriable
  const _addShowToVar = (data) => {
    showData = [...showData, data]
  }

  let fStyle = styles();

  return (
    <MyContext.Provider value={{ data: data }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: [{ ...fStyle.mainCointainer, ...fStyle.shadow }]
          })}

        >
          <Tab.Screen
            name="News"
            component={NewsScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={fStyle.iconView}>
                  <Image
                    source={require('./src/assets/news.png')}
                    resizeMode="contain"
                    style={
                      styles(focused).iconImage
                    }
                  />
                  <Text style={styles(focused).iconText}>NEWS</Text>
                </View>
              )
            }}
          />
          <Tab.Screen
            name="Job"
            component={JobScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={fStyle.iconView}>
                  <Image
                    source={require('./src/assets/job.png')}
                    resizeMode="contain"
                    style={
                      styles(focused).iconImage
                    }
                  />
                  <Text style={styles(focused).iconText}>JOB</Text>
                </View>
              )
            }} />


          <Tab.Screen
            name="Ask"
            component={AskStoryScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={fStyle.iconView}>
                  <Image
                    source={require('./src/assets/ask.png')}
                    resizeMode="contain"
                    style={
                      styles(focused).iconImage
                    }
                  />
                  <Text style={styles(focused).iconText}>ASK</Text>
                </View>
              )
            }}
          />
          <Tab.Screen
            name="Show"
            component={ShowStoryScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={fStyle.iconView}>
                  <Image
                    source={require('./src/assets/show.png')}
                    resizeMode="contain"
                    style={
                      styles(focused).iconImage
                    }
                  />
                  <Text style={styles(focused).iconText}>SHOW</Text>
                </View>
              )
            }} />
        </Tab.Navigator>
      </NavigationContainer>
    </MyContext.Provider>
  );
}


const styles = (focused) => {
  return StyleSheet.create({
    mainCointainer: {
      position: 'absolute',
      bottom: HEIGHT * .03,
      left: WIDTH * .05,
      right: WIDTH * .05,
      elevation: 0,
      backgroundColor: "#fff",
      borderRadius: HEIGHT * .02,
      height: HEIGHT * .10
    },
    shadow: {
      shadowColor: '#FF6700',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.5,
      elevation: 1
    },
    iconView: {
      alignItems: 'center',
      justifyContent: 'center',
      top: Platform.OS === 'ios' ? HEIGHT * .02 : HEIGHT * .001,
    },
    iconImage: {
      width: WIDTH * .065,
      height: HEIGHT * .04,
      tintColor: focused ? '#FF6700' : '#748c94',
    },
    iconText: {
      color: focused ? '#FF6700' : '#748c94',
      fontSize: HEIGHT * .014,
      // fontSize: 12
    },

  });
}

export default App