package com.hetzer.crawlite.processers;

import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import com.hetzer.crawlite.datamodel.CrawlableURL;

public class HTMLGetCookie extends AbstractFetcher {
	public void fetch(CrawlableURL source) {
		// String surl = "http://login.goodjobs.cn/index.php/action/UserLogin";

		if (((source.getURL().matches("http.*?com.*?")) || (source.getURL().matches(".*?net.*?"))
				|| (source.getURL().matches(".*?org.*?")) || (source.getURL().matches(".*?edu.*?"))
				|| (source.getURL().matches(".*?gov.*?"))) && (!source.getURL().matches(".*?gif"))
				&& (!source.getURL().matches(".*?jpg")) && (!source.getURL().matches(".*?png"))
				&& (!source.getURL().matches(".*?js")) && (!source.getURL().matches(".*?css"))) {
			try {
				URL url = new URL(source.getURL());
				HttpURLConnection connection = (HttpURLConnection) url.openConnection();

				connection.setDoOutput(true);
				OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream(), "GBK");
				out.write(User_Account.getAccount()); // post�Ĺؼ����ڣ�
				// remember to clean up
				out.flush();
				out.close();

				String cookieVal = connection.getHeaderField("Set-Cookie");
				source.setCookie(cookieVal);

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

}
