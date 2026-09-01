import fotoSysadmin1 from '../assets/fotoprojek_sysadmin1.webp'
import fotoSysadmin2 from '../assets/fotoprojek_sysadmin2.webp'
import fotoSysadmin3 from '../assets/fotoprojek_sysadmin3.webp'
import fotoSysadmin4 from '../assets/fotoprojek_sysadmin4.webp'
import projectSysadminDeploy1 from '../assets/projeksysadmin1.webp'
import projectSysadminDeploy2 from '../assets/projeksysadmin2.webp'
import projectSysadminDeploy3 from '../assets/projeksysadmin3.webp'
import projectSysadminDeploy4 from '../assets/projeksysadmin4.webp'
import berandaSekolah from '../assets/Beranda.webp'
import profileSekolah from '../assets/Profile Sekolah.webp'
import hubunganIndustri from '../assets/Hubungan Industri.webp'
import digitalTalentProgram from '../assets/DTP.webp'
import ekstrakurikulerSekolah from '../assets/Ekstrakurikuler.webp'
import profileJurusan from '../assets/PROFILE JURUSAN.webp'
import cyberPhoto0 from '../assets/0.webp'
import cyberPhoto1 from '../assets/1.webp'
import cyberPhoto2 from '../assets/2.webp'
import cyberPhoto3 from '../assets/3.webp'
import cyberPhoto4 from '../assets/4.webp'
import cyberPhoto5 from '../assets/5.webp'
import cyberPhoto6 from '../assets/6.webp'
import cyberPhoto7 from '../assets/7.webp'
import iotAiDoc1 from '../assets/project_iot_ai_1.webp'
import iotAiDoc2 from '../assets/project_iot_ai_2.webp'
import iotAiDoc3 from '../assets/project_iot_ai_3.webp'
import iotAiDoc4 from '../assets/project_iot_ai_4.webp'
import iotAiDoc5 from '../assets/project_iot_ai_5.webp'
import iotAiDoc6 from '../assets/project_iot_ai_6.webp'
import iotAiDoc7 from '../assets/project_iot_ai_7.webp'
import iotAiDoc8 from '../assets/project_iot_ai_8.webp'
import iotAiDoc10 from '../assets/project_iot_ai_10.webp'
import iotAiDoc11 from '../assets/project_iot_ai_11.webp'
import opnsenseTopology from '../assets/projects/opnsense-security-lab/01-network-topology.webp'
import opnsenseInitialManagement from '../assets/projects/opnsense-security-lab/02-opnsense-initial-management.webp'
import opnsenseInterfaceAssignments from '../assets/projects/opnsense-security-lab/03-interface-assignments.webp'
import opnsenseLanBridge from '../assets/projects/opnsense-security-lab/04-lan-bridge0.webp'
import opnsenseManagementIpv4 from '../assets/projects/opnsense-security-lab/05-management-ipv4.webp'
import opnsenseBridgeMembers from '../assets/projects/opnsense-security-lab/06-bridge-members.webp'
import opnsenseFirewallRules from '../assets/projects/opnsense-security-lab/07-opnsense-firewall-rules.webp'
import mikrotikAddressing from '../assets/projects/opnsense-security-lab/08-mikrotik-addressing.webp'
import mikrotikNat from '../assets/projects/opnsense-security-lab/09-mikrotik-nat.webp'
import mikrotikFirewallFilter from '../assets/projects/opnsense-security-lab/10-mikrotik-firewall-filter.webp'
import opnsenseWebgui from '../assets/projects/opnsense-security-lab/11-opnsense-webgui.webp'
import opnsenseManagementAccess from '../assets/projects/opnsense-security-lab/12-opnsense-management-access.webp'
import suricataNetmapIps from '../assets/projects/opnsense-security-lab/13-suricata-netmap-ips.webp'
import idsRulesets from '../assets/projects/opnsense-security-lab/14-ids-rulesets.webp'
import malwarePhishingRulesets from '../assets/projects/opnsense-security-lab/15-malware-phishing-rulesets.webp'
import ipsAlertToDrop from '../assets/projects/opnsense-security-lab/16-ips-alert-to-drop.webp'
import ipsRulesDrop from '../assets/projects/opnsense-security-lab/17-ips-rules-drop.webp'
import eicarSafeTest from '../assets/projects/opnsense-security-lab/18-eicar-safe-test.webp'

