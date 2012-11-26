Parties = new Meteor.Collection("parties"); //name candidates {name, priority[1..] 1 highest priority}

var index = 0;

if (Meteor.isClient) {
  Handlebars.registerHelper('fluid_grid', function(context, block) {
    var ret = "";

    for(var i=0, j=context.length; i<j; i++) {
      if(i % 3 == 0){
        ret = ret + '<div class="row-fluid">';
      }
      
      ret = ret + block(context[i]);

      if(i % 3 == 2){
        ret = ret + "</div>";
      }
    }

    return ret;
  });

  Template.party_list.all = function () {
    return Parties.find().fetch();
  }

  Template.party_list_entry.is_selected = function () {
    if(Session.get("selected_party") !== undefined && Session.get("selected_party")._id == this._id){
      return "party_selected";
    } else {
      return "";
    }
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
