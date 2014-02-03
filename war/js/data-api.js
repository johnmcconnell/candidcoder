if (LifeSights !== undefined) {
	throw new Error('LifeSights object is already defined');
} else {
	var LifeSights = new Object();
}

LifeSights.HandleAjax = function(alertid, ajax) {
	var alert = $(alertid);
	
	ajax()
	.done(function() {
		alert.attr("class","alert alert-success");
		alert.text("Transaction success!");
		alert.show(500);
		setTimeout(function() { alert.hide(500); }, 1500);
	})
	.fail(function() {
		alert.attr("class","alert alert-danger");
		alert.text("There was an error with your transaction!");
		alert.show(500);
	})
	.always(function() {

	});
	
	return null;
}

LifeSights.Journal = new Object();

LifeSights.Journal.create = function (data) {
	json = JSON.stringify(data);
	$.ajax({
		type : 'POST',
		url : 'api/model/journal/create',
		dataType : 'json',
		data : json,
		contentType : 'application/json',
		mimeType : 'application/json'
	})
}

LifeSights.Journal.createAll = function (models) {
	json = JSON.stringify(models);
	return $.ajax({
		type : 'POST',
		url : 'api/model/journal/createAll',
		dataType : 'json',
		data : json,
		contentType : 'application/json',
		mimeType : 'application/json'
	})
}

LifeSights.Journal.update = function (model) {
	json = JSON.stringify(model);
	return $.ajax({
		type : 'POST',
		url : 'api/model/journal/update',
		dataType : 'json',
		data : json,
		contentType : 'application/json',
		mimeType : 'application/json'
	})
}

LifeSights.Journal.read = function (id) {
	return $.getJSON('api/model/journal/read/' + id);
};

LifeSights.Journal.readAll = function() {
	return $.getJSON('api/model/journal/readAll');
};

LifeSights.Journal.new = function(){
	return new Object({id:"new", updatedOn:Date(), author:"author",title:"title",something:"type here",published:false,tags:[]});
};

LifeSights.User = new Object();

LifeSights.User.login = function (username, password) {
	return $.post( "/j_spring_security_check", {j_username:username,j_password:password,submit:'Login'});
}

LifeSights.User.logout = function()	 {
	return $.get('/j_spring_security_logout');
}

LifeSights.User.model = function(){
	return new Object({id:'new', updatedOn:Date(),username:"",password:""});
}

LifeSights.User.read = function(user) {
	var template = LifeSights.User.model();
	$.ajax({
        url: 'api/user/read',
        type: 'post',
        dataType: 'text',
        async: false,
        success: function(data) {
            template.username = data;
        } 
     });
	return template;
}