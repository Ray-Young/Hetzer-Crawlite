package com.hetzer.crawlite.processers;

import com.hetzer.crawlite.datamodel.CrawlableURL;
import com.hetzer.crawlite.framework.Processor;
import com.hetzer.crawlite.job.CrawlJob;

public abstract class AbstractExtractor implements Processor {
	@Override
	public boolean process(CrawlableURL source, CrawlJob crawlJob) {
		// crawlJob.getUrlProvider().add(new
		// MockResource("http://www.sohu.com/"));
		return Extract(source, crawlJob);

	}

	public abstract boolean Extract(CrawlableURL url, CrawlJob crawlJob);

}
