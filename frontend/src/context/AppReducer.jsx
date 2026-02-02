export const AppReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        loading: false,
        transactions: action.payload.data || [],
        pagination: action.payload.pagination || {},
        total: action.payload.total || 0,
        summary: action.payload.summary || state.summary,
        currentPage: action.payload.currentPage || 1,
        error: null, // Clear any previous errors
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
        transactions: [], // Clear current transactions to avoid showing stale data
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (t) => t._id !== action.payload,
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t._id === action.payload._id ? action.payload : t,
        ),
      };
    case "SET_EDITING_TRANSACTION":
      return {
        ...state,
        editingTransaction: action.payload,
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_DATE_FILTER":
      return {
        ...state,
        dateFilter: action.payload,
      };
    default:
      return state;
  }
};
