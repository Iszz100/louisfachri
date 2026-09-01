export const domains = [
  {
    id: 'system-administration',
    number: '01',
    title: 'System Administration',
    context:
      'Mulai dari menyiapkan server Linux dan service, menjalankan aplikasi dengan Docker, sampai mencari penyebab error lewat log.',
    stack: ['Linux', 'Docker', 'Systemd'],
  },
  {
    id: 'cybersecurity',
    number: '02',
    title: 'Cybersecurity',
    context:
      'Di lab, saya belajar blue team dengan memantau event di Wazuh, mengatur firewall OPNsense, dan mencoba Suricata IDS/IPS.',
    stack: ['Wazuh', 'OPNsense', 'Suricata'],
  },
  {
    id: 'it-infrastructure',
    number: '03',
    title: 'IT Infrastructure',
    context:
      'Saya juga mengerjakan bagian yang menghubungkan aplikasi dengan server: networking, reverse proxy Nginx, deployment, dan pengecekan setelah rilis.',
    stack: ['Networking', 'Nginx', 'Deployment'],
  },
]
