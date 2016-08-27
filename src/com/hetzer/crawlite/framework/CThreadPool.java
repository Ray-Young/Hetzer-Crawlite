package com.hetzer.crawlite.framework;

import com.hetzer.crawlite.exception.OverFlowException;

public interface CThreadPool {
	public CThread[] getActiveThreads();

	public CThread[] getInactiveThreads();

	public int getCount();

	public void initialize(int max);

	public CThread[] apply(int num) throws OverFlowException;
}
