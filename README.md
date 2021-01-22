## Test Assignment: Middle ReactNative developer for GoodDollar (BugFix)

### QA
---
* **Q:** Would the component work on all platforms ? If no - please provide the corresponding fixes?
* **A:** No. Web - `window.addEventListener('blur', ...)` for listening `blur` browser event. Native - `AppState.addEventListener('change', ...)` for listening app state change ( switch off to other app, etc).
---
* **Q:** Why does the button click doesn’t have any effect ? And how to fix it ?
* **A:** Use `onPress` instead of `onClick`. Button does not have `onClick` prop. Alsa `toggleNotify()` don't have dependensy array, and it always have `notify = false` and sets it always to `true`.
---
* **Q:** What are 2 things missing in useEffect to make code more robust, correct, performant?
* **A:** Added an cancel hook which removes event listeners. Added dependensy array, for  not run on every render, but only to have an up-to-date link setNotify.

---
* **Q:** What else could be fixed, improved and/or simplified in the code ? 
* **A:** If we don't press `dismiss`, switch off to another app/browser tab , `toggle` will be called again and dismiss the notify. We define `dissmissNotification()` function with 'false' explicit value and define `showNotification()` function with 'true' explicit value for 'setNotify().
