import React, { useEffect, useRef } from 'react';
import { ScatterplotChart } from './components/ScatterplotChart';

interface CyclistData {
  Time: string;
  Place: number;
  Seconds: number;
  Name: string;
  Year: number;
  Nationality: string;
  Doping: string;
  URL: string;
}

function App() {
  const [data, setData] = React.useState<CyclistData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const cyclistData = await response.json();
        setData(cyclistData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading cyclist data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-600 text-lg mb-2">Error loading data</p>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 id="title" className="text-4xl font-bold text-slate-800 mb-2">
              Doping in Professional Bicycle Racing
            </h1>
            <p className="text-slate-600 text-lg">
              35 Fastest times up Alpe d'Huez
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Normalized to 13.8km distance
            </p>
          </div>
          
          <ScatterplotChart data={data} />
          
          <div className="mt-8 text-center text-sm text-slate-500">
            <p>Data source: freeCodeCamp</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;