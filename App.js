import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      hasCamPermission: null,
      scanned: false,
      scannedData: " ",
      buttonState: "normal",
     }
  }

  getCameraPermission = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    
    this.setState({
      hasCamPermission: status === "granted",
      buttonState: "clicked",
      scanned: false, 
    })
   }
 
   handleBCScanned = async ({type,data}) =>{
    
     this.setState({
      scanned: true,
      scannedData: data,
      buttonState: "normal",
     })
   }
 
   render(){
     const hasCamPermission = this.state.hasCamPermission;
     const scanned = this.state.scanned;
     const scannedData = this.state.scannedData;
     const buttonState = this.state.buttonState;
     
     if(buttonState === "clicked"&& hasCamPermission){
       return(
        <BarCodeScanner 
        onBarCodeScanned={scanned ? undefined : this.handleBCScanned} style={StyleSheet.absoluteFillObject}>
        </BarCodeScanner>
       )
     }
     else if(buttonState === "normal"){
     return (
       <View style={styles.container}>
         <Text>{
         hasCamPermission===true ? this.state.scannedData : "Request Camera Permission" }
         </Text>
         <TouchableOpacity style = {styles.scanButton} 
                           onPress = {this.getCameraPermission}   
         >                    
           <Text style = {styles.buttonText}>Scan QR code</Text>
         </TouchableOpacity>
       </View>
     );
     }
   } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    backgroundColor: '#000000',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }
});