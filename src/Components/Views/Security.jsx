import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const SecurityScreen = () => {
  const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);
  const [biometricAuthEnabled, setBiometricAuthEnabled] = useState(false);
  const [passcodeEnabled, setPasscodeEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>Two-factor Authentication</Text>
        <Switch
          value={twoFactorAuthEnabled}
          onValueChange={(newValue) => setTwoFactorAuthEnabled(newValue)}
        />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>Biometric Authentication</Text>
        <Switch
          value={biometricAuthEnabled}
          onValueChange={(newValue) => setBiometricAuthEnabled(newValue)}
        />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>Passcode Protection</Text>
        <Switch
          value={passcodeEnabled}
          onValueChange={(newValue) => setPasscodeEnabled(newValue)}
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

export default SecurityScreen;
