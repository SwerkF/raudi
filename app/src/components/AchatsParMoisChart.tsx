import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

interface Achat {
    id: number;
    date_achat: Date;
    user_id: number;
    prix: number;
    vehicule: {
      id: number;
      nom: string;
      prix: number;
        modele: {
            id: number;
            nom: string;
            prix: number;
        };
      options: {
        id: number;
        nom: string;
        prix: number;
      }[];
    };
  }

type ChartData = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
  }>;
};

const AchatsParMoisChart: React.FC = () => {
    
    const navigate = useNavigate();
    const [achats, setAchats] = useState<Achat[]>([]);
    const [chartData, setChartData] = useState<ChartData>();

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
            .catch(err => {
                console.error('Une erreur est survenue lors de la récupération des achats: ', err);
                navigate('/login');
            });
    }, []);

    const setupChartData = (achats: Achat[]) => {
        const achatParMois: { [key: string]: number } = {};

        // Traiter les achats pour obtenir le total par mois
        achats.forEach(achat => {
            const mois = new Date(achat.date_achat).toLocaleString('default', { month: 'short', year: 'numeric' });
            achatParMois[mois] = (achatParMois[mois] || 0) + getTotals(achat);
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

const getTotals = (achats: any) => {        
    let prix = achats.vehicule.modele.prix;
        const achat = achats.vehicule;
        for (let i = 0; i < achat.options.length; i++) {
            const option = achat.options[i];
            prix += option.prix;
        }
        return prix;
}

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
