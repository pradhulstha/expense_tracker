package com.prashul.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashul.model.Expense;
import com.prashul.repository.ExpenseRepository;

@Service
public class ExpenseServiceImpl implements ExpenseService {

	@Autowired
	ExpenseRepository expenseRepo;
	
	@Override
	public List<Expense> findAll() {
		return expenseRepo.findAll();
	}

	@Override
	public Expense save(Expense expense) {
		return expenseRepo.save(expense);
	}

	@Override
	public Expense findById(Long ID) {
		if(this.expenseRepo.findById(ID).isPresent())
			return this.expenseRepo.findById(ID).get();
		return null;
	}

	@Override
	public void delete(Long id) {
		
		if(this.expenseRepo.findById(id).isPresent())
		{
			this.expenseRepo.deleteById(id);
		}
	}
	
}
