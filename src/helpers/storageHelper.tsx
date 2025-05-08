export const setSessionValue = (key: string, value: any): void => {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error al guardar el valor en sessionStorage:", error);
  }
};

export const getSessionValue = (key: string): string | null => {
  try {
    const item = sessionStorage.getItem(key);
    if (item === null) return null;
    const value = JSON.parse(item);

    return value;
  } catch (error) {
    console.error("Error al obtener el valor de sessionStorage:", error);
    return null;
  }
};

export const removeSessionValue = (key: string): void => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error("Error al eliminar el valor en sessionStorage:", error);
  }
};
