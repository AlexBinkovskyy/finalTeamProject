import css from './CalendarPagination.module.css';

export default function CalendarPagination({ onNext, onPrev }) {
  return (
    <>
      <div>
        <button onClick={onPrev}>Previous</button>
        <button onClick={onNext}>Next</button>
      </div>
    </>
  );
}
