import React, { useEffect, useState } from "react";
import { Alert, Button, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View, Image } from "react-native";

const MoreDetails = ({navigation, route}) => {

   const colorScheme = useColorScheme();
   const {item} = route.params || {};
   const [movieDetails, setMovieDetails] = useState([]);

   useEffect(() => {
    getMovieDetails();
  },[]);

    const dynamicStyles = {
      container: {
        backgroundColor: colorScheme === 'dark' ? '#121212' : '#FFFFFF',
      },
      text: {
        color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
      }
    };

    const getMovieDetails = async () =>{
      try{
        const encodedSearch = encodeURIComponent(item.Title);
        const response = await fetch(`https://www.omdbapi.com/?apikey=dcc0d8f&plot=short&t=${encodedSearch}`,{
          method: "GET"
        })
        const data = await response.json();
        setMovieDetails(data);
        console.log(data);
      }
      catch(error){
        console.log("Failed " + error);
      }
    };
  


  return(
      <SafeAreaView style = {[styles.main_container, dynamicStyles.container]}>
        <View>
          <Text style={styles.main_text}>More Details</Text>
        </View>
        <View style = {styles.list_container}>
          <Image source={{ uri: `${item.Poster}` }} style={styles.image}/>
          <Text style={styles.item_header}>Title: {item.Title}</Text>
          <Text style={styles.item_body}>Director: {movieDetails.Director}</Text>
          <Text style={styles.item_body}>Actors: {movieDetails.Actors}</Text>
          <Text style={styles.item_body}>Plot: {movieDetails.Plot}</Text>
        </View>
      </SafeAreaView>
  );
};

export default MoreDetails;

const styles = StyleSheet.create({

  main_container:{
    flex: 1
  },
  image: {
    width: 200,
    height: 200,
  },
  main_text:{
    fontSize:32,
    fontWeight:"bold",
    padding: 10
  },
  list_container:{
    paddingHorizontal: 20
  },
  item_header: {
    paddingVertical: 5,
    fontSize:16,
    fontWeight:"bold",
  },
  item_body: {
    color: "#444",
    fontSize:16,
    paddingHorizontal: 10
  }
});
