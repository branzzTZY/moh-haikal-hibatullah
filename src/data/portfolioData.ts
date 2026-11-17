export interface StudentIdentity {
  fullName: string;
  shortName: string;
  className: string;
  department: string;
  departmentCode: string;
  school: string;
  schoolAddress: string;
  academicYear: string;
  domicile: string;
  email: string;
  focusArea: string;
  statement: string;
}

export interface CompetencyItem {
  id: string;
  number: string;
  category: 'Instalasi Bangunan' | 'Kontrol & Panel' | 'Alat Ukur & K3';
  title: string;
  standardRef: string;
  description: string;
  tools: string[];
  readinessLabel: string;
}

export interface PracticumProject {
  id: string;
  title: string;
  category: 'Instalasi 1 Fasa' | 'Panel & Kontrol' | 'Gambar Teknik';
  semester: string;
  dateLabel: string;
  imageSrc: string;
  imageAlt: string;
  summary: string;
  specifications: {
    label: string;
    value: string;
  }[];
  learningOutcome: string;
  featured?: boolean;
}

export interface AcademicRecord {
  period: string;
  institution: string;
  program: string;
  detail: string;
}

export interface EvaluationRecord {
  code: string;
  title: string;
  aspect: string;
  result: string;
  notes: string;
}

export const STUDENT_PROFILE: StudentIdentity = {
  fullName: 'Moh. Haikal Hibatullah',
  shortName: 'Moh. Haikal Hibatullah',
  className: 'X TITL 2',
  department: 'Teknik Instalasi Tenaga Listrik',
  departmentCode: 'TITL',
  school: 'SMKN 1 Sidayu',
  schoolAddress: 'Jl. Raya Wadeng, Kec. Sidayu, Kabupaten Gresik, Jawa Timur 61153',
  academicYear: '2026 / 2027',
  domicile: 'Sidayu, Kabupaten Gresik, Jawa Timur',
  email: 'haikal.hibatullah.titl@smkn1sidayu.sch.id',
  focusArea: 'Instalasi Penerangan 1 Fasa, Panel Kontrol Dasar & Keselamatan Kerja K3LH',
  statement:
    'Siswa aktif Kelas X TITL 2 Program Keahlian Teknik Instalasi Tenaga Listrik di SMKN 1 Sidayu yang berdedikasi pada ketelitian perakitan rangkaian listrik, kepatuhan terhadap standar PUIL, serta penerapan prosedur keselamatan dan kesehatan kerja di lingkungan bengkel ketenagalistrikan.',
};

export const HERO_PORTRAIT_IMAGE = '/src/assets/images/portrait_haikal_mikey_style_1794892746563.jpg';

export const EDUCATION_RECORDS: AcademicRecord[] = [
  {
    period: '2026 — Sekarang',
    institution: 'SMKN 1 Sidayu, Kabupaten Gresik',
    program: 'Kompetensi Keahlian Teknik Instalasi Tenaga Listrik (X TITL 2)',
    detail:
      'Mempelajari dasar-dasar teknik ketenagalistrikan, gambar teknik instalasi, pengukuran besaran listrik, instalasi penerangan satu fasa, serta prinsip kerja panel kendali elektromekanis.',
  },
  {
    period: '2023 — 2026',
    institution: 'Jenjang Sekolah Menengah Pertama (SMP / MTs)',
    program: 'Pendidikan Dasar Menengah Pertama',
    detail:
      'Menyelesaikan pendidikan menengah pertama dengan ketertarikan kuat pada bidang IPA terapan, fisika kelistrikan dasar, dan kegiatan praktik teknologi sederhana.',
  },
];

