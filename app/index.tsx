import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../src/theme";

const features = [
  { icon: "◎", title: "Listen together", detail: "Join a shared music room and stay in sync." },
  { icon: "♫", title: "Friends are listening", detail: "Discover what your people have playing." },
  { icon: "▣", title: "Create together", detail: "Turn a song into a performance with friends." },
  { icon: "◉", title: "Live music", detail: "Find artists performing in real time." },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.wordmark}>TUNER</Text>
            <Text style={styles.tagline}>MUSIC IS BETTER TOGETHER.</Text>
          </View>
          <View style={styles.avatar}><Text style={styles.avatarText}>Y</Text></View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>YOUR MUSIC. YOUR PEOPLE.</Text>
          <Text style={styles.headline}>Hear it together.</Text>
          <Text style={styles.body}>A new way to listen, connect, and create around the music you love.</Text>
          <View style={styles.heroAction}>
            <Text style={styles.heroActionText}>Your first listening room is coming soon</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>THE TUNER EXPERIENCE</Text>
          <Text style={styles.sectionHint}>BUILT AROUND YOU</Text>
        </View>

        {features.map((item) => (
          <View key={item.title} style={styles.feature}>
            <View style={styles.featureIcon}><Text style={styles.featureIconText}>{item.icon}</Text></View>
            <View style={styles.featureCopy}>
              <Text style={styles.featureTitle}>{item.title}</Text>
              <Text style={styles.featureDetail}>{item.detail}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
        ))}

        <Text style={styles.footer}>LISTEN CLOSER. CREATE LOUDER.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: 48 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 34 },
  wordmark: { color: colors.text, fontSize: 28, fontWeight: "900", letterSpacing: 5 },
  tagline: { color: colors.muted, fontSize: 9, letterSpacing: 2, marginTop: 3 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  avatarText: { color: colors.text, fontWeight: "700" },
  hero: { padding: 22, borderRadius: 24, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, marginBottom: 32 },
  eyebrow: { color: colors.accent, fontSize: 10, letterSpacing: 2, fontWeight: "800", marginBottom: 14 },
  headline: { color: colors.text, fontSize: 34, lineHeight: 39, fontWeight: "800", letterSpacing: -1 },
  body: { color: colors.secondary, fontSize: 14, lineHeight: 21, marginTop: 12 },
  heroAction: { marginTop: 24, padding: 14, borderRadius: 13, backgroundColor: colors.accent },
  heroActionText: { color: "#101014", fontWeight: "800", fontSize: 13, textAlign: "center" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  sectionTitle: { color: colors.text, fontWeight: "800", fontSize: 12, letterSpacing: 1.4 },
  sectionHint: { color: colors.muted, fontSize: 9, letterSpacing: 1 },
  feature: { flexDirection: "row", alignItems: "center", paddingVertical: 17, borderBottomWidth: 1, borderBottomColor: colors.border },
  featureIcon: { width: 46, height: 46, borderRadius: 14, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", marginRight: 14 },
  featureIconText: { color: colors.accent, fontSize: 23 },
  featureCopy: { flex: 1 },
  featureTitle: { color: colors.text, fontSize: 15, fontWeight: "700" },
  featureDetail: { color: colors.muted, fontSize: 12, marginTop: 4, lineHeight: 17 },
  chevron: { color: colors.muted, fontSize: 25, paddingLeft: 8 },
  footer: { color: colors.muted, fontSize: 9, letterSpacing: 2, textAlign: "center", marginTop: 34 },
});
