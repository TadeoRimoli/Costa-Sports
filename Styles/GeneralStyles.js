import { StyleSheet } from 'react-native';

export const Colors = {
  // PALETA 1
  softDarkPurple: '#ADBDDE',
  softLightPurple: '#BCADDE',
  softPurple: '#ADAEDE',
  softSkyBlue: '#ADCDDE',
  softPink: '#CCADDE',

  // PALETA 2
  background1: '#77E0D7',
  background2: '#77A6E0',
  background3: '#76C8E0',
  background4: '#77E0B3',
  background5: '#7785E0',
  green: '#6BB17B',
  Orange: '#CF906D',
  backgroundError:'#FADBD8',
  error:'#DF4B4E'
};

export const GeneralStyle = StyleSheet.create({
  // Utiliza los colores del objeto Colors
  flex1:{
    flex:1
  }
  ,row:{
    flexDirection:'row'
  },
  justifyBetween:{
    justifyContent:'space-between'
  },
  itemsCenter:{
    alignItems:'center'
  },
  padding16:{
    padding:16
  },
  padding8:{
    padding:8
  },
  softDarkPurple: {
    backgroundColor: Colors.softDarkPurple,
  },
  softLightPurple: {
    backgroundColor: Colors.softLightPurple,
  },
  softPurple: {
    backgroundColor: Colors.softPurple,
  },
  softSkyBlue: {
    backgroundColor: Colors.softSkyBlue,
  },
  softPink: {
    backgroundColor: Colors.softPink,
  },

  background1: {
    backgroundColor: Colors.background1,
  },
  background2: {
    backgroundColor: Colors.background2,
  },
  background3: {
    backgroundColor: Colors.background3,
  },
  background4: {
    backgroundColor: Colors.background4,
  },
  background5: {
    backgroundColor: Colors.background5,
  },
});
export const FontSizeStyles = StyleSheet.create({
    fontSize16: {
      fontSize: 16,
    },
    fontSize18: {
      fontSize: 18,
    },
    fontSize20: {
      fontSize: 20,
    },
    fontSize22: {
      fontSize: 22,
    },
    fontSize24: {
      fontSize: 24,
    },
    fontSize26: {
      fontSize: 26,
    },
    fontSize28: {
      fontSize: 28,
    },
    fontSize30: {
      fontSize: 30,
    },
    fontSize32: {
      fontSize: 32,
    },
  });
  
  export const MarginDirectionStyles = StyleSheet.create({
    margin5: {
      margin: 5,
    },
    marginTop5: {
      marginTop: 5,
    },
    marginTop10: {
      marginTop: 10,
    },
    marginTop15: {
      marginTop: 15,
    },
    marginTop20: {
      marginTop: 20,
    },
    marginBottom5: {
      marginBottom: 5,
    },
    marginBottom10: {
      marginBottom: 10,
    },
    marginBottom15: {
      marginBottom: 15,
    },
    marginBottom20: {
      marginBottom: 20,
    },
    marginLeft5: {
      marginLeft: 5,
    },
    marginLeft10: {
      marginLeft: 10,
    },
    marginLeft15: {
      marginLeft: 15,
    },
    marginLeft20: {
      marginLeft: 20,
    },
    marginRight5: {
      marginRight: 5,
    },
    marginRight10: {
      marginRight: 10,
    },
    marginRight15: {
      marginRight: 15,
    },
    marginRight20: {
      marginRight: 20,
    },
    marginHorizontal5: {
      marginHorizontal: 5,
    },
    marginHorizontal10: {
      marginHorizontal: 10,
    },
    marginHorizontal15: {
      marginHorizontal: 15,
    },
    marginHorizontal20: {
      marginHorizontal: 20,
    },
    marginVertical5: {
      marginVertical: 5,
    },
    marginVertical10: {
      marginVertical: 10,
    },
    marginVertical15: {
      marginVertical: 15,
    },
    marginVertical20: {
      marginVertical: 20,
    },
  });