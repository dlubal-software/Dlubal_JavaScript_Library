

include("../Supports/Linear/member/member_support_conditions.js");
include("../Supports/Linear/member/member_support_basic_types.js");
include("../Supports/Nonlinearities/nonlinearities.js");
//run("clearAll.js");



function MemberSupport(members,
                       no,
                       comment,
                       params)
{
  /**
  * Creates nodal support hight level function 

  * @param   {Array}   members       List of members
  * @param   {Number}  no            Index of member support, empty by default
  * @param   {String}  comment       Comment, empty by default
  * @param   {Object}  params        Nodal support parameters, empty by default
  */

  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  ASSERT(typeof members != undefined || typeof members != "number", "Nodes must be assigned as a list of numbers.");

  if (no === undefined) {
    var support = member_supports.create();	
    }
    else {
    	var support = member_supports.create(no);
	};
	// Create support
	this.support = support;
  this.support.members = members;
  // Create functions for support conditions
  this.nonlinear = new MemberSupportNonlinearities(support);
  set_comment_and_parameters(this.support, comment, params);
  console.log("MemberSupport " + support.no + " was created");
  // object for creation new supports with callback link to instance
  var self = this;
  this.create = new NewMemberSupport(false, self);
  return self;
};

MemberSupport.prototype.setNo = function(no) {
  // * @param   {Number}  no            Index of member support, empty by default
  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  this.support = member_supports[no];
}

MemberSupport.prototype.comment = function(intent) {
  this.support.comment = intent;
  return this.support;
}




