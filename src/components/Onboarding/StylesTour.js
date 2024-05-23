const tourStyles = {
  popover: base => ({
    ...base,
    backgroundColor: '#F0EFF4',

    color: 'black',
    font: 'Poppins-Regular',
    borderRadius: '30px',
    padding: '40px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
  }),
  badge: base => ({
    ...base,
    display: 'none',
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
  disableDotsNavigation: base => ({
    ...base,
    fill: '#87d28d',
    stroke: '#87d28d',
    color: '#87d28d',
    backgroundColor: '#87d28d',
  }),
  dot: (base, state) => ({
    ...base,
    background: state.current ? '#9BE1A0' : '#87d28d',
  }),
  maskWrapper: base => ({
    ...base,
    opacity: 0.7,
  }),
};

export default tourStyles;