const opnsenseSecurityLabGallery = [
  {
    src: opnsenseTopology,
    width: 574,
    height: 800,
    group: 'Architecture',
    caption: 'Topologi lab keamanan jaringan',
    alt: 'Topologi lab OPNsense Transparent Filtering Bridge dan IDS IPS',
  },
  {
    src: opnsenseInitialManagement,
    width: 1600,
    height: 718,
    group: 'OPNsense Bridge & Management',
    caption: 'Tahap awal akses dan konfigurasi OPNsense',
    alt: 'Tahap awal akses management dan configuration wizard OPNsense',
  },
  {
    src: opnsenseInterfaceAssignments,
    width: 1600,
    height: 625,
    group: 'OPNsense Bridge & Management',
    caption: 'Assignment interface WAN, LAN/bridge, dan CLIENT',
    alt: 'Assignment interface WAN LAN bridge dan CLIENT pada OPNsense',
  },
  {
    src: opnsenseLanBridge,
    width: 1600,
    height: 625,
    group: 'OPNsense Bridge & Management',
    caption: 'Interface LAN menggunakan device bridge0',
    alt: 'Konfigurasi interface LAN OPNsense menggunakan device bridge0',
  },
  {
    src: opnsenseManagementIpv4,
    width: 1600,
    height: 710,
    group: 'OPNsense Bridge & Management',
    caption: 'Konfigurasi IPv4 pada interface management',
    alt: 'Konfigurasi IPv4 pada interface management OPNsense dengan informasi sensitif disensor',
  },
  {
    src: opnsenseBridgeMembers,
    width: 1600,
    height: 710,
    group: 'OPNsense Bridge & Management',
    caption: 'Bridge interface dengan member WAN dan CLIENT',
    alt: 'Konfigurasi bridge0 OPNsense dengan member interface WAN dan CLIENT',
  },
  {
    src: opnsenseFirewallRules,
    width: 1600,
    height: 710,
    group: 'OPNsense Bridge & Management',
    caption: 'Firewall rules untuk akses dan trafik bridge',
    alt: 'Firewall rules OPNsense untuk akses management dan trafik bridge',
  },
  {
    src: mikrotikAddressing,
    width: 819,
    height: 733,
    group: 'MikroTik Routing & Management Access',
    caption: 'Konfigurasi addressing pada MikroTik',
    alt: 'Konfigurasi IP addressing MikroTik dengan alamat jaringan disensor',
  },
  {
    src: mikrotikNat,
    width: 1245,
    height: 323,
    group: 'MikroTik Routing & Management Access',
    caption: 'Konfigurasi NAT, DNAT, dan SNAT untuk kebutuhan management',
    alt: 'Konfigurasi NAT DNAT dan SNAT MikroTik dengan alamat jaringan disensor',
  },
  {
    src: mikrotikFirewallFilter,
    width: 1245,
    height: 244,
    group: 'MikroTik Routing & Management Access',
    caption: 'Firewall filter MikroTik untuk mengatur trafik yang diperbolehkan',
    alt: 'Firewall filter MikroTik untuk mengatur trafik lab yang diperbolehkan',
  },
  {
    src: opnsenseWebgui,
    width: 1600,
    height: 683,
    group: 'MikroTik Routing & Management Access',
    caption: 'Pengaturan akses WebGUI OPNsense',
    alt: 'Pengaturan akses WebGUI dan alternate hostname OPNsense dengan informasi sensitif disensor',
  },
  {
    src: opnsenseManagementAccess,
    width: 1600,
    height: 718,
    group: 'MikroTik Routing & Management Access',
    caption: 'Validasi akses management OPNsense',
    alt: 'Validasi akses halaman management OPNsense',
  },
  {
    src: suricataNetmapIps,
    width: 1600,
    height: 747,
    group: 'IDS/IPS Configuration',
    caption: 'Suricata IDS/IPS diaktifkan menggunakan Netmap (IPS)',
    alt: 'Konfigurasi Suricata menggunakan capture mode Netmap IPS pada OPNsense',
  },
  {
    src: idsRulesets,
    width: 1600,
    height: 747,
    group: 'IDS/IPS Configuration',
    caption: 'Aktivasi ruleset IDS/IPS',
    alt: 'Daftar ruleset IDS IPS yang diaktifkan pada OPNsense',
  },
  {
    src: malwarePhishingRulesets,
    width: 1600,
    height: 747,
    group: 'IDS/IPS Configuration',
    caption: 'Ruleset terkait malware, phishing, dan kategori keamanan lainnya',
    alt: 'Ruleset Suricata terkait malware phishing dan kategori keamanan lainnya',
  },
  {
    src: ipsAlertToDrop,
    width: 1600,
    height: 747,
    group: 'IDS/IPS Configuration',
    caption: 'Policy IPS untuk mengubah action dari Alert menjadi Drop',
    alt: 'Policy Suricata pada OPNsense mengubah action Alert menjadi Drop',
  },
  {
    src: ipsRulesDrop,
    width: 1600,
    height: 747,
    group: 'IDS/IPS Configuration',
    caption: 'Verifikasi rules menggunakan action Drop',
    alt: 'Verifikasi rules Suricata menggunakan action Drop pada OPNsense',
  },
  {
    src: eicarSafeTest,
    width: 1600,
    height: 253,
    group: 'Safe Validation',
    caption: 'Pengujian aman menggunakan EICAR test file untuk validasi filtering/IPS',
    alt: 'EICAR safe test pada terminal untuk validasi filtering dan IPS di lingkungan lab',
  },
]

