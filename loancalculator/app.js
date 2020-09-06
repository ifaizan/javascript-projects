document.getElementById('loan-form').addEventListener('submit', function(e) {
    //Hide Results
    document.getElementById('results').style.display = 'none';
    //show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(loadResults, 2000);

    e.preventDefault();
});

function loadResults() {
    //UI vars
    const amountEL = document.getElementById('amount');
    const interestEL = document.getElementById('interest');
    const yearsEL = document.getElementById('years');
    const monthlyPaymentEL = document.getElementById('monthly-payment');
    const totalPaymentEL = document.getElementById('total-payment');
    const totalInterestEL = document.getElementById('total-interest');

    const principal = parseFloat(amountEL.value);
    const calculatedInterest = parseFloat(interestEL.value) / 100 / 12;
    const calculatedPayments = parseFloat(yearsEL.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if (isFinite(monthly)) {
        monthlyPaymentEL.value = monthly.toFixed(2);
        totalPaymentEL.value = (monthly * calculatedPayments).toFixed(2);
        totalInterestEL.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //Show Results
        document.getElementById('results').style.display = 'block';
        //Hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }
}

function showError(error) {

    //Show Results
    document.getElementById('results').style.display = 'none';
    //Hide loader
    document.getElementById('loading').style.display = 'none';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';

    errorDiv.appendChild(document.createTextNode(error));

    const cardEL = document.querySelector('.card');
    const headingEL = document.querySelector('.heading');

    cardEL.insertBefore(errorDiv, headingEL);

    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}