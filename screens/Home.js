import { getDefaultConfig } from "@react-native/metro-config";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";

const Home = ({navigation}) => {

  const [studentsList, setStudentsList] = useState([]);

  useEffect(() => {
    getAllStudents();
  },[]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("Focused");
      getAllStudents();
    });
    return unsubscribe;
  }, [navigation]);

  const colorScheme = useColorScheme();
  
  const dynamicStyles = {
    container: {
      backgroundColor: colorScheme === 'dark' ? '#121212' : '#FFFFFF',
    },
    text: {
      color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
    }
  };

  const getAllStudents = async () => {
    try {
      const response = await fetch('http://192.168.1.6:9090/getAllStudents', {
        method : "GET"
      })
      const data = await response.json();
      setStudentsList(data);
    } catch (error) {
      console.log('Error occurred when fetching all:', error.message);
    }
  };

  const removeStudent = async (item) => {
    try {
      const response = await fetch(`http://192.168.1.6:9090/deleteStudentById/${item.id}`, {
        method : "DELETE"
      }).then(() => {
        getAllStudents();
      })
    } catch (error) {
      console.log('Error occurred when deleting:', error.message);
    }
  };

  return(
    <SafeAreaView style = {[styles.main_container, dynamicStyles.container]}>
      <View>
        <View style={styles.top_navigation_bar}>
          <Text style={styles.main_text}>Students List</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Add or Edit")}>
            <Text style={styles.add_text}>Add +</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style = {styles.list_container}>
          {studentsList.map((item,index) => {
            return (
              <View key={index} style = {styles.rowContainer}>
                <View style = {styles.item}>
                  <Text style = {styles.item_header}>{item.name}</Text>
                  <Text style = {styles.item_body}>Age: {item.age}</Text>
                  <Text style = {styles.item_body}>Grade :{item.grade}</Text>
                </View>
                <View style = {styles.button_item}>
                  <TouchableOpacity onPress={() => removeStudent(item)}>
                    <Text style = {styles.item_delete}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate("Add or Edit", {item})}>
                    <Text style={styles.item_delete}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({

  main_container:{
    flex: 1
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBlockColor: "#888"
  },
  main_text:{
    fontSize:32,
    fontWeight:"bold",
    padding: 10
  },
  list_container:{
    paddingHorizontal: 20
  },
  item: {
    justifyContent: "center"
  },
  button_item: {
    paddingVertical: 20,
    justifyContent: "center",
    flexDirection: "row",
  },
  item_header: {
    fontSize:16,
    fontWeight:"bold",
  },
  item_body: {
    color: "#444",
    fontSize:16,
    paddingHorizontal: 10
  },
  item_delete: {
    paddingRight: 20,
    fontSize:20,
    fontWeight:"bold",
    color: "red"
  },
  add_text:{
    color: "blue",
    fontSize:32,
    fontWeight:"bold",
    padding: 10
  },
  top_navigation_bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
});
