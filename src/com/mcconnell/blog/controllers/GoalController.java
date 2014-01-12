package com.mcconnell.blog.controllers;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.lifesights.webapp.DataController;
import com.mcconnell.blog.models.DailyGoal;

@Controller
@RequestMapping(GoalController.BASE_URL)
public class GoalController extends DataController<DailyGoal> {
	public static final Class<DailyGoal> CLASS = DailyGoal.class;
	public static final String BASE_URL = "/goaltracker/goals";

	public GoalController() {
		super(CLASS);
	}
}
