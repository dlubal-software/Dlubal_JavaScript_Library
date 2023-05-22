function EnumValueFromJSHLFTypeName(type_name,
    type_name_description,
    enum_values,
    default_value) {
	if (type_name !== undefined) {
	  var type = enum_values[type_name];
	  if (type === undefined) {
		console.log("Wrong " + type_name_description + " type. Value was: " + type_name);
		console.log("Correct values are: " + Object.keys(enum_values));
		type = default_value;
	  }
	  return type;
	}
	else {
	  return default_value;
	}
}