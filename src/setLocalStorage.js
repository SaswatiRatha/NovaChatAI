const setLocalStorage = (results) => {
  localStorage.setItem("history", JSON.stringify(results));
};

export default setLocalStorage;
