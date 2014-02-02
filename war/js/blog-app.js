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
	this.resource('sign-in');
	this.resource('sign-up');
});

BareKnuckleApp.IndexRoute = Ember.Route.extend({
    redirect: function() {
        // this redirects / to /dashboard
        this.transitionTo('home');
    }
});

BareKnuckleApp.EntriesRoute = Ember.Route.extend({
	setupController : function(controller, entries) {
		controller.set('model', entries);
	},
	model : function() {
		return LifeSights.Journal.readAll()
	}
});

BareKnuckleApp.EntriesController = Ember.ArrayController.extend({
	needs : [ 'journal-entry' ],
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
		//this.controllerFor('journal-entries');
	},
	model : function(params) {
		return GoalApp.JournalEntriesController.findProperty('id', params.id);
	}
});

BareKnuckleApp.EntryController = Ember.ObjectController.extend({
	isEditing : false,
	actions : {
		edit : function() {
			this.set('isEditing', true);
		},
		save : function() {
			if (this.get('model').id == 'new') {
				LifeSights.Journal.create(this.get('model'));
			} else {
				LifeSights.Journal.update(this.get('model'));
			}
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