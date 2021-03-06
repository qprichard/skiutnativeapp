import React from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text
} from "react-native";
import {
  Icon
} from "react-native-elements";
import * as  Picker from "expo-image-picker";
import { getPermission, askPermission } from "../../utils/permissions";
import Colors from "../../constants/Colors";
import Sizes from "../../constants/Sizes";
import normalize from 'react-native-normalize';


const handlePermission = async (permissionType) => {
  const permission = await getPermission(permissionType);

  if(permission === false) {
    await askPermission(permissionType);
    return
  }
}

const ImagePicker = ({setData=null, data=null, param = 'image'}) => {
  const [image, setImage] = React.useState(null);

  const handleSet = React.useCallback((result) => {
    setImage(result);
    if(data && setData) {
      setData({...data, [param]: result })
    }
  }, [data, setData, param, setImage])

  const _pickImage = async () => {

    await handlePermission('CAMERA_ROLL');
    await handlePermission('CAMERA');
    
    const result = await Picker.launchImageLibraryAsync({
      mediaTypes: Picker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });
    handleSet(result);
  }

  if(image && image.uri) {
    return (
      <View style={styles.container}>
        <ImageBackground source = {{uri: image.uri}} style={{ height: normalize(110, 'height'), width: normalize(130, 'width')}} >
          <TouchableOpacity onPress = { () => handleSet(null) } style={styles.crossContainer}>
            <Icon name="clear" color={Colors.white}/>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress = {_pickImage} style={ styles.container }>
        <View style={styles.pickerView}>
          <Icon name='folder' color={ Colors.tintColor }/>
          <Text style={styles.text}>Ajouter une image</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.darkGrey,
    fontWeight: 'bold',
    fontSize: Sizes.default,
  },
  crossContainer: {
    flexDirection: 'row-reverse',
  },
})

export default ImagePicker;
