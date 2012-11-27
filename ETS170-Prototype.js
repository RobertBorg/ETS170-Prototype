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
    return Parties.find();
  }

  Template.party_list_entry.is_selected = function () {
    if(Session.get("selected_party") !== undefined && Session.get("selected_party")._id == this._id){
      return "party_selected";
    } else {
      return "";
    }
  }

  Template.candidate_list.current_party = function () {
    return Session.get("selected_party");
  }

  Template.candidate_list.if_empty = function() {
    if()
  }

  Template.selected_party.selected = function() {
      if(Session.get("selected_party") !== undefined ){
        return Session.get("selected_party")["name"];
    } else {
        return "";
    }
  }

  Template.if_party_selected.selected_string = function() {
      if(Session.get("selected_party") !== undefined ){
          return "Du får bara markera en av dessa <b>anmälda</b> kandidater.";
      }
  }

  Template.selected_candidate.selected = function() {
    if(Session.get("selected_candidate") !== undefined){
      return Session.get("selected_candidate")["name"];
    }
  }

  Template.candidate_list_entry.events({
    'click input[name="candidateRadios"]' : function () {
      Session.set("selected_candidate",this);
    }
  });

  Template.party_list_entry.events({
    'click a.party-list-entry' : function () {
      Session.set("selected_party",this);
    }
  });

  Template.vote_button.events({
    'click #log-out-btn' : function () {
      Session.set("loggedIn",false);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
