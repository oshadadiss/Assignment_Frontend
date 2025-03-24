import { getDefaultConfig } from "@react-native/metro-config";
import React, { useEffect, useState } from "react";
import {API_ENDPOINT} from "./utills";
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";

const Home = ({navigation}) => {

  const [movieList, setMovieList] = useState([]);
  const [search, setSearch] = useState("");
  const [responseText, setResponseText] = useState("");

  const colorScheme = useColorScheme();
  
  const dynamicStyles = {
    container: {
      backgroundColor: colorScheme === 'dark' ? '#121212' : '#FFFFFF',
    },
    text: {
      color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
    }
  };

  const onPressButton = async () =>{
    if(search != ""){
      try{
        const encodedSearch = encodeURIComponent(search);
        const response = await fetch(`https://www.omdbapi.com/?apikey=dcc0d8f&s=${encodedSearch}`,{
          method: "GET"
        })
        const data = await response.json();
        console.log(data.Search);
        console.log(data.Response);
        setResponseText("");
        setMovieList(data.Search);
      }
      catch(error){
        console.log("Failed " + error);
        setResponseText("Search Failed..!");
        setSearch("");
      }
    }
    else{
      console.log("Empty");
      setResponseText("Please Enter Movie name..!");
      setMovieList([]);
    }
  };

  return(
    <SafeAreaView style = {[styles.main_container, dynamicStyles.container]}>
      <View>
        <Text style={styles.main_text}>Movie List</Text>
      </View>
      <View style={styles.search_bar_container}>
        <View style={styles.input_container}>
        <TextInput 
        placeholder="Search Movies" 
        value={search} 
        onChangeText={(text) => {setSearch(text)}} 
        style = {styles.input_text}/>
        </View>
        <View style = {styles.button}>
          <Button title="Search" onPress={() => onPressButton()}/>
        </View>
      </View>
      {responseText != "" ? 
      <View style = {styles.response_view}>
        <Text style = {styles.response_text}>{responseText}</Text>
      </View> : null}
      <ScrollView style = {styles.list_container}>
        {movieList.map((item,index) => {
          return(
            <TouchableOpacity key={index} onPress={() => navigation.navigate("More", {item})}>
              <View style = {styles.rowContainer}>
                <View style = {styles.item}>
                  <Text style={styles.title_text}>{item.Title}</Text>
                  <Text style={styles.detail_text}>{item.Year}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({

  main_container:{
    flex: 1
  },
  main_text:{
    fontSize:32,
    fontWeight:"bold",
    padding: 10
  },
  search_bar_container: {
    flexDirection: "row",
    justifyContent:'space-between' ,
    alignItems: 'center'
  },
  input_container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_text: {
    width: '80%',
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#888",
  },
  button: {
    paddingRight: 50
  },
  list_container:{
    paddingTop:10,
    paddingHorizontal: 70
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBlockColor: "#888"
  },
  item: {
    justifyContent: "center"
  },
  title_text:{
    fontSize:16,
    fontWeight: 'bold'
  },
  detail_text:{
    fontSize:16,
    color: "#888"
  },
  response_view: {
    alignItems: 'center'
  },
  response_text: {
    fontSize: 25,
    color: "red"
  }
});
