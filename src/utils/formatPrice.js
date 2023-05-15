const formatPrice = (value, currency = 'PLN') => {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency }).format(value);
};

export default formatPrice;
