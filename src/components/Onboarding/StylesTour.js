const tourStyles = {
  popover: base => ({
    ...base,
    backgroundColor: '#F0EFF4',
    color: 'black',
    font: 'Poppins-Regular',
    borderRadius: '30px',
    padding: '30px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  }),
  tooltip: base => ({
    ...base,
    color: 'white',
  }),
  badge: base => ({
    ...base,
    backgroundColor: '#9be1a0',
    color: 'black',
  }),
  button: base => ({
    ...base,
    backgroundColor: '#F0EFF4',
    color: 'black',
  }),
  arrow: base => ({
    ...base,
    color: 'black',
  }),
  currentDot: base => ({
    ...base,
    backgroundColor: 'green',
  }),
  dot: base => ({
    ...base,
    backgroundColor: '#87d28d',
  }),
};

export default tourStyles;
