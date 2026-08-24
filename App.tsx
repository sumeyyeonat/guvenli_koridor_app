import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function App() {
  const [permission, requestPermission] = Location.useForegroundPermissions();
  const [isRequesting, setIsRequesting] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsNightMode(hour >= 19 || hour < 6);
  }, []);

  const colors = isNightMode ? nightColors : dayColors;
  const permissionGranted = permission?.granted === true;
  const permissionBlocked = permission?.canAskAgain === false && !permissionGranted;

  async function handleLocationPermission() {
    if (permissionBlocked) {
      await Linking.openSettings();
      return;
    }

    setIsRequesting(true);
    await requestPermission();
    setIsRequesting(false);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isNightMode ? 'light' : 'dark'} />
      <View style={styles.content}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>GECE GÜVENLİ ULAŞIM</Text>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Güvenli Koridor</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>Seni eve güvenle götürüyoruz.</Text>

        <View style={[styles.permissionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Konumunu kullanalım</Text>
          <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
            Sana bulunduğun noktaya göre daha aydınlık ve canlı rotalar önerebilmemiz için konum iznine ihtiyacımız var.
          </Text>

          {permissionGranted ? (
            <View style={styles.grantedMessage}>
              <Text style={styles.grantedIcon}>✓</Text>
              <Text style={[styles.grantedText, { color: colors.secondary }]}>Konum izni hazır</Text>
            </View>
          ) : (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Konum izni ver"
              disabled={isRequesting}
              onPress={handleLocationPermission}
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: colors.primary, opacity: pressed || isRequesting ? 0.78 : 1 },
              ]}
            >
              {isRequesting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>{permissionBlocked ? 'Ayarları aç' : 'Konum izni ver'}</Text>
              )}
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 18,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 23,
    marginTop: 12,
    textAlign: 'center',
  },
  permissionCard: {
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 36,
    padding: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    borderRadius: 8,
    minHeight: 48,
    justifyContent: 'center',
    marginTop: 22,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  grantedMessage: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 22,
  },
  grantedIcon: {
    color: '#22C55E',
    fontSize: 20,
    fontWeight: '700',
  },
  grantedText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

const dayColors = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  primary: '#2563EB',
  secondary: '#22C55E',
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  border: '#E2E8F0',
};

const nightColors = {
  background: '#0B1120',
  surface: '#161E2E',
  primary: '#38BDF8',
  secondary: '#4ADE80',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#1E293B',
};
