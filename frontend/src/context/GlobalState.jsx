import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
import axios from "axios";

// Initial State
const initialState = {
  transactions: [],
  error: null,
  loading: true,
  pagination: {},
  total: 0,
  summary: {
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
  },
  currentPage: 1,
  editingTransaction: null,
  dateFilter: {
    startDate: null,
    endDate: null,
    type: "all", // "all", "day", "month"
  },
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions(
    page = 1,
    limit = 10,
    startDateArg = null,
    endDateArg = null,
  ) {
    dispatch({ type: "SET_LOADING" });

    try {
      // Use provided args or fall back to state
      const startDate =
        startDateArg !== null ? startDateArg : state.dateFilter.startDate;
      const endDate =
        endDateArg !== null ? endDateArg : state.dateFilter.endDate;

      let url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}?page=${page}&limit=${limit}`;

      if (startDate && endDate && startDate !== "null" && endDate !== "null") {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }

      const res = await axios.get(url);
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response?.data?.error || "Server Error",
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${id}`,
      );
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
      getTransactions(state.currentPage);
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`,
        transaction,
        config,
      );
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
      getTransactions(1); // Go to page 1 to see new transaction
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function editTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${transaction._id}`,
        transaction,
        config,
      );
      dispatch({
        type: "EDIT_TRANSACTION",
        payload: res.data.data,
      });
      getTransactions(state.currentPage);
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  function setEditingTransaction(transaction) {
    dispatch({
      type: "SET_EDITING_TRANSACTION",
      payload: transaction,
    });
  }

  function setDateFilter(filter) {
    dispatch({
      type: "SET_DATE_FILTER",
      payload: filter,
    });
    // After setting the filter, we should refetch
    getTransactions(1, 10, filter.startDate, filter.endDate);
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        pagination: state.pagination,
        total: state.total,
        summary: state.summary,
        currentPage: state.currentPage,
        editingTransaction: state.editingTransaction,
        dateFilter: state.dateFilter,
        getTransactions,
        deleteTransaction,
        addTransaction,
        editTransaction,
        setEditingTransaction,
        setDateFilter,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
