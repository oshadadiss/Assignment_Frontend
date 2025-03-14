import React, { useEffect, useState } from "react";
import { Alert, Button, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";

const AddOrEdit = ({navigation, route}) => {

   const colorScheme = useColorScheme();
   const {item} = route.params || {};

   const [id, setId] = useState(item? item.id : "");
   const [name, setName] = useState(item? item.name : "");
   const [age, setAge] = useState(item? JSON.stringify(item.age) : "");
   const [grade, setGrade] = useState(item? JSON.stringify(item.grade) : "");
   const [responseText, setResponseText] = useState("");
    
    const dynamicStyles = {
      container: {
        backgroundColor: colorScheme === 'dark' ? '#121212' : '#FFFFFF',
      },
      text: {
        color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
      }
    };

  
    const onPressButton = async () => {

      if(name == "" || age == "" || grade == ""){
        setResponseText("Please enter valid details");
        console.log("invalid!!");
        return null;
      }
      else if(item){
        if(name == item.name && age == item.age && grade == item.grade){
          setResponseText("Please enter updated details");
          console.log("invalid!!");
          return null;
        }
      }

      if(id != ""){
        console.log(name,age,grade);
        try {
          const response = await fetch(`http://192.168.1.6:9090/udateStudentById/${id}`, {
            method : "POST",
            body : JSON.stringify({
              "name" : name,
              "age" : age,
              "grade" : grade
            }),
            headers: {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json' 
            }
          })
          if (!response.ok) {
            setResponseText("Unexpected error occured!");
            console.log("Fail!!");
          } else {
            setResponseText("Successfully Created!");
            console.log("Success!!");
          }
          console.log(response);
        } catch (error) {
          console.log('Error occurred when saving:', error.message);
        }
      }

      if(id == ""){
        try {
          const response = await fetch('http://192.168.1.6:9090/addStudent', {
            method : "POST",
            body : JSON.stringify({
              "name" : name,
              "age" : age,
              "grade" : grade
            }),
            headers: {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json' 
            }
          })
          if (!response.ok) {
            setResponseText("Unexpected error occured!");
            console.log("Fail!!");
          } else {
            console.log("Success!!");
            setResponseText("Successfully Updated!");
          }
          console.log(response);
        } catch (error) {
          console.log('Error occurred when saving:', error.message);
        }
      }
    };

  return(
      <SafeAreaView style = {[styles.main_container, dynamicStyles.container]}>
        <View>
        <Text style={styles.main_text}>Add or Edit</Text>
        </View>
        <View style = {styles.list_container}>
          <View style = {styles.rowContainer}>
            <View style = {styles.item}>
              <Text style = {styles.item_header}>Name</Text>
              <TextInput 
                placeholder="Enter your name"
                value={name}
                onChangeText={(text) => {setName(text)}} 
                style = {styles.input_text}
              />
              <Text style = {styles.item_header}>Age</Text>
              <TextInput 
                placeholder="Enter your age"
                value={age}
                onChangeText={(text) => {setAge(text)}} 
                keyboardType="numeric" 
                style = {styles.input_text}
              />
              <Text style = {styles.item_header}>Grade</Text>
              <TextInput 
                placeholder="Enter your grade"
                value={grade}
                onChangeText={(text) => {setGrade(text)}} 
                keyboardType="numeric" 
                style = {styles.input_text}
              />
            </View>
          </View>
        </View>
        <View style = {styles.button}>
            <Button title="Save" onPress={() => onPressButton()}/>
        </View>
        <View style = {styles.response_view}>
          <Text style = {styles.response_text}>{responseText}</Text>
        </View>
      </SafeAreaView>
  );
};

export default AddOrEdit;

const styles = StyleSheet.create({

  main_container:{
    flex: 1
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
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
    flex:1,
    justifyContent: "center"
  },
  item_header: {
    paddingVertical: 10,
    fontSize:16,
    fontWeight:"bold",
  },
  item_body: {
    color: "#444",
    fontSize:16,
    paddingHorizontal: 10
  },
  item_delete: {
    fontSize:16,
    fontWeight:"bold",
    color: "red"
  },
  input_text: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#888",
    marginTop: 5
  },
  button: {
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: '30%'
  },
  response_view: {
    alignItems: 'center'
  },
  response_text: {
    fontSize: 25,
    color: "red"
  }
});
