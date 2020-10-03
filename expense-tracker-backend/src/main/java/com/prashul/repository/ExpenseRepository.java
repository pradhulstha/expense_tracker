package com.prashul.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prashul.model.Expense;


@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
