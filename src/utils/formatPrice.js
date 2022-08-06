
export const formatPrice = ({ amount, currency, unit_amount }) => {
    const numberFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
    });
    const parts = numberFormat.formatToParts(unit_amount);
    let zeroDecimalCurrency = true;
    for (let part of parts) {
      if (part.type === 'decimal') {
        zeroDecimalCurrency = false;
      }
    }
    unit_amount = zeroDecimalCurrency ? unit_amount : amount / 100;
    const total = (amount * amount).toFixed(2);
    return numberFormat.format(total);
  };