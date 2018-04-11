import React, { Component } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Header } from 'react-native-elements'
import { FontAwesome} from '@expo/vector-icons';

var window = Dimensions.get('window');

export default class Profile extends Component {
  constructor(props) {
      super(props)
      this.state = {
          editable: false,
          selected: false,
          showCancel: false,
          showModal: false,
          name: props.name,
          website: props.website,
          email: props.email,
          phone: props.phone,
          bio: props.bio
      }
      this.data = {
        name: this.state.name,
        website: this.state.website,
        email: this.state.email,
        phone: this.state.phone,
        bio: this.state.bio
      }
  }

  onPressEdit = () => {
    this.setState(prev => ({
      selected: !prev.selected,
      editable: !prev.editable,
      showCancel: !prev.showCancel
    }));
  };

  onPressSave = () => {
    this.setState(prev => ({
      selected: !prev.selected,
      editable: !prev.editable,
      showCancel: !prev.showCancel,
      showModal: !prev.showModal
    }));
    this.data = {
        name: this.state.name,
        website: this.state.website,
        email: this.state.email,
        phone: this.state.phone,
        bio: this.state.bio
    }
  };
  
  _renderModalPopup = () => {
    if (this.state.showModal) {
      return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}>
          <View style={{marginTop: 40}}>
            <View>
              <Text style={styles.modalTitle}> Your changes </Text>
              <Text style={styles.modalText}>{JSON.stringify(this.data).replace(/,|{|}/g, "\n")}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  this.setState(prev => ({
                    showModal: !prev.showModal
                  }));
                }}>
                <Text style={styles.cancelButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    }
  }
  onPressCancel = () => {
    this.setState(prev => ({
      selected: !prev.selected,
      editable: !prev.editable,
      showCancel: !prev.showCancel,
      name: this.data.name,
      website: this.data.website,
      email: this.data.email,
      phone: this.data.phone,
      bio: this.data.bio
    }));
  };

  _renderCancel = () => {
      if (this.state.showCancel) {
          return (
            <TouchableOpacity style={styles.cancelButtonContainer} onPress={this.onPressCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          );
      } else {
          return (<View style={styles.footer}/>);
      }
  }
  
//#############################################//
//                                             //
//              Text Change Events            //
//                                            //
//############################################//
  handleChangeName = (text) => {
    this.setState({
      name: String(text)
    });
  }
  handleChangeWeb = (text) => {
    this.setState({
      website: String(text)
    });
  }  
  handleChangeEmail = (text) => {
    this.setState({
      email: String(text)
    });
  }
  handleChangePhone = (text) => {
    this.setState({
      phone: String(text)
    });
  }
  handleChangeBio = (text) => {
    this.setState({
      bio: String(text)
    });
  }

  render() {
    return (
      <View>
        <View>
          <Header
            backgroundColor={'#00897B'}
            leftComponent={
              <FontAwesome
                  name={'arrow-left'}
                  size={25}
                  style={{ color: '#fff'}}
              />
            }
            centerComponent={
              <Text style={styles.title}>Edit Profile</Text>
            }
            rightComponent={
              <TouchableOpacity onPress={this.state.selected? this.onPressSave : this.onPressEdit}>
              <FontAwesome
                  name={this.state.selected? 'save' : 'pencil'}
                  size={25}
                  style={{ color: '#fff'}}
              />
              </TouchableOpacity>
            }
          />
        </View>
        <KeyboardAwareScrollView style={styles.container}>
          <View style ={styles.avatarContainer}>
            <Image style={styles.avatar} source= {{uri: 'http://www.acqueon.com/wp-content/uploads/2017/08/avatar-image.png'}} />
          </View>
          <TextInput style={this.state.editable? styles.editText : styles.attributeText}
                    editable={this.state.editable}
                    value={this.state.name}
                    onChangeText={this.handleChangeName}/>
          <TextInput style={this.state.editable? styles.editText : styles.attributeText}
                     editable={this.state.editable} 
                     value={this.state.website}
                     onChangeText={this.handleChangeWeb}/>
          <TextInput style={this.state.editable? styles.editText : styles.attributeText}
                    editable={this.state.editable}
                    value={this.state.email}
                    onChangeText={this.handleChangeEmail}/>
          <TextInput style={this.state.editable? styles.editText : styles.attributeText}
                    editable={this.state.editable}
                    keyboardType={'phone-pad'}
                    value={this.state.phone} 
                    onChangeText={this.handleChangePhone}/>
          <TextInput style={this.state.editable? styles.editText : styles.attributeText}
                    editable={this.state.editable}
                    multiline={true}
                    value={this.state.bio} 
                    onChangeText={this.handleChangeBio}/>
          {this._renderCancel()}
          {this._renderModalPopup()}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

//#############################################//
//                                             //
//              Styles                         //
//                                            //
//############################################//
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width, 
    height: window.height,
    backgroundColor: '#E0E0E0',
  },
  attributeText: {
    width: 300,
    textAlign: 'center',
    borderRadius: 30,
    marginTop: 10,
    padding: 16,
    fontSize: 18,
    fontFamily: 'Avenir',
    color: '#34495e',
    backgroundColor: '#fff'
  },
  modalText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Avenir',
    color: '#34495e'
  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    fontFamily: 'Avenir',
    color: '#34495e'
  },
  modalButton: {
    margin: 20,
    borderRadius: 30,
    backgroundColor: '#34495e'
  },
  editText: {
    width: 300,
    textAlign: 'center',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#009688',
    marginTop: 10,
    padding: 16,
    fontSize: 18,
    fontFamily: 'Avenir',
    color: '#34495e',
    backgroundColor: '#fff'
  },
  cancelButtonText: {
    textAlign: 'center',
    padding: 16,
    fontSize: 20,
    fontFamily: 'Avenir',
    color: '#fff',
  },
  cancelButtonContainer: {
    margin: 20,
    borderRadius: 30,
    backgroundColor: '#D50000',
  },
  avatar: {
    borderRadius: 100,
    borderColor: '#009688',
    borderWidth: 5,
    margin: 10,
    width: 200,
    height: 200
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    height: 100
  },
  title: {
    fontSize: 22,
    fontFamily: 'Avenir',
    color: 'white',
  },
});
