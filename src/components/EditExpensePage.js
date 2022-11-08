import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';
import { useParams, useNavigate } from 'react-router-dom';

const EditExpensePage = (props) => {
  const { id } = useParams();
  console.log("EditExpensePage ~ id", id)
  let navigate = useNavigate();
  return (
    <div>
      <ExpenseForm
        expense={props.expense}
        onSubmit={(expense) => {
          props.dispatch(editExpense(props.expense.id, expense));
          navigate('/');
        }}
      />
      <button
        onClick={() => {
          props.dispatch(removeExpense({ id: props.expense.id }));
          navigate('/');
        }}
      >
        Remove
      </button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const params = useParams();
  return {
    expense: state.expenses.find((expense) => expense.id === params.id)
  };
};

export default connect(mapStateToProps)(EditExpensePage);