export const COMPETENCY_ITEMS: CompetencyItem[] = [
  {
    id: 'comp-1',
    number: '01',
    category: 'Alat Ukur & K3',
    title: 'Keselamatan, Kesehatan Kerja, dan Lingkungan Hidup (K3LH)',
    standardRef: 'SOP Bengkel TITL · PUIL 2011/2020',
    description:
      'Penerapan alat pelindung diri (APD) bengkel listrik, prosedur isolasi sumber tegangan sebelum pengerjaan rangkaian, serta pencegahan bahaya hubung singkat dan arus bocor.',
    tools: ['Sepatu Safety Isolasi', 'Sarung Tangan Kerja', 'Tespen & LOTO Dasar'],
    readinessLabel: 'Kompeten Dasar',
  },
  {
    id: 'comp-2',
    number: '02',
    category: 'Alat Ukur & K3',
    title: 'Pengukuran Besaran Listrik & Pengujian Kontinuitas',
    standardRef: 'Standar Pengukuran Laboratorium Dasar',
    description:
      'Penggunaan multimeter analog dan digital untuk mengukur tegangan AC/DC, arus beban, nilai resistansi penghantar, serta pengujian kontinuitas sebelum pengoperasian rangkaian.',
    tools: ['Multimeter Digital', 'Tang Ampere', 'Insulation Tester (Pengenalan)'],
    readinessLabel: 'Kompeten Dasar',
  },
  {
    id: 'comp-3',
    number: '03',
    category: 'Instalasi Bangunan',
    title: 'Instalasi Penerangan & Stop Kontak 1 Fasa',
    standardRef: 'PUIL · Kode Warna Penghantar SNI',
    description:
      'Perakitan instalasi sakelar tunggal, sakelar seri, sakelar tukar, kotak kontak berarde, dan pembagian grup pengaman MCB di dalam papan latihan pipa PVC.',
    tools: ['Kabel NYA 1.5/2.5 mm²', 'Pipa Conduit PVC', 'MCB 1 Fasa & Kotak Bagi'],
    readinessLabel: 'Praktikum Aktif',
  },
  {
    id: 'comp-4',
    number: '04',
    category: 'Instalasi Bangunan',
    title: 'Pembacaan & Pembuatan Gambar Teknik Listrik',
    standardRef: 'Simbol Diagram Satu Garis & Pengawatan',
    description:
      'Penyusunan diagram satu garis (single-line diagram), diagram pengawatan (wiring diagram), dan tata letak komponen sesuai simbol standar kelistrikan.',
    tools: ['Alat Gambar Teknik', 'Kertas Milimeter / A3', 'Simbol Standar IEC/PUIL'],
    readinessLabel: 'Kompeten Dasar',
  },
  {
    id: 'comp-5',
    number: '05',
    category: 'Kontrol & Panel',
    title: 'Pengenalan Rangkaian Kontrol Kontaktor Magnetik',
    standardRef: 'Rangkaian Pengunci (Self-Holding) Dasar',
    description:
      'Memahami prinsip kerja koil kontaktor, kontak bantu NO/NC, tombol tekan Start/Stop, dan proteksi Thermal Overload Relay (TOR) pada panel kontrol motor.',
    tools: ['Kontaktor Magnetik', 'Push Button NO/NC', 'Rel DIN & Kabel Kontrol'],
    readinessLabel: 'Tahap Pengenalan Lanjut',
  },
  {
    id: 'comp-6',
    number: '06',
    category: 'Kontrol & Panel',
    title: 'Kerapian Terminasi & Penataan Jalur Kabel Panel',
    standardRef: 'Standar Estetika & Keamanan Panel Industri',
    description:
      'Pengupasan isolasi penghantar secara presisi, pemasangan sepatu kabel (ferrules/skun), pengelompokan jalur ducting, dan pelabelan terminal penghantar.',
    tools: ['Tang Pengupas Kabel', 'Tang Crimping Ferrule', 'Wire Duct & Cable Ties'],
    readinessLabel: 'Praktikum Aktif',
  },
];

