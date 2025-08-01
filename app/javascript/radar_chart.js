import Chart from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', initializeRadarCharts);
document.addEventListener('turbo:load', initializeRadarCharts);

function initializeRadarCharts() {
  const chartElements = document.querySelectorAll('.radar-chart');
  
  chartElements.forEach(element => {
    const chartId = element.id;
    const existingChart = Chart.getChart(chartId);
    
    if (existingChart) {
      existingChart.destroy();
    }
    
    const ctx = element.getContext('2d');
    const data = JSON.parse(element.dataset.chartData);
    
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['甘味', '酸味', '辛味', '苦味', '旨味'],
        datasets: [{
          label: '味覚評価',
          data: data,
          backgroundColor: 'rgba(0, 229, 255, 0.18)', // シアンの透明色
          borderColor: '#00E5FF', // シアン
          borderWidth: 3,
          pointBackgroundColor: '#80D8FF', // 明るいシアン
          pointBorderColor: '#80D8FF',
          pointBorderWidth: 2,
          pointRadius: 2, // 通常時2
          pointHoverRadius: 2, // ホバー時も2
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          easing: 'easeInOutQuart'
        },
        interaction: {
          intersect: false,
          mode: 'point'
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: 'rgba(34, 197, 94, 0.8)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              title: function(context) {
                return context[0].label;
              },
              label: function(context) {
                const value = context.parsed.r;
                const levels = ['弱い', '少し弱い', '普通', '少し強い', '強い'];
                return `${value}/5 (${levels[value - 1] || '---'})`;
              }
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1,
              display: false, // 数字を非表示に
              color: '#94A3B8', // より明るいグレー
              font: {
                size: 11,
                weight: 500
              },
              backdropColor: 'transparent',
              showLabelBackdrop: false
            },
            grid: {
              color: 'rgba(148, 163, 184, 0.4)', // より明るいグリッド
              lineWidth: 1
            },
            angleLines: {
              color: 'rgba(148, 163, 184, 0.4)',
              lineWidth: 1
            },
            pointLabels: {
              color: '#E2E8F0', // より明るいラベル
              font: {
                size: 13,
                weight: '600'
              },
              padding: 8
            }
          }
        }
      }
    });
  });
}
