const ticketErrors = (err) => {
    console.log("in ticketErrors message::", err.message, "CODE!!", err.code);

    let errors = { ticket: "" };

if(err.message === "ticket not found"){
    errors.ticket = "ticket not found";
}

if(err.message === "ticket already completed"){
    errors.ticket = "ticket already completed";
}

return errors;

};

export { ticketErrors };