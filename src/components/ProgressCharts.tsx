import React from 'react';
import { Card } from 'flowbite-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ProgressChartsProps {
  stats: {
    totalStats: {
      totalDistance: number;
      totalDuration: number;
      totalActivities: number;
      averagePace: number;
      averageDifficulty: number;
    };
    typeBreakdown: Array<{
      _id: string;
      count: number;
      totalDistance: number;
      totalDuration: number;
    }>;
    weeklyProgress: Array<{
      _id: { year: number; week: number };
      totalDistance: number;
      totalDuration: number;
      activityCount: number;
    }>;
  };
}

const ProgressCharts: React.FC<ProgressChartsProps> = ({ stats }) => {
  // Weekly Distance Chart
  const weeklyDistanceData = {
    labels: stats.weeklyProgress.map(week => `Week ${week._id.week}`),
    datasets: [
      {
        label: 'Distance (km)',
        data: stats.weeklyProgress.map(week => week.totalDistance),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Duration (min)',
        data: stats.weeklyProgress.map(week => week.totalDuration),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  const weeklyDistanceOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weekly Training Progress',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Distance (km)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Duration (min)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  // Activity Type Breakdown
  const activityTypeData = {
    labels: stats.typeBreakdown.map(type => 
      type._id.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
    ),
    datasets: [
      {
        data: stats.typeBreakdown.map(type => type.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const activityTypeOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Activity Type Distribution',
      },
    },
  };

  // Weekly Activity Count
  const weeklyActivityData = {
    labels: stats.weeklyProgress.map(week => `Week ${week._id.week}`),
    datasets: [
      {
        label: 'Activities',
        data: stats.weeklyProgress.map(week => week.activityCount),
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 1,
      },
    ],
  };

  const weeklyActivityOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Weekly Activity Count',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weekly Distance Chart */}
      <Card className="p-6">
        <div className="h-80">
          <Line data={weeklyDistanceData} options={weeklyDistanceOptions} />
        </div>
      </Card>

      {/* Activity Type Distribution */}
      <Card className="p-6">
        <div className="h-80">
          <Doughnut data={activityTypeData} options={activityTypeOptions} />
        </div>
      </Card>

      {/* Weekly Activity Count */}
      <Card className="p-6 lg:col-span-2">
        <div className="h-80">
          <Bar data={weeklyActivityData} options={weeklyActivityOptions} />
        </div>
      </Card>
    </div>
  );
};

export default ProgressCharts;
