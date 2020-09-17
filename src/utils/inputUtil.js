export function extractError(errors, name) {
  if (Array.isArray(name)) {
    // let msg = 
    for (let i = 0; i < name.length; i++) {
      if (errors[name[i]]) {
        return errors[name[i]][0]
      }
    }
    return "";
  }
  else {
    if (errors[name]) {
      return errors[name][0]
    }
    return "";
  }
}