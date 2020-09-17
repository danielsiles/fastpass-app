export const enumToText = (enumeration) => {
  switch (enumeration) {
    case "RESTAURANT":
      return "Restaurante"
    case "BANK":
      return "Banco"
    case "POST_OFFICE":
      return "Correio"
    default:
      return ""
  }
}