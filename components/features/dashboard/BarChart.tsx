import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { TitleCard } from '@/components/ui/TitleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  title: string;
  labels: Array<string>;
  datasets: Array<{ label: string, data: Array<number>, backgroundColor: string }>
}

export const BarChart = ({ title, labels, datasets }: BarChartProps) => {

  const data = {
    labels,
    datasets,
  };

  return (
    <TitleCard title={title}>
      <Bar
        options={{
          responsive: true,
          plugins: { legend: { position: "top" } }
        }}
        data={data}
      />
    </TitleCard>
  )
}
