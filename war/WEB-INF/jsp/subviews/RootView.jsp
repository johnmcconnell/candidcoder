
<nav class="navbar navbar-default" role="navigation">
	<div class="navbar-header">
		<a class="navbar-brand" href="#">{{title}}</a>
	</div>
	<div class="collapse navbar-collapse">

		<ul class="nav navbar-nav">
			<li><a href="#/entries">journal</a></li>

		</ul>
		<form class="navbar-form navbar-left" role="search">
			<div class="form-group">
				<input type="text" class="form-control" placeholder="search...">
			</div>
			<button type="submit" class="btn btn-default">search</button>
		</form>
		<ul class="nav navbar-nav navbar-right">
			{{#with user}}
			<li><a href="#/about">about me</a></li> 
			{{#if username}}
			<li class="dropdown"><a href="#" class="dropdown-toggle"
				data-toggle="dropdown">{{username}}<b class="caret"></b></a>
				<ul class="dropdown-menu">
					<li><a href="#/logout" {{action 'logout'}}>logout</a></li>
				</ul></li> 
				{{else}}
			<li><a href="#/login">login</a></li>
			<li><a href="#/sign-up">sign up</a></li> {{/if}} {{/with}}
		</ul>
	</div>
</nav>

{{outlet}}

<%@ include file="ProgressBar.jsp"%>

