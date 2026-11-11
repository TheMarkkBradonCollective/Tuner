import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../../src/theme";

export default function Screen() {
  return <SafeAreaView style={styles.safe}><View style={styles.content}>
    <Text style={styles.kicker}>YOUR TUNER IDENTITY</Text>
    <Text style={styles.title}>Your profile</Text>
    <Text style={styles.copy}>Your music taste, performances, friends, and listening history in one place.</Text>
    <View style={styles.empty}><Text style={styles.symbol}>◌</Text><Text style={styles.emptyTitle}>Make TUNER yours</Text><Text style={styles.emptyCopy}>Account setup, profile editing, privacy, and listening history will arrive with authentication.</Text></View>
  </View></SafeAreaView>;
}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:colors.background},content:{padding:spacing.lg},kicker:{color:colors.accent,fontSize:10,fontWeight:"800",letterSpacing:2,marginTop:18},title:{color:colors.text,fontSize:30,fontWeight:"800",marginTop:10},copy:{color:colors.secondary,fontSize:14,lineHeight:21,marginTop:8},empty:{marginTop:42,padding:24,borderRadius:20,backgroundColor:colors.surface,borderColor:colors.border,borderWidth:1,alignItems:"center"},symbol:{color:colors.accent,fontSize:38},emptyTitle:{color:colors.text,fontSize:17,fontWeight:"700",marginTop:12},emptyCopy:{color:colors.muted,fontSize:12,lineHeight:18,textAlign:"center",marginTop:8}});