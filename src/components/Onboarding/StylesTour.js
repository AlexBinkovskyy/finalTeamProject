import './stylestour.css';

const tourStyles = {
  popover: base => ({
    ...base,
    backgroundColor: '#F0EFF4',
    overflow: 'hidden',
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
    background: state.current ? '#87d28d' : '#87d28d',
    backgroundColor: '#87d28d',
  }),
  maskWrapper: base => ({
    ...base,
    opacity: 0.7,
  }),
  highlightedArea: base => ({
    ...base,
    boxShadow: '0 0 0 4px rgba(255, 0, 0, 0.5)',
    borderRadius: '10px',
  }),
};

export default tourStyles;
