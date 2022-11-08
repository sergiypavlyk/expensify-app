import { createStore, combineReducers } from 'redux';
import { v1 as uuid } from 'uuid';

// Add_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})
// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})
// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// Expenses reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else return expense;
      });
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    default: return state;
  }
}

// Filters Reducer
// text => '', sortBy => 'date', startDate => undefined, endDate => undefined
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER': {
      return {
        ...state,
        text: action.text
      }
    }
    default: return state;
  }
}

//store creation
const store = createStore(combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer
}));
store.subscribe(() => {
  console.log(store.getState())
})

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
store.dispatch(addExpense({ description: 'Coffee', amount: 300 }));
store.dispatch(removeExpense({ id: expenseOne.expense.id }));
store.dispatch(editExpense(expenseOne.expense.id, { amount: 500 }));
store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter(''));


const demoState = {
  expenses: [{
    id: 'udhsgugh',
    description: 'desc',
    note: 'final payment',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', //date or amount
    startDate: undefined,
    endDate: undefined
  }
};

