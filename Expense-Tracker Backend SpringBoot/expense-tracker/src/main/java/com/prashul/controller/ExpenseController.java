package com.prashul.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prashul.model.Expense;
import com.prashul.service.ExpenseService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1")
public class ExpenseController {

	@Autowired
	ExpenseService expenseSvc;
	
	@GetMapping("/expenses")
	public ResponseEntity<List<Expense>> findAll()
	{
		return new ResponseEntity<List<Expense>>(expenseSvc.findAll(), HttpStatus.OK);
	}
	
	@PostMapping("/expenses")
	public ResponseEntity<Expense> save(@RequestBody Expense expense)
	{
		return new ResponseEntity<Expense>(this.expenseSvc.save(expense), HttpStatus.OK);
	}
	
	@GetMapping("/expenses/{id}")
	public ResponseEntity<Expense> findById(@PathVariable("id") Long ID)
	{
		Expense exp = this.expenseSvc.findById(ID);
		
		if( exp != null )
			{
				return new ResponseEntity<Expense>(exp, HttpStatus.OK);
			}
		else
			return new ResponseEntity<Expense>(exp, HttpStatus.NOT_FOUND);

	}
	
	@DeleteMapping("/expenses/{id}")
	public ResponseEntity<String> delete(@PathVariable("id") Long ID)
	{
		Expense exp = this.expenseSvc.findById(ID);
		
		if ( exp != null)
		{
			this.expenseSvc.delete(ID);
			return new ResponseEntity<String>("Expense Deleted Successfully", HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<String>("Expense Not Found", HttpStatus.NOT_FOUND);
		}
	}
	
}