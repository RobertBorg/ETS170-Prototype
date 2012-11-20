Parties = new Meteor.Collection("parties"); //name
Candidates = new Meteor.Collection("candidates"); //name, party

if (Meteor.isClient) {

  Template.party_list.all = function () {
    return Parties.find();
  }

  Template.party_list.is_selected = function () {
    if(Session.get("selected_party") === this._id){
      return "party_selected";
    } else {
      return "";
    }
  }

  Template.party_list.events({
    'click ul.party_list>li' : function () {
      Session.set("selected_party",this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
