import * as React from "react"
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text } from 'native-base'
import { Icon } from 'react-native-elements'

const mainColor = '#01C89E';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  smsIcon: {
    color: 'gray',
    fontSize: 30,
  },
  smsRow: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  telIcon: {
    color: mainColor,
    fontSize: 30,
  },
  telNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  telNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  telRow: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const Tel = ({
               containerStyle,
               index,
               name,
               number,
             }) => {
  return (
    <TouchableOpacity>
      {/*<TouchableOpacity onPress={() => onPressTel(number)}>*/}
      <View style={[styles.container, containerStyle]}>
        <View style={styles.iconRow}>
          {+index === 0 && (
            <Icon
              name="call"
              underlayColor="transparent"
              iconStyle={styles.telIcon}
              // onPress={() => onPressTel(number)}
            />
          )}
        </View>
        <View style={styles.telRow}>
          <View style={styles.telNumberColumn}>
            <Text style={styles.telNumberText}>{number}</Text>
          </View>
          <View style={styles.telNameColumn}>
            {name.trim().length !== 0 && (
              <Text style={styles.telNameText}>{name}</Text>
            )}
          </View>
        </View>
        <View style={styles.smsRow}>
          <Icon
            name="textsms"
            underlayColor="transparent"
            iconStyle={styles.smsIcon}
            // onPress={() => onPressSms()}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
};

Tel.defaultProps = {
  containerStyle: {},
  name: null,
};

export default Tel