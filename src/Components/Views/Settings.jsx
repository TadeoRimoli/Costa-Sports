import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { AppColors } from '../../Styles/GeneralStyles';

const SettingsScreen = () => {
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(false);
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);
  const [liveNotificationsEnabled, setLiveNotificationsEnabled] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: AppColors.footerBackground }]}>
  <View style={styles.settingContainer}>
    <Text style={[styles.settingText, { color: AppColors.white }]}>Push Notifications</Text>
    <Switch
      value={pushNotificationsEnabled}
      onValueChange={(newValue) => setPushNotificationsEnabled(newValue)}
    />
  </View>
  <View style={styles.settingContainer}>
    <Text style={[styles.settingText, { color: AppColors.white }]}>Email Notifications</Text>
    <Switch
      value={emailNotificationsEnabled}
      onValueChange={(newValue) => setEmailNotificationsEnabled(newValue)}
    />
  </View>
  <View style={styles.settingContainer}>
    <Text style={[styles.settingText, { color: AppColors.white }]}>Dark Theme</Text>
    <Switch
      value={darkThemeEnabled}
      onValueChange={(newValue) => setDarkThemeEnabled(newValue)}
    />
  </View>
  <View style={styles.settingContainer}>
    <Text style={[styles.settingText, { color: AppColors.white }]}>Live Notifications</Text>
    <Switch
      value={liveNotificationsEnabled}
      onValueChange={(newValue) => setLiveNotificationsEnabled(newValue)}
    />
  </View>
</View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 16,
  },
});

export default SettingsScreen;
