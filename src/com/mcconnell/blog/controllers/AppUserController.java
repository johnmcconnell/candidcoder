package com.mcconnell.blog.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lifesights.webapp.DataController;
import com.lifesights.webapp.UserController;
import com.lifesights.webapp.UserObject;

@Controller
@RequestMapping(AppUserController.BASE_URL)
public class AppUserController  {
	public static final Class<UserObject> CLASS = UserObject.class;
	public static final String BASE_URL = "api/user";
	public static final String COOKIE_KEY = "user";

	public AppUserController() {
		//super(CLASS);
	}
	
	@RequestMapping(value = "read", method = RequestMethod.POST)
	public @ResponseBody String getUser(HttpServletRequest req) {
		final String user = req.getRemoteUser();
		
		return (user == null)? "" : user;
	}

}
