import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

interface Achat {
    id: number;
    date_achat: string; 
    prix: number;
}

// Définition du type pour les données du graphique
type ChartData = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
  }>;
};

const AchatsParMoisChart: React.FC = () => {
    const [achats, setAchats] = useState<Achat[]>([]);
    const [chartData, setChartData] = useState<ChartData>();

    // Charger les achats existants
    useEffect(() => {
        axios.get<Achat[]>('http://localhost:3000/api/achat', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setAchats(res.data);
                setupChartData(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    const setupChartData = (achats: Achat[]) => {
        const achatParMois: { [key: string]: number } = {};

        // Traiter les achats pour obtenir le total par mois
        console.log(achats)
        achats.forEach(achat => {
            const mois = new Date(achat.date_achat).toLocaleString('default', { month: 'short', year: 'numeric' });
            achatParMois[mois] = (achatParMois[mois] || 0) + achat.prix;
        });

        // Créer les données pour le graphique en barres
        setChartData({
            labels: Object.keys(achatParMois),
            datasets: [
                {
                    label: 'Total des achats par mois (€)',
                    data: Object.values(achatParMois),
                    backgroundColor: '#1b57af',
                }
            ]
        });
    };

    const options = {
        scales: {
            y: {
              beginAtZero: true
            }
          },
        plugins: {
          legend: {
            display: true,
            position: 'top' as 'top' | 'left' | 'right' | 'bottom' | 'center' | 'chartArea'
          }
        }
      };
      

    return (
        <div className="container mt-4 w-50">
            <h3>Achats par Mois</h3>
            <div style={{ width : "100%", margin: '0 auto' }}>
                {chartData && <Bar data={chartData} options={options} />}
            </div>
        </div>
    );
};

export default AchatsParMoisChart;
