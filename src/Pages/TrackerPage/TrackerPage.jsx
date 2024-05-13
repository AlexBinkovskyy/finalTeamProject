import WaterDetailedInfo from 'components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from 'components/WaterMainInfo/WaterMainInfo';

export default function TrackerPage() {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <WaterMainInfo />
        <WaterDetailedInfo />
      </div>
    </>
  );
}
