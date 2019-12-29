import * as Permissions from "expo-permissions";

export const askPermission = async (permission) => {
  const { status } = await Permissions.askAsync(Permissions[permission]);
  if(status !== 'granted') {
    return false;
  }
  return true;
}

export const getPermission = async (permission) => {
  const { status } = await Permissions.getAsync(Permissions[permission])
  if(status !== 'granted') {
    return askPermission(permission);
  }
  return true;
};
