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

export const projectCategories = ['Semua', 'System Administrator', 'Cybersecurity', 'Lainnya']

export const projects = [
  {
    id: 'p-1',
    title: 'Website Chatbot UKS & Perpustakaan (Flask) - Deployment & Operasional Service',
    category: 'System Administrator',
    problem:
      'Tujuan belajar saya adalah membuat website chatbot UKS dan Perpustakaan bisa berjalan stabil di server dan siap dipakai pengguna.',
    solution:
      'Saya setup environment Linux, menyiapkan aplikasi Flask sebagai service, mengatur reverse proxy Nginx, lalu melakukan pengujian endpoint UKS dan Perpustakaan untuk memeriksa respons layanan.',
    impact:
      'Saya belajar alur end-to-end dari deployment, konfigurasi service, sampai troubleshooting berbasis log untuk menjaga layanan tetap online.',
    documentedOutput: 'Deployment layanan chatbot dengan dua area layanan yang terdokumentasi: UKS dan Perpustakaan.',
    techStack: ['Linux', 'Python', 'Flask', 'Nginx', 'Systemd', 'OpenSSH'],
    role: 'Pembelajar Junior System Administrator',
    engineeringNotes:
      'Kontribusi saya berfokus pada kesiapan environment Linux, pengelolaan service, reverse proxy, dan pengecekan operasional setelah deployment.',
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
      'Tujuan belajar saya adalah memastikan hasil redesign website sekolah dari lomba JHIC bisa di-deploy dengan rapi, stabil, dan siap dipakai pada banyak halaman utama.',
    solution:
      'Di tim, saya pegang fokus System Administrator: setup Linux server, konfigurasi environment deploy, penyesuaian service web, validasi rilis lintas halaman (Beranda, Profil Sekolah, Hubungan Industri, DTP, Ekstrakurikuler, Profil Jurusan), dan troubleshooting saat ditemukan kendala operasional.',
    impact:
      'Saya belajar menyusun proses rilis dari pengecekan kesiapan server, deployment, sampai verifikasi operasional setelah website dijalankan.',
    documentedOutput: 'Enam halaman utama masuk dalam cakupan verifikasi deployment tim.',
    techStack: ['Linux Server', 'Deployment & Server Configuration', 'React.js', 'Laravel', 'REST API', 'Git & GitHub'],
    role: 'System Administrator (Fokus Utama dalam Tim)',
    engineeringNotes:
      'Proyek dikerjakan dalam tim; kontribusi saya difokuskan pada setup server, proses deployment, dan verifikasi operasional halaman.',
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
      'Tujuan belajar saya adalah menyiapkan hasil pengembangan website Swara Jatim agar bisa di-deploy dengan stabil di server Ubuntu dan tetap mudah dikelola saat update fitur.',
    solution:
      'Saya berperan di sisi deployment: menyiapkan environment Ubuntu Server, membungkus service web dengan Docker, menjalankan container untuk aplikasi, dan melakukan validasi akses halaman utama seperti Home, Galeri, Swara Jatim AI, dan Mini Game.',
    impact:
      'Saya belajar alur operasional deployment yang lebih rapi: dari setup server, build container, proses rilis, sampai pengecekan hasil publish agar website tetap konsisten dan siap dipakai user.',
    documentedOutput: 'Deployment mendokumentasikan Ubuntu Server, container Docker, dan verifikasi empat area halaman.',
    techStack: ['Ubuntu Server', 'Docker', 'Linux Administration', 'Web Deployment', 'Service Validation', 'Troubleshooting'],
    role: 'System Administrator - Deployment (Ubuntu & Docker)',
    engineeringNotes:
      'Kontribusi saya berfokus pada kesiapan Ubuntu Server, container Docker, dan pengecekan layanan setelah proses rilis.',
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
      'Tujuan belajar saya adalah menguji dan meningkatkan ketahanan web service Flask terhadap simulasi serangan Slow HTTP DDoS di lingkungan server Linux.',
    solution:
      'Saya melakukan simulasi serangan dengan slowhttptest, monitoring performa server saat serangan berjalan, lalu memperkuat konfigurasi aplikasi menggunakan Gunicorn, optimasi Flask (non-debug), dan restart policy di Docker Compose.',
    impact:
      'Saya belajar membandingkan perilaku layanan sebelum dan sesudah perubahan konfigurasi, dari layer aplikasi sampai container.',
    documentedOutput: 'Dokumentasi pengujian mencakup kondisi 502, monitoring resource, konfigurasi Gunicorn, slowhttptest, dan restart policy Docker Compose.',
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
      'Pengujian dilakukan pada lingkungan lab proyek sendiri untuk mempelajari respons layanan dan hardening dasar, bukan pada sistem pihak lain.',
    architecturalDecisions: [
      'Gunakan Gunicorn sebagai WSGI server agar handling koneksi lebih stabil dibanding mode development',
      'Nonaktifkan mode debug Flask dan rapikan konfigurasi runtime agar lebih aman',
      'Terapkan restart policy Docker Compose untuk menjaga service tetap pulih otomatis setelah gangguan',
    ],
    image: cyberPhoto7,
    images: [cyberPhoto0, cyberPhoto1, cyberPhoto2, cyberPhoto3, cyberPhoto4, cyberPhoto5, cyberPhoto6, cyberPhoto7],
  },
  {
    id: 'p-4',
    title: 'Smart Home IoT + AI - Dashboard Monitoring dan Kontrol (Flask)',
    category: 'Lainnya',
    problem:
      'Tujuan belajar saya adalah membuat sistem Smart Home yang lebih praktis, efisien, dan terkontrol, supaya perangkat rumah bisa dipantau dan dikendalikan tanpa proses manual penuh.',
    solution:
      'Saya berperan di bagian pengembangan web dashboard menggunakan Flask untuk tampilan data IoT secara real-time. Dashboard ini menampilkan status sensor LDR, sensor gas MQ-135, aktuator servo, buzzer alarm, dan integrasi ESP32-CAM untuk face recognition sebagai verifikasi akses pintu.',
    impact:
      'Dari proyek ini saya belajar merancang alur sistem end-to-end: membaca data perangkat, menampilkan status ke dashboard, memberi respons terhadap kondisi tertentu, dan memastikan antarmuka mudah dipakai pengguna.',
    documentedOutput: 'Dashboard mendokumentasikan sensor gas, sensor cahaya, aktuator ventilasi dan pintu, serta integrasi ESP32-CAM.',
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
      'Proyek dikerjakan dalam tim; kontribusi saya berada pada dashboard Flask untuk menampilkan status perangkat dan mendukung alur pengujian.',
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
