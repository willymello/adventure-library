const convertCurrencyToDenominations = num => {
  let cash = num.toString();
  let gp;
  let sp;
  let cp;

  if (cash.length > 2) {
    gp = parseInt(cash.slice(0, cash.length - 2));
    sp = parseInt(cash.slice(-2, -1));
    cp = parseInt(cash.slice(-1));
    return [gp, sp, cp];
  }
  if (cash.length === 2) {
    gp = 0;
    sp = parseInt(cash[0]);
    cp = parseInt(cash[1]);
    return [gp, sp, cp];
  }
  gp = 0;
  sp = 0;
  cp = num;
  return [gp, sp, cp];
};

const convertDenominationstoCurrency = arr => {
  return arr[0] * 100 + arr[1] * 10 + arr[2];
};

const calculateNewBalance = (bal, arr, str) => {
  let withdrawal = bal - convertDenominationstoCurrency(arr);
  let deposit = bal + convertDenominationstoCurrency(arr);
  if (str === "w" && withdrawal < 0) {
    return "Cannot complete transaction, you have not enough coin";
  }
  return str === "w" ? withdrawal : deposit;
};
export {
  convertCurrencyToDenominations,
  convertDenominationstoCurrency,
  calculateNewBalance
};
