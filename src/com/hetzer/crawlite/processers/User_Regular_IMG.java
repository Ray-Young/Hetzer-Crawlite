package com.hetzer.crawlite.processers;

public class User_Regular_IMG {
	public static String Regular_Fun() {
		//return ".*?<img.*?src=\"(.*?)\".*?";
		//return "<span class=\"classfpic fl mr10\"><a href=\".*?<img src=\"(.*?)\".*? ";
		return ".*?<img.*?src=\"(.*?)\" width=\"90\" height=\"60\".*?";
	}

}
