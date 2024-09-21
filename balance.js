function updateBalance() {
    document.getElementById("balance").innerText = balance;
    sessionStorage.setItem("balance", balance);
}
