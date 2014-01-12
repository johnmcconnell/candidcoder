package com.mcconnell.blog.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class BlogController {
	public static final String BASE_URL = "";

	@RequestMapping(method = RequestMethod.GET)
	public String getIndex() {
		return "Blog";
	}
}
