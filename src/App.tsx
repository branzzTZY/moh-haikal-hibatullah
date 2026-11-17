import { FormEvent, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  FileText,
  Mail,
  MapPin,
  Printer,
  School,
} from 'lucide-react';
import { DossierPrintModal } from './components/DossierPrintModal';
import { Header } from './components/Header';
import { ProjectLightbox } from './components/ProjectLightbox';
import { ResilientImage } from './components/ResilientImage';
import {
  COMPETENCY_ITEMS,
  EDUCATION_RECORDS,
  EVALUATION_RECORDS,
  HERO_PORTRAIT_IMAGE,
  PRACTICUM_PROJECTS,
  STUDENT_PROFILE,
  type CompetencyItem,
  type PracticumProject,
} from './data/portfolioData';

type CompetencyFilter = 'Semua' | CompetencyItem['category'];
type ProjectFilter = 'Semua Karya' | PracticumProject['category'];

const COMPETENCY_FILTERS: CompetencyFilter[] = [
  'Semua',
  'Instalasi Bangunan',
  'Kontrol & Panel',
  'Alat Ukur & K3',
];

const PROJECT_FILTERS: ProjectFilter[] = [
  'Semua Karya',
  'Instalasi 1 Fasa',
  'Panel & Kontrol',
  'Gambar Teknik',
];

