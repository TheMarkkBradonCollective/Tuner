import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../../src/theme";

const tiles = [
  { icon: "◉", title: "Live music", subtitle: "Performances and artist rooms" },
  { icon: "♫", title: "Made by your friends", subtitle: "Videos and moments from your circle" },
  { icon: "◎", title: "Find your room", subtitle: "Listen to the same track together" },
];

export default function DiscoverScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brand}>TUNER</Text>
        <Text style={styles.kicker}>YOUR SOUND. YOUR SCENE.</Text>
        <Text style={styles.heading}>Discover</Text>
        <Text style={styles.subheading}>Find music, people, and moments worth sharing.</Text>
        <View style={styles.hero}>
          <Text style={styles.heroKicker}>THE NEXT TRACK IS BETTER TOGETHER</Text>
          <Text style={styles.heroTitle}>Music brings us closer.</Text>
          <Text style={styles.heroBody}>Join a listening room, catch a live set, or see what your friends are creating.</Text>
        </View>
        <Text style={styles.section}>EXPLORE TUNER</Text>
        {tiles.map((tile) => <View key={tile.title} style={styles.tile}>
          <Text style={styles.tileIcon}>{tile.icon}</Text>
          <View style={styles.tileText}><Text style={styles.tileTitle}>{tile.title}</Text><Text style={styles.tileSubtitle}>{tile.subtitle}</Text></View>
          <Text style={styles.arrow}>›</Text>
        </View>)}
        <Text style={styles.note}>Your personalized music world starts here.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:colors.background}, content:{padding:spacing.lg,paddingBottom:40},
  brand:{color:colors.text,fontSize:27,fontWeight:"900",letterSpacing:5},
  kicker:{color:colors.muted,fontSize:9,letterSpacing:2,marginTop:3,marginBottom:30},
  heading:{color:colors.text,fontSize:32,fontWeight:"800"},
  subheading:{color:colors.secondary,fontSize:14,lineHeight:21,marginTop:6,marginBottom:22},
  hero:{backgroundColor:colors.surface,borderColor:colors.border,borderWidth:1,borderRadius:22,padding:22,marginBottom:30},
  heroKicker:{color:colors.accent,fontSize:9,fontWeight:"800",letterSpacing:1.5},
  heroTitle:{color:colors.text,fontSize:27,fontWeight:"800",marginTop:12},
  heroBody:{color:colors.secondary,fontSize:13,lineHeight:20,marginTop:8},
  section:{color:colors.muted,fontSize:10,fontWeight:"800",letterSpacing:1.5,marginBottom:10},
  tile:{flexDirection:"row",alignItems:"center",paddingVertical:17,borderBottomColor:colors.border,borderBottomWidth:1},
  tileIcon:{color:colors.accent,fontSize:25,width:44},tileText:{flex:1},
  tileTitle:{color:colors.text,fontSize:15,fontWeight:"700"},tileSubtitle:{color:colors.muted,fontSize:12,marginTop:4},
  arrow:{color:colors.muted,fontSize:25},note:{color:colors.muted,fontSize:11,textAlign:"center",marginTop:28}
});
