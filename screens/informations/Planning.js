import {Dimensions, Image, ImageBackground, StyleSheet, View} from "react-native";
import Colors from "../../constants/Colors";
import React from 'react';
import ScreenTitle from "../../components/ScreenTitle";
import PlusBlock from "../../components/blocks/PlusBlock";
import ImageZoom from "react-native-image-pan-zoom";

const { width, height } = Dimensions.get("window");

export function PlanningScreen({ showPlanning, rotated, setRotated}) {
  return(
    <View style={styles.container}>
      <ScreenTitle title="Planning">
        <PlusBlock icon="backspace" adminIcon="rotate-right" color={Colors.white}
                   isAdmin={true}
                   action={() => showPlanning(false)}
                adminAction={() => setRotated(!rotated)}
        />
      </ScreenTitle>
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
        <ImageZoom
          cropHeight={height}
          cropWidth={width}
          imageHeight={rotated ? 4000 : 2400}
          imageWidth={4000}
          minScale={0.1}
          maxScale={10}
          enableCenterFocus={false}
        >
          <ImageBackground style={[(rotated) ? styles.landscapeMap : styles.portraitMap]} source={require('../../assets/images/planning.png')} />
        </ImageZoom>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackgroud,
    padding: 5
  },
  contentContainer: {
    paddingTop: 30,
  },
  ContactList: {
    padding:15,
  },
  landscapeMap: {
    height:2400,
    width:4000,
    transform: [{ rotate: '90deg'}]
  },
  portraitMap: {
    height:2400,
    width:4000
  }
});