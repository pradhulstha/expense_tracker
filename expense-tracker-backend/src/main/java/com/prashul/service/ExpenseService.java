package com.prashul.service;

import java.util.List;

import com.prashul.model.Expense;

public interface ExpenseService {

	List<Expense> findAll();
	
	Expense save(Expense expense);
	
	Expense findById(Long ID);
	
	void delete(Long id);
}
