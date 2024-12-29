export const booleanToString = (value: boolean): "True" | "False" => 
    value ? "True" : "False";
  
  export const stringToBoolean = (value: "True" | "False"): boolean =>
    value === "True";
  
  export const getDefaultValue = (type: string): string => {
    switch (type) {
      case "2": // Number
      case "3": // Decimal
        return "0";
      case "4": // DateTime
        return new Date().toISOString();
      default:
        return "";
    }
  };
  
  export const validateNumberInput = (value: string, min: string, max: string): boolean => {
    const num = Number(value);
    return !isNaN(num) && num >= Number(min) && num <= Number(max);
  };