import React from 'react';

export default function AdvantagesSection() {
  return (
    <div>
      <picture>
        <source srcSet="../../image/rectangle_mob@1x.jpg" type="image/jpg1x" />
        <source srcSet="../../image/rectangle_mob@2x.jpg" type="image/jpg2x" />
      </picture>
      <h3>Our happy customers</h3>
      <ol>
        <li>Habit drive</li>
        <li>View statistics</li>
        <li>Personal rate setting</li>
      </ol>
    </div>
  );
}
