import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createExpense: apiCall({
      method: "post",
      path: "/events/:eventId/expense",
      expectedParams: ["description", "amount"]
    }),

    deleteExpense: apiCall({
      method: "delete",
      path: "/events/:eventId/expense"
    }),

    getExpense: apiCall({
      method: "get",
      path: "/events/:eventId/expenses/:expenseId"
    }),

    listExpenses: apiCall({
      method: "get",
      path: "/events/:eventId/expenses",
      optionalParams: ["page"]
    }),

    updateExpense: apiCall({
      method: "patch",
      path: "/events/:eventId/expenses/:expenseId",
      optionalParams: ["description", "amount"]
    })
  });
