{{#with user}}
<div class="container">
	<form>
		<div class="input-group input-group-sm">
			{{input type="text" class="form-control" placeholder="username" value=username}}
		</div>
		<div class="input-group input-group-sm">
			{{input type="password" class="form-control" placeholder="password" value=password}}
		</div>
		<button type="button" class="btn btn-default btn-xs"{{action 'login' }}>login</button>
	</form>
</div>
{{/with}}