export default function App() {
  const [competencyFilter, setCompetencyFilter] = useState<CompetencyFilter>('Semua');
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>('Semua Karya');
  const [selectedProject, setSelectedProject] = useState<PracticumProject | null>(null);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // Form state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [inquiryPurpose, setInquiryPurpose] = useState('Informasi Akademik & Pembimbingan');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredCompetencies = useMemo(() => {
    if (competencyFilter === 'Semua') return COMPETENCY_ITEMS;
    return COMPETENCY_ITEMS.filter((item) => item.category === competencyFilter);
  }, [competencyFilter]);

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'Semua Karya') return PRACTICUM_PROJECTS;
    return PRACTICUM_PROJECTS.filter((project) => project.category === projectFilter);
  }, [projectFilter]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(STUDENT_PROFILE.email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2500);
    } catch {
      setEmailCopied(false);
    }
  };

  const handleInquirySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = senderName.trim();
    const trimmedEmail = senderEmail.trim();
    const trimmedMessage = inquiryMessage.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormError('Mohon lengkapi nama pengirim, alamat email, dan isi pesan terlebih dahulu.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError('Format alamat email belum sesuai. Mohon periksa kembali.');
      return;
    }

    setFormError(null);
    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setSenderName('');
    setSenderEmail('');
    setInquiryPurpose('Informasi Akademik & Pembimbingan');
    setInquiryMessage('');
    setFormError(null);
    setFormSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header onOpenPrintModal={() => setPrintModalOpen(true)} />

      <main className="flex-1 no-print">
        {/* HERO SECTION: Split-Screen Editorial Layout */}
        <section
          id="beranda"
          className="bg-white border-b border-slate-200"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Formal Typographic Hierarchy */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8 py-2">
                <div className="space-y-5">
                  <p className="text-xs sm:text-sm font-medium text-slate-600 font-mono tabular-nums">
                    {STUDENT_PROFILE.school} · Kelas {STUDENT_PROFILE.className} ·{' '}
                    {STUDENT_PROFILE.department}
                  </p>

                  <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-slate-900 leading-[1.14] text-balance">
                    Portofolio Akademik &amp; Kompetensi Teknik Instalasi Tenaga Listrik
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                    Dokumen portofolio digital resmi atas nama{' '}
                    <span className="font-semibold text-slate-900">
                      {STUDENT_PROFILE.fullName}
                    </span>
                    . Memuat catatan capaian pembelajaran kejuruan, dokumentasi
                    praktikum bengkel instalasi penerangan satu fasa, pengenalan
                    panel kontrol, serta kedisiplinan prosedur keselamatan kerja
                    K3LH.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#praktikum"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
                  >
                    <span>Lihat Dokumentasi Praktikum</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setPrintModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
                  >
                    <Printer className="w-4 h-4 text-amber-700" />
                    <span>Ringkasan Dossier PDF</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Matching-height Formal Student Portrait */}
              <div className="lg:col-span-5">
                <div className="h-full flex flex-col rounded-2xl border border-slate-200 bg-slate-100 overflow-hidden">
                  <div className="relative flex-1 min-h-[340px] sm:min-h-[400px] lg:min-h-0">
                    <ResilientImage
                      src={HERO_PORTRAIT_IMAGE}
                      alt="Foto formal Moh. Haikal Hibatullah mengenakan seragam praktik bengkel teknik instalasi tenaga listrik"
                      fallbackTitle={STUDENT_PROFILE.fullName}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between gap-4">
                    <span className="text-xs font-medium text-slate-900 truncate">
                      {STUDENT_PROFILE.fullName}
                    </span>
                    <span className="text-xs font-mono tabular-nums text-slate-500 whitespace-nowrap shrink-0">
                      {STUDENT_PROFILE.className} · {STUDENT_PROFILE.departmentCode}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Institutional Summary Strip Below Hero Split */}
            <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <div className="space-y-1">
                <p className="text-xs text-slate-500">Kelas &amp; Rombongan Belajar</p>
                <p className="font-display text-lg font-semibold text-slate-900 tabular-nums">
                  {STUDENT_PROFILE.className}
                </p>
                <p className="text-xs text-slate-600 font-mono tabular-nums">
                  Tahun Ajaran {STUDENT_PROFILE.academicYear}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-500">Program Keahlian</p>
                <p className="font-display text-lg font-semibold text-slate-900">
                  {STUDENT_PROFILE.department}
                </p>
                <p className="text-xs text-slate-600">
                  Bidang Teknik Ketenagalistrikan
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-500">Satuan Pendidikan</p>
                <p className="font-display text-lg font-semibold text-slate-900">
                  {STUDENT_PROFILE.school}
                </p>
                <p className="text-xs text-slate-600">
                  Kabupaten Gresik, Jawa Timur
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-500">Acuan Standar Praktik</p>
                <p className="font-display text-lg font-semibold text-slate-900">
                  PUIL &amp; K3LH Bengkel
                </p>
                <p className="text-xs text-slate-600">
                  Instalasi 1 Fasa &amp; Pengukuran
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 01: PROFIL AKADEMIK & RIWAYAT PENDIDIKAN */}
        <section id="profil" className="py-16 lg:py-20 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-mono text-amber-700 font-medium mb-2">
                01. Profil Akademik
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
                Identitas Siswa &amp; Latar Belakang Pendidikan
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              {/* Identitas Resmi Table */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
                <h3 className="font-display text-base font-semibold text-slate-900 pb-4 border-b border-slate-200">
                  Data Identitas Siswa
                </h3>
                <dl className="divide-y divide-slate-100">
                  <div className="py-3.5 flex flex-col gap-0.5">
                    <dt className="text-xs text-slate-500">Nama Lengkap</dt>
                    <dd className="text-sm font-semibold text-slate-900">
                      {STUDENT_PROFILE.fullName}
                    </dd>
                  </div>
                  <div className="py-3.5 flex flex-col gap-0.5">
                    <dt className="text-xs text-slate-500">Kelas</dt>
                    <dd className="text-sm font-medium text-slate-900 font-mono tabular-nums">
                      {STUDENT_PROFILE.className}
                    </dd>
                  </div>
                  <div className="py-3.5 flex flex-col gap-0.5">
                    <dt className="text-xs text-slate-500">Konsentrasi Keahlian</dt>
                    <dd className="text-sm font-medium text-slate-900">
                      {STUDENT_PROFILE.department} (Listrik)
                    </dd>
                  </div>
                  <div className="py-3.5 flex flex-col gap-0.5">
                    <dt className="text-xs text-slate-500">Sekolah</dt>
                    <dd className="text-sm font-medium text-slate-900">
                      {STUDENT_PROFILE.school}
                    </dd>
                  </div>
                  <div className="py-3.5 flex flex-col gap-0.5">
                    <dt className="text-xs text-slate-500">Domisili</dt>
                    <dd className="text-sm font-medium text-slate-900">
                      {STUDENT_PROFILE.domicile}
                    </dd>
                  </div>
                  <div className="pt-3.5 flex flex-col gap-0.5">
                    <dt className="text-xs text-slate-500">Status Akademik</dt>
                    <dd className="text-sm font-medium text-slate-900">
                      Siswa Aktif · Tahun Ajaran {STUDENT_PROFILE.academicYear}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Ringkasan Kompetensi & Riwayat Pendidikan */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    Pernyataan Tujuan &amp; Etos Kerja Kejuruan
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {STUDENT_PROFILE.statement}
                  </p>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Pada tingkat kelas X, pembelajaran difokuskan pada penguasaan
                    fondasi teknik kelistrikan yang kuat: membaca gambar kerja
                    dengan akurat, mengkalibrasi serta mengoperasikan alat ukur
                    listrik dengan aman, dan membiasakan kerapian pengawatan
                    sebagai bagian dari budaya mutu teknisi instalasi listrik.
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-200 space-y-5">
                  <h3 className="font-display text-base font-semibold text-slate-900">
                    Riwayat Pendidikan Formal
                  </h3>
                  <div className="space-y-5">
                    {EDUCATION_RECORDS.map((record) => (
                      <div
                        key={record.period}
                        className="pb-5 border-b border-slate-200 last:border-b-0 last:pb-0 space-y-1.5"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <h4 className="text-sm font-semibold text-slate-900">
                            {record.institution}
                          </h4>
                          <span className="text-xs font-mono tabular-nums text-slate-500 shrink-0">
                            {record.period}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-amber-700">
                          {record.program}
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {record.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: KOMPETENSI TEKNIK & STANDAR K3LH */}
        <section
          id="kompetensi"
          className="py-16 lg:py-20 bg-white border-b border-slate-200"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <p className="text-xs font-mono text-amber-700 font-medium mb-2">
                  02. Kompetensi Keahlian
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
                  Bidang Keahlian &amp; Penguasaan Perangkat Teknik
                </h2>
              </div>

              {/* Interactive Segmented Filter Control */}
              <div
                role="tablist"
                aria-label="Filter kategori kompetensi"
                className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 self-start lg:self-auto"
              >
                {COMPETENCY_FILTERS.map((category) => {
                  const isActive = competencyFilter === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setCompetencyFilter(category)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-700 ${
                        isActive
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompetencies.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col justify-between bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 font-mono tabular-nums">
                      <span>
                        {item.number} · {item.category}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-slate-900 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 space-y-2.5">
                    <div className="text-xs text-slate-500">
                      <span className="font-medium text-slate-700">Perangkat: </span>
                      <span>{item.tools.join(' · ')}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-xs pt-1">
                      <span className="text-slate-500 truncate">{item.standardRef}</span>
                      <span className="inline-flex items-center gap-1 font-medium text-amber-700 whitespace-nowrap shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item.readinessLabel}</span>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 03: DOKUMENTASI PROYEK & PRAKTIKUM BENGKEL */}
        <section id="praktikum" className="py-16 lg:py-20 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <p className="text-xs font-mono text-amber-700 font-medium mb-2">
                  03. Dokumentasi Praktikum
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
                  Hasil Karya Bengkel &amp; Lembar Kerja Siswa
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Pilih kartu praktikum untuk melihat spesifikasi tegangan, komponen
                  utama, serta ringkasan capaian pengujian.
                </p>
              </div>

              {/* Project Category Filter Tabs */}
              <div
                role="tablist"
                aria-label="Filter kategori praktikum"
                className="inline-flex flex-wrap items-center gap-1 p-1 bg-white rounded-lg border border-slate-200 self-start lg:self-auto"
              >
                {PROJECT_FILTERS.map((filter) => {
                  const isActive = projectFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setProjectFilter(filter)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-700 ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {filteredProjects.map((project, index) => {
                const isFeaturedLayout =
                  filteredProjects.length === 3 && index === 0;

                return (
                  <article
                    key={project.id}
                    className={`group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden transition-shadow duration-150 hover:shadow-md ${
                      isFeaturedLayout
                        ? 'lg:col-span-7 lg:row-span-2'
                        : filteredProjects.length === 1
                          ? 'lg:col-span-8'
                          : 'lg:col-span-5'
                    }`}
                  >
                    <div
                      className={`overflow-hidden bg-slate-100 ${
                        isFeaturedLayout ? 'h-72 sm:h-96 lg:flex-1' : 'h-56 sm:h-64'
                      }`}
                    >
                      <ResilientImage
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        fallbackTitle={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>

                    <div className="p-6 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <p className="text-xs text-slate-500 font-mono tabular-nums">
                          {project.category} · {project.semester} · {project.dateLabel}
                        </p>

                        <h3 className="font-display text-lg sm:text-xl font-semibold text-slate-900 leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          {project.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
                        <span className="text-xs font-mono tabular-nums text-slate-500 truncate">
                          {project.specifications[0]?.value}
                        </span>

                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-700"
                        >
                          <span>Lihat Spesifikasi</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 04: EVALUASI BENGKEL & SIKAP KERJA */}
        <section
          id="evaluasi"
          className="py-16 lg:py-20 bg-white border-b border-slate-200"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-mono text-amber-700 font-medium mb-2">
                04. Evaluasi &amp; Disiplin Kerja
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
                Rekapitulasi Sikap Kerja &amp; Kepatuhan Standar Bengkel
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                    <th className="py-3.5 px-5 font-mono">Kode</th>
                    <th className="py-3.5 px-5">Indikator Evaluasi</th>
                    <th className="py-3.5 px-5">Aspek Penilaian</th>
                    <th className="py-3.5 px-5">Capaian</th>
                    <th className="py-3.5 px-5">Catatan Pelaksanaan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm bg-white">
                  {EVALUATION_RECORDS.map((row) => (
                    <tr key={row.code} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-5 font-mono tabular-nums text-xs text-slate-500 whitespace-nowrap">
                        {row.code}
                      </td>
                      <td className="py-4 px-5 font-medium text-slate-900 min-w-[220px]">
                        {row.title}
                      </td>
                      <td className="py-4 px-5 text-slate-600 whitespace-nowrap">
                        {row.aspect}
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 font-medium text-amber-700">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>{row.result}</span>
                        </span>
                      </td>
                      <td className="py-4 px-5 text-slate-600 min-w-[260px] leading-relaxed">
                        {row.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 05: KONTAK & VERIFIKASI AKADEMIK */}
        <section id="kontak" className="py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <p className="text-xs font-mono text-amber-700 font-medium mb-2">
                    05. Kontak &amp; Korespondensi
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
                    Informasi Sekolah &amp; Korespondensi Resmi
                  </h2>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    Untuk keperluan verifikasi portofolio akademik, bimbingan
                    kompetensi keahlian, atau komunikasi resmi terkait kegiatan
                    pembelajaran siswa di {STUDENT_PROFILE.school}.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
                  <div className="flex items-start gap-3.5">
                    <School className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500">Satuan Pendidikan</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {STUDENT_PROFILE.school} — Jurusan {STUDENT_PROFILE.department}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                    <MapPin className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500">Alamat Institusi</p>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {STUDENT_PROFILE.schoolAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3 pt-4 border-t border-slate-100">
                    <div className="flex items-start gap-3.5 min-w-0">
                      <Mail className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">Surel Portofolio Siswa</p>
                        <p className="text-sm font-mono text-slate-900 truncate">
                          {STUDENT_PROFILE.email}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Salin alamat surel siswa"
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-700"
                    >
                      {emailCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-amber-700" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setPrintModalOpen(true)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-800 bg-slate-50 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-700"
                    >
                      <FileText className="w-4 h-4 text-amber-700" />
                      <span>Buka Ringkasan Dossier Siap Cetak</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Formal Inquiry Form */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
                <h3 className="font-display text-lg font-semibold text-slate-900 mb-1">
                  Formulir Pesan Resmi
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  Kirimkan catatan evaluasi, pertanyaan akademik, atau undangan
                  kegiatan kejuruan.
                </p>

                {formSubmitted ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-slate-900">
                          Pesan Anda Siap Dikirimkan
                        </h4>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          Terima kasih, <span className="font-medium">{senderName}</span>.
                          Ringkasan pesan untuk keperluan{' '}
                          <span className="font-medium">{inquiryPurpose}</span> telah
                          tercatat secara lokal. Anda dapat meneruskannya langsung
                          melalui aplikasi surel Anda.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={`mailto:${STUDENT_PROFILE.email}?subject=${encodeURIComponent(
                          `[${inquiryPurpose}] Pesan dari ${senderName}`
                        )}&body=${encodeURIComponent(
                          `Nama: ${senderName}\nEmail: ${senderEmail}\n\n${inquiryMessage}`
                        )}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Buka di Aplikasi Email</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        Kirim Pesan Lain
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="sender-name"
                          className="block text-xs font-medium text-slate-700"
                        >
                          Nama Lengkap / Instansi
                        </label>
                        <input
                          id="sender-name"
                          type="text"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="Contoh: Bapak Ahmad, S.Pd. / PT Mitra Teknik"
                          className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/15"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="sender-email"
                          className="block text-xs font-medium text-slate-700"
                        >
                          Alamat Email
                        </label>
                        <input
                          id="sender-email"
                          type="email"
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          placeholder="nama@instansi.sch.id"
                          className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/15"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="inquiry-purpose"
                        className="block text-xs font-medium text-slate-700"
                      >
                        Keperluan Korespondensi
                      </label>
                      <select
                        id="inquiry-purpose"
                        value={inquiryPurpose}
                        onChange={(e) => setInquiryPurpose(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/15"
                      >
                        <option value="Informasi Akademik & Pembimbingan">
                          Informasi Akademik &amp; Pembimbingan
                        </option>
                        <option value="Verifikasi Portofolio Praktikum">
                          Verifikasi Portofolio Praktikum
                        </option>
                        <option value="Kunjungan Industri / Program Kejuruan">
                          Kunjungan Industri / Program Kejuruan
                        </option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="inquiry-message"
                        className="block text-xs font-medium text-slate-700"
                      >
                        Isi Pesan
                      </label>
                      <textarea
                        id="inquiry-message"
                        rows={4}
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        placeholder="Tuliskan pesan atau catatan resmi Anda di sini..."
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/15 resize-y"
                      />
                    </div>

                    {formError && (
                      <p role="alert" className="text-xs font-medium text-red-700">
                        {formError}
                      </p>
                    )}

                    <div className="flex items-center justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
                      >
                        Siapkan Pesan
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Formal Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="space-y-1">
            <p className="font-medium text-slate-800">
              {STUDENT_PROFILE.fullName} · Kelas {STUDENT_PROFILE.className}
            </p>
            <p>
              Program Keahlian {STUDENT_PROFILE.department} · {STUDENT_PROFILE.school}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-slate-600">
            <a href="#beranda" className="hover:text-slate-900 transition-colors">
              Beranda
            </a>
            <a href="#profil" className="hover:text-slate-900 transition-colors">
              Profil
            </a>
            <a href="#kompetensi" className="hover:text-slate-900 transition-colors">
              Kompetensi
            </a>
            <a href="#praktikum" className="hover:text-slate-900 transition-colors">
              Praktikum
            </a>
            <a href="#kontak" className="hover:text-slate-900 transition-colors">
              Kontak
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ProjectLightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <DossierPrintModal
        open={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
      />
    </div>
  );
}
