// object support conditions contains set of fuctions which will be used in all types of suppports
// Access to theese functions is though supportObject.conditions.function()
// ex. f


function CreateSpringConstant(spring) {
  var spring_constant = nodal_supports["SPRING_CONSTANT_NO"];

  if (spring === true) {
    spring_constant = nodal_supports["SPRING_CONSTANT_YES"];
  };
return spring_constant;
};


function CreateSpring(spring) {
	if (spring === true || spring === false){
      return CreateSpringConstant(spring);
    }
    else {
      return spring;
    };
};


function CreateSpringVector(x, y, z) {
  var spring_vector = [x, y, z];
  var spring_vector_new = [0,0,0];
  spring_vector.forEach(function (spring, index) {
      spring_vector_new[index] = CreateSpring(spring);
  });
  return $V(spring_vector_new[0], spring_vector_new[1], spring_vector_new[2]);
};


function CheckIfNonlinearityCanBeSet(support_constant, support_name, nonlinearity_type) {
  console.log(support_constant);
  if (support_constant === "SPRING_CONSTANT_NO") {
    console.log("Change support " + support_name +" to fixed or elastic to allow ' " + nonlinearity_type + " ...' nonlinearity.");
    return false;
  }
  else {
    return true;
  };
};











