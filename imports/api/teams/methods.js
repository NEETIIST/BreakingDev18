import { Teams } from './teams.js';
import { Devs } from '/imports/api/devs/devs.js';

Meteor.methods({

	// To-Do: Teams can't be edited after validation

	createTeam: function(doc){

		let user = Meteor.users.findOne({"_id":this.userId});
		let dev = Devs.findOne({"user":this.userId});

		// User must be a Dev
		if ( ! Roles.userIsInRole(this.userId, "dev") )
			throw new Meteor.Error('not-dev', "User is not a dev, can't create this type of profile");
		// User must be have a profile
		if ( dev == undefined )
			throw new Meteor.Error('no-profile', "User doesn't have a profile yet");
		// Current user must not be on a team already
		else if ( dev.team != null )
			throw new Meteor.Error('already-on-team', "User already is on a team, can't create another one");
		else
		{
			doc.number = parseInt(Teams.find().count()+1);
			doc.captain = this.userId;
			doc.validated = false;
			doc.pending = false;
			doc.registration = null;
			doc.members = [];
			doc.abandoned = false;
			doc.password = generateNewPassword();
			let newTeam = Teams.insert(doc);
			
			// Associate Captain with this team
			Devs.update(dev._id, {'$set':{ team: newTeam }} );

			console.log("Created team #" + doc.number + " , by the user: "+doc.captain);
		}
	},

	disableTeam: function()
	{
		let user = Meteor.users.findOne({"_id":this.userId});
		let dev = Devs.findOne({"user":this.userId});
		let team = Teams.findOne({"captain": this.userId, "abandoned":false});

		// User must have a profile
		if ( dev == undefined )
			throw new Meteor.Error('no-profile', "User doesn't have a profile yet");
		// User must be the captain of the team
			// This is assured by finding the team the user belongs to, if none, it's not captain
			if ( team == undefined )
				throw new Meteor.Error('not-captain', "User is not a team captain");
		// Team must be empty of members
		if ( team.members.length != 0)
			throw new Meteor.Error('team-not-empty', "Team still has other users");
		else
		{
			// Dissociate team from the user 
			Devs.update(dev._id, {'$set':{ team: null }} );
			// Disable Team
			Teams.update(team._id,{'$set':{abandoned:true}});
			console.log("Disabled team: " +team._id);
		}
	},

	editTeam: function(doc)
	{
		let team = Teams.findOne({"_id":doc._id});
		//console.log(doc.modifier);
		// User must own the profile it's updating
		if ( this.userId != team.captain )
			throw new Meteor.Error('not-captain', "User is not the team captain");
		// Team must not be validated or pending
		if ( team.validated == true || team.pending == true)
			throw new Meteor.Error('team-already-signup', "Team already is up for validation or validated already, you can't join");
		
		Teams.update(doc._id,doc.modifier);
	},

	joinTeam: function( pass )
	{
		// Password already uniquely identifies the team, so the user only needs a correct password to join a team
		let team = Teams.findOne({"password": pass});
		let dev = Devs.findOne({"user":this.userId});

		// User must have a profile
		if ( dev == undefined )
			throw new Meteor.Error('no-profile', "User doesn't have a profile yet");
		// User must not be in a team already
		if ( dev.team != null )
			throw new Meteor.Error('already-on-team', "User already is on a team, can't join another one");
		// Password must match to a team
		if ( team == undefined )
			throw new Meteor.Error('wrong-password', "That password doesn't match any team");
		// Team must not be full
		if ( team.members.length >= 3)
			throw new Meteor.Error('team-full', "Team is already full");
		// Team must not be validated or pending
		if ( team.validated == true || team.pending == true)
			throw new Meteor.Error('team-already-signup', "Team already is up for validation or validated already, you can't join");
		// Team must not be abandoned
		if ( team.abandoned == true)
			throw new Meteor.Error('team-not-exist', "Team no longer exists");

		let newMembers = team.members ;
		newMembers.push(this.userId);
		Teams.update(team._id,{'$set':{members:newMembers}});
		
		// Associate user with this team
		Devs.update(dev._id, {'$set':{ team: team._id }} );
	},

	leaveTeam: function(){
		// Find Team the user belongs, if not found, it's not in a team
		let team = Teams.findOne({"members": this.userId});
		let dev = Devs.findOne({"user":this.userId});

		// User must have a profile
		if ( dev == undefined )
			throw new Meteor.Error('no-profile', "User doesn't have a profile yet");
		// User Can't be the captain
		if ( team.captain == this.userId )
			throw new Meteor.Error('captain-cant-leave', "The team captain can't leave the team");
		// Team must not be validated or pending
		if ( team.validated == true || team.pending == true)
			throw new Meteor.Error('team-already-signup', "Team already is up for validation or validated already, you can't join");
		// Team must not be abandoned
		if ( team.abandoned == true)
			throw new Meteor.Error('team-not-exist', "Team no longer exists");

		let newMembers = team.members ;
		var search_term = this.userId;
		for (var i=newMembers.length-1; i>=0; i--) {
			if (newMembers[i] === search_term) {
			    newMembers.splice(i, 1);
			}
		}
		Teams.update(team._id,{'$set':{members:newMembers}});
		// Associate user with this team
		Devs.update(dev._id, {'$set':{ team: null }} );
	},

	inviteToOwnTeam: function(mail){

		let user = Meteor.users.findOne({"_id":this.userId});
		let dev = Devs.findOne({"user":this.userId});
		let team = Teams.findOne({"captain": this.userId, "abandoned":false});

		// User must have a profile
		if ( dev == undefined )
			throw new Meteor.Error('no-profile', "User doesn't have a profile yet");
		// User must be the captain of the team
		// This is assured by finding the team the user belongs to, if none, it's not the captain
		if ( team == undefined )
			throw new Meteor.Error('not-captain', "User is not a team captain");
		// Team must not be full
		if ( team.members.length >= 3)
			throw new Meteor.Error('team-full', "Team is already full");

		this.unblock();

		let userMail = user.emails[0].address;
		let userName = dev.name;
		let userTeam = team.team_name;
		let rootLink = process.env.ROOT_URL ;
		let teamLink = process.env.ROOT_URL + "dashboard/dev/team/join/"+ team.number;
		let teamPassword =  team.password;

        Email.send({
            to: mail,
            from: "noreply@breakingdev.pt",
            subject: "BreakingDev - Convite para equipa",
            html: "Olá!<br>Este email está a ser enviado em nome do "+ userName + " ( "+ userMail + " ),"+
            	  " e é um convite para te juntares à equipa <strong>"+ userTeam +"</strong> no BreakingDev!<br><br>"+
            	  "Se ainda não tiveres conta criada no nosso site, podes criar em: <a href='"+
            	  rootLink+"signup' target='_blank'>"+rootLink+"signup</a><br><br>"+
            	  "Se já tiveres uma conta criada e com a informação de perfil preenchida, basta acederes a: "+
            	  "<a href='"+teamLink+"' target='_blank'>"+teamLink+"</a> e usares a seguinte password: <strong>"+
            	  teamPassword+"</strong> .<br><br>Se tiveres alguma duvida envia nos um email para: "+
            	  "<a href='mailto:breakingdev@neeti.tecnico.ulisboa.pt' target='_blank'>breakingdev@neeti.tecnico.ulisboa.pt</a>."  ,
        });        

	},

	applyToTeam: function(number){

		let user = Meteor.users.findOne({"_id":this.userId});
		let dev = Devs.findOne({"user":this.userId});
		let team = Teams.findOne({"number": number, "abandoned":false});

		// User must have a profile
		if ( dev == undefined )
			throw new Meteor.Error('no-profile', "User doesn't have a profile yet");
		// User must not have a team
		if ( dev.team != undefined )
			throw new Meteor.Error('already-on-team', "User already has a team");
		// Team must exist
		if ( team == undefined )
			throw new Meteor.Error('team-not-exist', "Team no longer exists");
		// Team must not be full
		if ( team.members.length >= 3)
			throw new Meteor.Error('team-full', "Team is already full");
		// Team must not be validated or pending
		if ( team.validated == true || team.pending == true)
			throw new Meteor.Error('team-already-signup', "Team already is up for validation or validated already, you can't join");

		this.unblock();

		let targetUser = Meteor.users.findOne({"_id":team.captain});
		let targetMail = targetUser.emails[0].address;

		let requestingMail = user.emails[0].address;
		let requestingUrl = process.env.ROOT_URL+"dev/"+user.username ;

        Email.send({
            to: targetMail,
            from: requestingMail,
            subject: "BreakingDev - Pedido para aderir à tua equipa",
            html: "Olá!<br><br>Estás a receber este email porque és capitão da equipa <strong>"+team.team_name+"</strong> no BreakingDev.<br>"+
            "O utilizador <strong>"+user.username+"</strong> gostava de fazer parte da tua equipa. A escolha é tua, e se precisares de mais informações, basta responderes a este email e falar diretamente com o <strong>"+dev.name+"</strong>.<br><br>"+
            "Podes visitar o perfil com todas as informações aqui: <a href='"+requestingUrl+"' target='_blank'>"+requestingUrl+"</a> ."  ,
        });
    },

    signupTeam: function(){
    	// Captain makes own team pending
    	//let user = Meteor.users.findOne({"_id":this.userId});
		//let dev = Devs.findOne({"user":this.userId});
		let team = Teams.findOne({"captain": this.userId, "abandoned":false});

		// User must be the team captain
		if ( team == undefined )
			throw new Meteor.Error('not-captain', "User isn't a team captain");
		// Team have at least two members (Captain already counts as one)
		else if ( team.members.length == 0)
			throw new Meteor.Error('team-empty', "Team doesn't have at least two members");
		// Team must have less than 4 members (Captain already counts as one)
		else if ( team.members.length > 3 )
			throw new Meteor.Error('team-overfilled', "Team has too many members");
		// Team must not be validated or pending already
		else if ( team.validated == true || team.pending == true)
			throw new Meteor.Error('team-already-signup', "Team already is up for validation or validated already, you can't do it again");
		else
		{
			var date = new Date();
			Teams.update(team._id,{'$set':{pending:true,registration:date}});
		}
    },

    validateTeam: function(number){

    	if (Roles.userIsInRole(this.userId, "staff"))
    	{
    		let team = Teams.findOne({"number":number,"abandoned":false});

	    	// Team must exist
			if ( team == undefined )
				throw new Meteor.Error('no-team', "No such team");
			// Team have at least two members (Captain already counts as one)
			else if ( team.members.length == 0)
				throw new Meteor.Error('team-empty', "Team doesn't have at least two members");
			// Team must have less than 4 members (Captain already counts as one)
			else if ( team.members.length > 3 )
				throw new Meteor.Error('team-overfilled', "Team has too many members");
			// Team must not be validated or pending already
			else if ( team.validated == true || team.pending == true)
				throw new Meteor.Error('team-already-signup', "Team already is up for validation or validated already, you can't do it again");
			else
				Teams.update(team._id,{'$set':{pending:false,validated:true}});
    	}
    	else
    	{
    		// User is not admin
			throw new Meteor.Error('not-staff', "User is not a staff member");	
		}
    },

    unvalidateTeam: function(number){

    	if (Roles.userIsInRole(this.userId, "staff"))
    	{
    		let team = Teams.findOne({"number":number,"abandoned":false});

	    	// Team must exist
			if ( team == undefined )
				throw new Meteor.Error('no-team', "No such team");
			else
				Teams.update(team._id,{'$set':{pending:false,validated:false}});
    	}
    	else
    	{
    		// User is not admin
			throw new Meteor.Error('not-staff', "User is not a staff member");	
		}
    },

});

function generateNewPassword(){
	// Generates 6 digit alphanumeric pass not used in any other team
	let pass = Math.random().toString(36).substring(7);
	let team = Teams.find({"password":pass});
	//console.log(team.count());
	if ( team.count() == 0)
		return pass;
	else
		generateNewPassword();
}