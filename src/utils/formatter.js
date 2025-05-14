const formatCurrency = (amount) => amount.toFixed(2);

const formatReceipt = (receipt) => {
  const lines = [];
  lines.push('\n--- Receipt ---');
  
  receipt.items.forEach(item => {
    lines.push(`${item.quantity} ${item.name}: ${formatCurrency(item.totalPrice)}`);
  });
  
  lines.push(`Sales Taxes: ${formatCurrency(receipt.salesTax)}`);
  lines.push(`Total: ${formatCurrency(receipt.total)}`);
  
  return lines.join('\n');
};

module.exports = {
  formatCurrency,
  formatReceipt
};
