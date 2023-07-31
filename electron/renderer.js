window.addEventListener("beforeunload", () => {
  localStorage.removeItem("@ticket_manager_user");
});
