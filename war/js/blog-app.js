/*
 * Initialize App in Ember.js
 * Author: John McConnell
 * 
 */
BareKnuckleApp = Ember.Application.create();

/*
 * #/journal-entries/journal-entry/:id 
 */
BareKnuckleApp.Router.map(function() {
	this.resource('entries', function() {
		this.resource('entry', {
			path : ':id'
		});
	});
	this.resource('home');
	this.resource('about');
	this.resource('login');
	this.resource('sign-up');
});

BareKnuckleApp.ApplicationRoute = Ember.Route.extend({
    setupController : function(controller,model) {
		controller.set('user', model);
		controller.set('ajaxrequest', false);
	},
	model : function() {
		return LifeSights.User.read();
	}
});

BareKnuckleApp.ApplicationController = Ember.Controller.extend({
	title : 'Bare Knuckle Coding',
	actions : {
		login : function() {
			var user = this.get('user');
			var ajax = function() {
				return LifeSights.User.login(user.username, user.password);
			}
			var errors = LifeSights.HandleAjax('#trans-alert', ajax);
			if (errors == null) {
				this.transitionTo('home');
			} else {
				
			}
		},
		logout : function() {
			LifeSights.HandleAjax('#trans-alert', LifeSights.User.logout);
			this.set('user', LifeSights.User.model());
		},
		test : function() {
			LifeSights.HandleAjax('#trans-alert', LifeSights.User.test);
		}
	}
});

BareKnuckleApp.IndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('home');
    }
});

BareKnuckleApp.LoginRoute = Ember.Route.extend({
	renderTemplate: function() {
	    this.render({ controller: 'application' });
	}
});

BareKnuckleApp.LoginController = Ember.ObjectController.extend({
	needs: ['application']
});

BareKnuckleApp.EntriesRoute = Ember.Route.extend({
	setupController : function(controller, entries) {
		controller.set('model', entries);
	},
	model : function() {
		return LifeSights.HandleAjax('#trans-alert',LifeSights.Journal.readAll);
	}
});

BareKnuckleApp.EntriesController = Ember.ArrayController.extend({
	actions : {
		addnew : function() {
			entry = LifeSights.Journal.new();
			this.pushObject(entry);
			this.transitionToRoute('journal-entry', entry);
		}
	}
});

BareKnuckleApp.EntryRoute = Ember.Route.extend({
	setupController : function(controller, entry) {
		controller.set('model', entry);
	},
	model : function(params) {
		return BareKnuckle.EntriesController.findProperty('id', params.id);
	}
});

BareKnuckleApp.EntryController = Ember.ObjectController.extend({
	isEditing : false,
	actions : {
		edit : function() {
			this.set('isEditing', true);
		},
		save : function() {
			var ajax = function() {}
			if (this.get('model').id == 'new') {
				ajax = function() { LifeSights.Journal.create(this.get('model')); }
			} else {
				ajax = function() { LifeSights.Journal.update(this.get('model')); }
			}
			LifeSights.HandleAjax('#trans-alert',ajax);
			this.set('isEditing', false);
		},
		cancel : function() {
			this.set('isEditing', false);
		},
		addTag : function() {
			this.get('tags').pushObject("tag");
		}
	}
});

/*
 * Helper to print a timestamp as a nice date
 */
Ember.Handlebars.helper('pretty-date', function(timestamp) {
	var x = new Date(timestamp);
	return x.toDateString();
});
Ember.Handlebars.helper('format-markdown', function(data) {
	var converter = new Showdown.converter();
	return new Handlebars.SafeString(converter.makeHtml(data));
});