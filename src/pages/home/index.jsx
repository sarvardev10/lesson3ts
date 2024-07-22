import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Index() {
  return (
    <PieChart
      series={[
        {
          data: [
            { value: 3, label: 'Series A1' },
            { value: 4, label: 'Series A2' },
            { value: 1, label: 'Series B1' },
            { value: 6, label: 'Series B2' },
            { value: 5, label: 'Series C1' }
          ],
        },
      ]}
      width={1200}
      height={650}
    />
  );
}
