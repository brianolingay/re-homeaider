import * as React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "native-base";
import { Icon } from "react-native-elements";

const mainColor = "#01C89E";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 25,
  },
  iconRow: {
    flex: 2,
    justifyContent: "center",
  },
  smsIcon: {
    color: "gray",
    fontSize: 30,
  },
  smsRow: {
    flex: 2,
    justifyContent: "flex-start",
  },
  infoIcon: {
    color: mainColor,
    fontSize: 30,
  },
  infoNoteColumn: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  infoNoteText: {
    color: "gray",
    fontSize: 14,
    fontWeight: "200",
  },
  infoValueeColumn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  infoValueText: {
    fontSize: 16,
  },
  infRow: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "center",
  },
});

const MyInfo = ({ containerStyle, icon, note, value }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconRow}>
        {icon && (
          <Icon
            name={icon.name}
            underlayColor="transparent"
            iconStyle={styles.infoIcon}
          />
        )}
      </View>
      <View style={styles.infRow}>
        <View style={styles.infoValueeColumn}>
          <Text style={styles.infoValueText}>{value}</Text>
        </View>
        <View style={styles.infoNoteColumn}>
          {note.trim().length !== 0 && (
            <Text style={styles.infoNoteText}>{note}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default MyInfo;
