import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { TitleCard } from '@/components/ui/TitleCard';

ChartJS.register(ArcElement, Tooltip, Legend, Tooltip, Filler, Legend);

interface DoughnutChartProps {
  title: string
  labels: Array<string>
  datasets: Array<{ data: Array<number>, backgroundColor: Array<string>, borderColor: Array<string>, borderWidth: number }>
}

function DoughnutChart({ title, labels, datasets }: DoughnutChartProps) {

  const data = {
    labels,
    datasets
  };

  return (
    <TitleCard title={title}>
      <Doughnut
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        }}
        data={data}
      />
    </TitleCard>
  )
}


export default DoughnutChart