export const PRACTICUM_PROJECTS: PracticumProject[] = [
  {
    id: 'proj-lighting-1f',
    title: 'Papan Latihan Instalasi Penerangan 1 Fasa & Pengaman MCB',
    category: 'Instalasi 1 Fasa',
    semester: 'Semester Ganjil · Kelas X',
    dateLabel: 'Oktober 2026',
    imageSrc: '/src/assets/images/practicum_lighting_panel_1794892300625.jpg',
    imageAlt: 'Papan latihan instalasi penerangan satu fasa dengan pipa PVC, kotak sambung, dan kotak MCB',
    summary:
      'Perakitan sistem instalasi penerangan residensial sederhana menggunakan dua grup pengaman MCB, sakelar pengendali lampu, serta stop kontak berarde dengan jalur pipa PVC yang lurus dan terukur.',
    specifications: [
      { label: 'Tegangan Kerja', value: '220 V AC / 50 Hz (1 Fasa)' },
      { label: 'Penghantar', value: 'NYA 1,5 mm² (Penerangan) & 2,5 mm² (Stop Kontak)' },
      { label: 'Pengaman Utama', value: 'MCB 6 A & 10 A dalam Box PHB' },
      { label: 'Acuan Standar', value: 'Kode Warna Fasa, Netral, dan PE sesuai PUIL' },
    ],
    learningOutcome:
      'Melatih ketepatan sambungan puntir (lasdop/terminal) di dalam T-Dus, pengukuran kontinuitas sebelum penyalaan, serta kepastian tidak adanya kebocoran arus.',
    featured: true,
  },
  {
    id: 'proj-panel-wiring',
    title: 'Simulasi Perakitan Panel Kontrol Kontaktor & Terminal Blok',
    category: 'Panel & Kontrol',
    semester: 'Semester Ganjil · Kelas X',
    dateLabel: 'November 2026',
    imageSrc: '/src/assets/images/practicum_motor_control_1794892301530.jpg',
    imageAlt: 'Panel kontrol listrik dengan kontaktor magnetik, rel DIN, terminal blok, dan saluran kabel rapi',
    summary:
      'Latihan tata letak komponen kontrol pada pelat dasar panel menggunakan rel DIN, saluran kabel berlubang (wire duct), kontaktor magnetik, dan penomoran terminal penghantar yang sistematis.',
    specifications: [
      { label: 'Komponen Utama', value: '3 Kontaktor Magnetik, TOR, Terminal Blok DIN' },
      { label: 'Sistem Terminasi', value: 'Skun Ferrule Terisolasi & Label Nomor Kabel' },
      { label: 'Tegangan Kontrol', value: '220 V AC (Rangkaian Simulasi)' },
      { label: 'Fokus Penilaian', value: 'Kerapian Jalur Ducting & Kebenaran Pengawatan' },
    ],
    learningOutcome:
      'Memahami alur logika rangkaian pengunci dasar serta disiplin membaca nomor terminal koil (A1/A2) dan kontak bantu (13/14, 21/22) secara akurat.',
  },
  {
    id: 'proj-blueprint-measure',
    title: 'Gambar Skematik Rangkaian & Pengukuran Multimeter Presisi',
    category: 'Gambar Teknik',
    semester: 'Semester Ganjil · Kelas X',
    dateLabel: 'September 2026',
    imageSrc: '/src/assets/images/practicum_blueprint_multimeter_1794892301123.jpg',
    imageAlt: 'Gambar skematik rangkaian kelistrikan di samping multimeter digital dan obeng berisolasi VDE',
    summary:
      'Penyusunan dokumen gambar kerja rangkaian dasar sebelum pelaksanaan praktik bengkel, dilengkapi kalibrasi pembacaan tegangan searah dan pemeriksaan toleransi komponen pasif.',
    specifications: [
      { label: 'Media Gambar', value: 'Kertas Gambar Standar A3 / Skema Garis Lurus' },
      { label: 'Alat Ukur', value: 'Multimeter Digital True-RMS & Jangka Sorong' },
      { label: 'Perkakas Tangan', value: 'Obeng Berisolasi VDE 1000 V' },
      { label: 'Prosedur Uji', value: 'Verifikasi Tegangan, Resistansi & Polaritas' },
    ],
    learningOutcome:
      'Menanamkan kebiasaan bekerja berdasarkan gambar kerja teknis terlebih dahulu sebelum menyentuh instalasi fisik di meja praktikum.',
  },
];

export const EVALUATION_RECORDS: EvaluationRecord[] = [
  {
    code: 'EV-01',
    title: 'Kepatuhan Prosedur Keselamatan Bengkel (K3LH)',
    aspect: 'Sikap Kerja & Disiplin APD',
    result: 'Memenuhi Standar Bengkel',
    notes: 'Selalu mengenakan pakaian praktik (wearpack) lengkap dan memeriksa kondisi alat sebelum pengukuran.',
  },
  {
    code: 'EV-02',
    title: 'Ketelitian Pengawatan & Kode Warna Penghantar',
    aspect: 'Praktikum Instalasi Dasar',
    result: 'Baik & Terverifikasi',
    notes: 'Pemisahan penghantar fasa, netral, dan pembumian dilaksanakan konsisten sesuai diagram kerja.',
  },
  {
    code: 'EV-03',
    title: 'Penggunaan Alat Ukur Listrik Dasar',
    aspect: 'Laboratorium Pengukuran',
    result: 'Terampil',
    notes: 'Mampu memilih batas ukur yang tepat pada multimeter untuk menghindari kerusakan instrumen.',
  },
  {
    code: 'EV-04',
    title: 'Kedisiplinan Akademik & Kebersihan Meja Kerja',
    aspect: 'Etos Kerja Kejuruan',
    result: 'Konsisten',
    notes: 'Mengembalikan seluruh perkakas tangan ke rak inventaris dalam kondisi bersih setelah praktikum selesai.',
  },
];
