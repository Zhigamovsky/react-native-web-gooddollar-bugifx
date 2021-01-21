import React, {useState, useMemo, useEffect} from 'react';
import {StyleSheet, Text, AppState, Platform, Button, View} from 'react-native';

const _window = Platform.select({
  web: window,
  native: {
    addEventListener: () => {},
    removeEventListener: () => {},
  },
});

export const Test = () => {
  const [notify, setNotify] = useState(false);

  const notifyActions = useMemo(
    () => ({
      show: () => setNotify(true), // explicit 'true'
      hide: () => setNotify(false), // explicit 'false'
    }),
    [setNotify], // deps
  );

  useEffect(() => {
    // listener for subscriptions
    const listener = Platform.select({
      web: notifyActions.show, // just show notify
      native: appState => 'active' !== appState && notifyActions.show(), // check app state
    });

    // subscription
    Platform.select({
      web: _window.addEventListener('blur', listener), // for web - 'blur' event
      native: AppState.addEventListener('change', listener), // for native - change event with non 'active' state
    });

    // unsubscription
    return Platform.select({
      web: () => _window.removeEventListener('blur', listener), // for web - 'blur' event
      native: () => AppState.removeEventListener('change', listener), // for native - change event with non 'active' state
    });
  }, [notifyActions]); // deps

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
            onPress={notifyActions.hide} // onPress instead of onClick
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
