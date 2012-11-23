Parties = new Meteor.Collection("parties"); //name candidates {name, priority[1..] 1 highest priority}

var index = 0;

if (Meteor.isClient) {
  Template.party_list.all = function () {
    return Parties.find();
  }

  Template.party_list_entry.is_selected = function () {
    if(Session.get("selected_party") !== undefined && Session.get("selected_party")._id == this._id){
      return "party_selected";
    } else {
      return "";
    }
  }

  Template.party_list.for_loop_number = function() {
      if(index == 0) {
        document.write("<div class=\"row-fluid\">");
      }
      if(index == 3) {
        document.write("</div><!--/row-->");
        index = 0;
      }
      index++;
  }

  Template.party_list_entry.events({
    'click li' : function () {
      Session.set("selected_party",this);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
