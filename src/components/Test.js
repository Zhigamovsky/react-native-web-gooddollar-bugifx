import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, AppState, Platform, Button, View} from 'react-native';

export const Test = () => {
  const [notify, setNotify] = useState(false);

  const dismissNotification = useCallback(() => setNotify(false), [setNotify]);

  useEffect(() => {
    const showNotification = () => setNotify(true);

    // listener for subscriptions
    const listener = Platform.select({
      web: showNotification, // just show notify
      native: appState => 'active' !== appState && showNotification(), // check app state
    });

    // subscription
    Platform.select({
      web: () => window.addEventListener('blur', listener),
      native: () => AppState.addEventListener('change', listener),
    })();

    // unsubscription
    return Platform.select({
      web: () => window.removeEventListener('blur', listener), // for web - 'blur' event
      native: () => AppState.removeEventListener('change', listener), // for native - change event with non 'active' state
    });
  }, [setNotify]); // deps

  return (
    <View style={styles.container}>
      {notify && (
        <View style={styles.notification}>
          <Text style={styles.label}>
            Don't forgot to save the changes Your did
          </Text>
          <Button
            style={styles.button}
            title="Dismiss"
            onPress={dismissNotification} // onPress instead of onClick
          />
        </View>
      )}
      <Text style={styles.label}>Some UI would be here...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {},
  notifiction: {},
  button: {},
});
