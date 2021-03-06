import names from "./names";
import { ipcRenderer } from "electron";

/**
 * Senders
 */
function sendInstallMutation(pkg) {
  ipcRenderer.send(names.INSTALL_MUTATION, pkg);
}

function sendGetPreferences() {
  ipcRenderer.send(names.GET_PREFERENCES);
}

/**
 * Listeners
 */
function onChangeScreen(then) {
  return ipcRenderer.on(names.CHANGE_SCREEN, then);
}

function onMutationInstalled(then) {
  return ipcRenderer.on(names.INSTALL_MUTATION_REPLY, then);
}

function onGetPreferences(then) {
  return ipcRenderer.on(names.RETURN_GET_PREFERENCES, then);
}

export default {
  onChangeScreen,
  onMutationInstalled,
  sendInstallMutation,
  sendGetPreferences,
  onGetPreferences
};
