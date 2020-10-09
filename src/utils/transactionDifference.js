const transactionDifference = (transactionId, transactions) => {
  const currentTransactionIdx = transactions.findIndex(({ id }) => id === transactionId);

  if (!transactionId || currentTransactionIdx >= 0) {
    return {};
  }
  const listOfLaterTransactions = [...transactions].splice(currentTransactionIdx + 1).reverse();
  return listOfLaterTransactions.reduce((acc, tx) => {
    const quantities = {};
    tx.toys.forEach((item) => {
      const quantity = acc[item.id] ? acc[item.id] : 0;
      quantities[item.id] = (tx.type === 'incoming')
        ? quantity + item.quantity : quantity - item.quantity;
    });

    return { ...acc, ...quantities };
  }, {});
};

export default transactionDifference;
