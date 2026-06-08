import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { GBBigButton } from "../../../ReusableComponents/GBBigButton";
import CancelChangesButton from "../../../ReusableComponents/CancelChangesButton";
import { RootStackParamList } from "../../../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Spacer from "../../../ReusableComponents/Spacer";
import { Icon } from "../../../../Icons";

export default function ExerciseEditPage() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <TextInput style={[styles.editArea, styles.titleEditText]}>
        PULL UPS
      </TextInput>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 24,
          marginBottom: 24,
        }}
      >
        <TouchableOpacity
          style={{ backgroundColor: "#FBAF00", borderRadius: 45, padding: 8 }}
        >
          <Icon name="arrowLeft" fill={"#ffffff"} width={24} height={24} />
        </TouchableOpacity>
        <View>
          <Image
            source={require("../../../../assets/placeholder_images/exercise_image.png")}
            style={{ borderRadius: 12 }}
          ></Image>

          <TouchableOpacity
            style={{
              position: "absolute",
              top: 8,
              left: 16,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#EFF1F3",
              backgroundColor: "#FBAF00",
              width: 36,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="star" fill={"#322214"} width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 8,
              right: 16,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#EFF1F3",
              backgroundColor: "#E03616",
              width: 36,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="delete" fill={"#EFF1F3"} width={24} height={24} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: "#FBAF00", borderRadius: 45, padding: 8 }}
        >
          <Icon name="arrowRight" fill={"#ffffff"} width={24} height={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 16,
          marginHorizontal: 24,
        }}
      >
        <Icon
          name="add"
          fill={"#FBAF00"}
          width={24}
          height={24}
          style={{ marginRight: 4 }}
        />

        <Text
          style={{
            fontSize: 24,
            fontFamily: "BigShoulders-Bold",
            color: "#FBAF00",
          }}
        >
          Add Media
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.editArea,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="sports"
            fill={"#FFFFFF"}
            width={24}
            height={24}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.bodyPartsText}>BODY PARTS</Text>
        </View>
        <Text style={styles.descEditText}>Triceps</Text>
      </TouchableOpacity>

      <TextInput
        style={[styles.editArea, styles.descEditText]}
        multiline={true}
      >
        Pull ups are a great exercise for building upper body strength,
        particularly targeting the back muscles. To perform a pull up, grip the
        bar with your hands slightly wider than shoulder-width apart, and pull
        your body up until your chin is above the bar. Lower yourself back down
        with control and repeat for the desired number of repetitions.
      </TextInput>
      <Spacer />
      <View style={[styles.bottomRow]}>
        <CancelChangesButton
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={{ width: 16 }} />
        <GBBigButton
          bgColor="#FBAF00"
          icon={<Icon name="editOff" fill={"#322214"} />}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#111111",
  },
  editArea: {
    backgroundColor: "#242423",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#EFF1F3",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  titleEditText: {
    fontSize: 18,
    fontFamily: "ChakraPetch-Regular",
    color: "#EFF1F3",
    marginTop: 48,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  bodyPartsText: {
    fontSize: 20,
    fontFamily: "ChakraPetch-Bold",
    color: "#FFFFFF",
  },
  descEditText: {
    fontSize: 16,
    fontFamily: "ChakraPetch-Regular",
    color: "#EFF1F3",
  },
  bottomRow: {
    marginHorizontal: 24,
    marginBottom: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