export const projectCategories = ['Semua', 'System Administrator', 'Cybersecurity', 'Lainnya']

export const projects = [
  {
    id: 'opnsense-transparent-bridge-ids-ips',
    title: 'Implementasi OPNsense Transparent Filtering Bridge & IDS/IPS pada Lab Keamanan Jaringan',
    displayTitle: 'OPNsense Transparent Bridge & IDS/IPS Security Lab',
    category: 'Cybersecurity',
    focus: 'Network Security / Blue Team',
    cardDescription:
      'Saya membuat lab OPNsense untuk mencoba filtering bridge, firewall, dan Suricata IDS/IPS. Konfigurasinya kemudian saya cek dengan EICAR safe test.',
    problemLabel: 'Latar Belakang',
    problem:
      'Saya ingin memahami apa yang terjadi ketika OPNsense ditempatkan langsung di jalur trafik. Dari situ saya bisa melihat cara kerja bridge interface, firewall, akses management, dan IDS/IPS menggunakan Suricata.',
    solution:
      'Saya mulai dari menggambar topologi, melakukan assignment dan bridge interface OPNsense, lalu mengatur jalur management, firewall, routing, dan NAT pada MikroTik. Setelah trafik berjalan, saya mengaktifkan Suricata dalam mode IPS, memilih ruleset, mengubah policy Alert menjadi Drop, dan mengujinya secara aman dengan EICAR test file.',
    impact:
      'Dari lab ini saya mulai paham hubungan antara bridge, jalur management, firewall, routing/NAT MikroTik, dan cara ruleset Suricata dipakai dalam mode IPS.',
    learningOutcomes: [
      'Memahami cara kerja interface bridge pada OPNsense',
      'Memahami pemisahan jalur management dan trafik',
      'Memahami hubungan routing dan NAT MikroTik dengan OPNsense',
      'Memahami dasar konfigurasi firewall rule',
      'Memahami proses aktivasi Suricata IDS/IPS',
      'Memahami penggunaan ruleset dan policy Alert menjadi Drop',
      'Memahami pentingnya validasi dengan metode pengujian yang aman',
    ],
    documentedOutput:
      'Saya mendokumentasikan alur konfigurasi dari interface dan bridge, pengaturan firewall, sampai aktivasi Suricata IPS. Bagian akhirnya berisi hasil pengecekan filtering menggunakan EICAR safe test.',
    outputLabel: 'Hasil Praktik',
    techStack: [
      'OPNsense',
      'Suricata',
      'MikroTik',
      'IDS/IPS',
      'Firewall',
      'Network Security',
      'Transparent Bridge',
      'Linux',
      'EICAR',
    ],
    cardTechStack: ['OPNsense', 'Suricata', 'MikroTik', 'IDS/IPS'],
    role: 'Cybersecurity / Blue Team Intern — Hands-on Lab',
    environment: ['OPNsense', 'MikroTik RouterOS', 'Suricata IDS/IPS', 'Linux Client', 'Network Lab'],
    focusAreas: ['Transparent Bridge', 'Firewall', 'Routing / NAT', 'IDS / IPS', 'Security Validation'],
    engineeringNotes:
      'Ini adalah security lab untuk belajar selama PKL, bukan sistem production. Saya memakai EICAR antivirus test file karena memang dibuat untuk pengujian keamanan yang aman, dan hasilnya tidak saya jadikan klaim tingkat pemblokiran tertentu.',
    engineeringNotesLabel: 'Catatan pengujian aman',
    detailListLabel: 'Langkah praktik',
    architecturalDecisions: [
      'Memahami dan menyusun topologi lab keamanan jaringan',
      'Melakukan konfigurasi awal serta assignment interface WAN, LAN/bridge, dan CLIENT pada OPNsense',
      'Membuat bridge interface dan mengatur interface management, WebGUI, serta firewall rules',
      'Menyesuaikan addressing, routing, NAT, dan firewall filter pada MikroTik untuk kebutuhan akses lab',
      'Mengaktifkan Suricata IDS/IPS dengan capture mode Netmap (IPS)',
      'Mengaktifkan ruleset yang relevan, termasuk kategori malware, exploit, dan phishing yang terdokumentasi',
      'Membuat policy untuk mengubah action rule dari Alert menjadi Drop lalu memeriksa action pada rules',
      'Melakukan safe validation menggunakan EICAR test file untuk mengamati perilaku filtering dan IPS',
    ],
    image: opnsenseTopology,
    images: opnsenseSecurityLabGallery.map((item) => item.src),
    gallery: opnsenseSecurityLabGallery,
  },
  {
    id: 'p-1',
    title: 'Website Chatbot UKS & Perpustakaan (Flask) - Deployment & Operasional Service',
    category: 'System Administrator',
    problem:
      'Aplikasi chatbot UKS dan Perpustakaan sudah dibuat oleh tim. Bagian yang saya pelajari adalah bagaimana membuatnya berjalan sebagai layanan yang rapi di server.',
    solution:
      'Saya menyiapkan environment Linux, menjalankan Flask sebagai service, memasang Nginx sebagai reverse proxy, lalu mengecek endpoint UKS dan Perpustakaan satu per satu.',
    impact:
      'Dari sini saya mulai paham bahwa deployment bukan cuma menjalankan aplikasi, tetapi juga memastikan service, proxy, dan log mudah diperiksa saat ada masalah.',
    documentedOutput: 'Saya mendokumentasikan deployment serta pengecekan dua area layanan: UKS dan Perpustakaan.',
    techStack: ['Linux', 'Python', 'Flask', 'Nginx', 'Systemd', 'OpenSSH'],
    role: 'Pembelajar Junior System Administrator',
    engineeringNotes:
      'Ini proyek tim. Bagian saya berada di sisi environment Linux, service, reverse proxy, dan pengecekan setelah deployment.',
    architecturalDecisions: [
      'Pisahkan proses aplikasi Flask dan web server Nginx agar mudah dikelola',
      'Gunakan systemd supaya service bisa auto-restart saat error',
      'Pisahkan route UKS dan Perpustakaan agar troubleshooting lebih jelas',
    ],
    repositoryUrl: 'https://github.com/nabilfzn/MediBook',
    repositoryLabel: 'Lihat Repository Tim',
    image: fotoSysadmin1,
    images: [fotoSysadmin1, fotoSysadmin2, fotoSysadmin3, fotoSysadmin4],
  },
  {
    id: 'p-3',
    title: 'School Website Redesign (JHIC) - System Administrator Operations',
    category: 'System Administrator',
    problem:
      'Saat lomba JHIC, tim kami mengerjakan redesign website sekolah. Saya bertanggung jawab memastikan hasilnya bisa dijalankan dan dicek dengan baik di server.',
    solution:
      'Saya fokus di bagian System Administrator: menyiapkan Linux server dan environment deployment, menyesuaikan service web, lalu memeriksa enam halaman utama setelah rilis. Kalau ada kendala operasional, saya ikut menelusuri penyebabnya.',
    impact:
      'Proyek ini mengajarkan saya pentingnya checklist sebelum rilis dan pengecekan ulang setelah deployment, terutama saat banyak halaman dikerjakan bersama dalam satu tim.',
    documentedOutput: 'Saya mencatat hasil verifikasi deployment pada enam halaman utama website.',
    techStack: ['Linux Server', 'Deployment & Server Configuration', 'React.js', 'Laravel', 'REST API', 'Git & GitHub'],
    role: 'System Administrator (Fokus Utama dalam Tim)',
    engineeringNotes:
      'Proyek ini dikerjakan dalam tim. Kontribusi saya difokuskan pada setup server, deployment, dan pengecekan operasional halaman.',
    architecturalDecisions: [
      'Gunakan checklist pre-release untuk memastikan konfigurasi server dan dependency siap sebelum deploy',
      'Lakukan verifikasi halaman prioritas setelah rilis untuk menekan potensi bug yang lolos',
      'Pisahkan proses deploy dan proses monitoring supaya penanganan insiden lebih cepat',
    ],
    repositoryUrl: 'https://github.com/Iszz100/unauthorized_no_backend',
    repositoryLabel: 'Lihat Repository Tim',
    image: berandaSekolah,
    images: [berandaSekolah, profileSekolah, hubunganIndustri, digitalTalentProgram, ekstrakurikulerSekolah, profileJurusan],
  },
  {
    id: 'p-5',
    title: 'Website Swara Jatim - Deployment Ubuntu Server & Docker',
    category: 'System Administrator',
    problem:
      'Website Swara Jatim perlu dijalankan di Ubuntu Server dengan setup yang konsisten dan tetap mudah dicek ketika tim melakukan update.',
    solution:
      'Saya menangani sisi deployment: menyiapkan Ubuntu Server, menjalankan service web di dalam Docker, lalu mengecek Home, Galeri, Swara Jatim AI, dan Mini Game setelah container aktif.',
    impact:
      'Lewat proyek ini saya lebih terbiasa memisahkan tahap setup server, build container, rilis, dan pengecekan supaya masalah lebih mudah dilacak.',
    documentedOutput: 'Saya mendokumentasikan setup Ubuntu Server, container Docker, dan hasil pengecekan empat bagian website.',
    techStack: ['Ubuntu Server', 'Docker', 'Linux Administration', 'Web Deployment', 'Service Validation', 'Troubleshooting'],
    role: 'System Administrator - Deployment (Ubuntu & Docker)',
    engineeringNotes:
      'Ini proyek tim. Fokus saya adalah kesiapan Ubuntu Server, container Docker, dan pengecekan layanan setelah rilis.',
    architecturalDecisions: [
      'Gunakan Docker untuk standarisasi environment deploy agar lebih konsisten antar proses rilis',
      'Lakukan pengecekan lintas halaman setelah deploy untuk memastikan semua endpoint frontend bisa diakses',
      'Pisahkan tahap setup server, build image, dan verifikasi operasional supaya troubleshooting lebih cepat',
    ],
    image: projectSysadminDeploy1,
    images: [projectSysadminDeploy1, projectSysadminDeploy2, projectSysadminDeploy3, projectSysadminDeploy4],
  },
  {
    id: 'p-2',
    title: 'Proyek DigiUp Cybersecurity - Defense Against Slow HTTP DDoS Attack',
    category: 'Cybersecurity',
    problem:
      'Saya ingin melihat bagaimana web service Flask bereaksi saat menerima simulasi Slow HTTP di server Linux milik proyek sendiri.',
    solution:
      'Saya menjalankan slowhttptest di lingkungan lab sambil memantau resource server. Setelah melihat hasilnya, saya mengganti server aplikasi ke Gunicorn, mematikan mode debug Flask, dan menambahkan restart policy di Docker Compose.',
    impact:
      'Bagian paling berguna dari latihan ini adalah membandingkan kondisi layanan sebelum dan sesudah konfigurasi diubah, bukan sekadar menjalankan tool pengujian.',
    documentedOutput: 'Catatan pengujian mencakup error 502, penggunaan resource, konfigurasi Gunicorn, slowhttptest, dan restart policy Docker Compose.',
    techStack: [
      'Cybersecurity',
      'Security Testing Lab',
      'SlowHTTPTest',
      'Flask',
      'Gunicorn',
      'Docker Compose',
      'Linux Server',
      'Monitoring',
    ],
    role: 'Pembelajar Cybersecurity',
    engineeringNotes:
      'Semua pengujian dilakukan di lingkungan lab milik proyek sendiri untuk belajar respons layanan dan hardening dasar, bukan pada sistem pihak lain.',
    architecturalDecisions: [
      'Gunakan Gunicorn sebagai WSGI server agar handling koneksi lebih stabil dibanding mode development',
      'Nonaktifkan mode debug Flask dan rapikan konfigurasi runtime agar lebih aman',
      'Terapkan restart policy Docker Compose untuk menjaga service tetap pulih otomatis setelah gangguan',
    ],
    image: cyberPhoto1,
    images: [cyberPhoto1, cyberPhoto0, cyberPhoto2, cyberPhoto3, cyberPhoto4, cyberPhoto5, cyberPhoto6, cyberPhoto7],
  },
  {
    id: 'p-4',
    title: 'Smart Home IoT + AI - Dashboard Monitoring dan Kontrol (Flask)',
    category: 'Lainnya',
    problem:
      'Di proyek tim ini, kami ingin membuat perangkat smart home bisa dipantau dan dikendalikan dari satu dashboard sederhana.',
    solution:
      'Bagian saya adalah membuat dashboard Flask yang menampilkan data IoT secara real-time. Di sana pengguna bisa melihat status sensor LDR dan MQ-135, servo, buzzer, serta hasil integrasi ESP32-CAM untuk verifikasi akses pintu.',
    impact:
      'Dari proyek ini saya belajar menghubungkan data perangkat dengan tampilan web dan membuat status sistem cukup jelas untuk dipahami pengguna.',
    documentedOutput: 'Saya mendokumentasikan tampilan sensor gas dan cahaya, aktuator ventilasi dan pintu, serta integrasi ESP32-CAM.',
    techStack: [
      'Flask',
      'Python',
      'IoT Dashboard',
      'ESP32-CAM',
      'LDR Sensor',
      'MQ-135',
      'Servo',
      'Buzzer',
      'Face Recognition',
    ],
    role: 'Pengembang Dashboard Flask dalam Tim IoT',
    engineeringNotes:
      'Proyek ini dikerjakan dalam tim. Kontribusi saya berada pada dashboard Flask dan alur pengecekan data perangkat.',
    architecturalDecisions: [
      'Pisahkan layer pembacaan sensor dan layer tampilan dashboard agar debugging lebih cepat',
      'Gunakan endpoint Flask terstruktur untuk update status perangkat secara konsisten',
      'Rancang UI monitoring sederhana agar perubahan kondisi perangkat langsung terlihat',
    ],
    repositoryUrl: 'https://github.com/Iszz100/UKL_SMART_HOME_IOT',
    repositoryLabel: 'Lihat Repository Tim',
    image: iotAiDoc3,
    images: [iotAiDoc1, iotAiDoc2, iotAiDoc3, iotAiDoc4, iotAiDoc5, iotAiDoc6, iotAiDoc7, iotAiDoc8, iotAiDoc10, iotAiDoc11],
  },
]
