export const domains = [
  {
    id: 'security-monitoring',
    number: '01',
    title: 'Security Monitoring',
    context:
      'Saya menggunakan Wazuh untuk memantau alert dan event keamanan, lalu membaca log untuk memahami konteks kejadian di lingkungan lab.',
    coreStrengths: [
      'Meninjau alert dan event pada lingkungan lab',
      'Membaca log untuk menemukan konteks kejadian',
      'Mendokumentasikan temuan dan alur analisis',
    ],
    stack: ['Wazuh', 'SIEM', 'Log Analysis', 'Security Events'],
  },
  {
    id: 'network-security',
    number: '02',
    title: 'Network Security',
    context:
      'Saya mempelajari kontrol trafik, firewall, dan IDS/IPS melalui praktik lab jaringan menggunakan OPNsense dan Suricata.',
    coreStrengths: [
      'Menguji rule firewall dan alur trafik jaringan',
      'Mempelajari deteksi melalui IDS/IPS',
      'Melakukan troubleshooting konektivitas dan konfigurasi',
    ],
    stack: ['OPNsense', 'Suricata', 'Firewall', 'IDS/IPS'],
  },
  {
    id: 'system-administration',
    number: '03',
    title: 'System Administration',
    context:
      'Saya berlatih menyiapkan layanan Linux, menjalankan container Docker, dan menelusuri gangguan melalui log serta status sistem.',
    coreStrengths: [
      'Menyiapkan service dan environment Linux',
      'Menjalankan workload berbasis container',
      'Troubleshooting service melalui log dan status sistem',
    ],
    stack: ['Linux', 'Docker', 'Systemd', 'Networking'],
  },
]
