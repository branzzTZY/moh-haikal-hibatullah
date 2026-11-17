import { useEffect } from 'react';
import { Printer, X } from 'lucide-react';
import {
  COMPETENCY_ITEMS,
  EDUCATION_RECORDS,
  EVALUATION_RECORDS,
  STUDENT_PROFILE,
} from '../data/portfolioData';

interface DossierPrintModalProps {
  open: boolean;
  onClose: () => void;
}

export function DossierPrintModal({ open, onClose }: DossierPrintModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/75 p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 no-print">
          <h2 id="dossier-modal-title" className="text-sm font-semibold text-slate-900">
            Ringkasan Dossier Akademik (Siap Cetak / PDF)
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup ringkasan dossier"
              className="inline-flex items-center justify-center w-10 h-10 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Formal Printable Document Body */}
        <div className="p-8 sm:p-10 space-y-8 text-slate-900 bg-white">
          <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-slate-600 mb-1">
                PORTOFOLIO KOMPETENSI SISWA · {STUDENT_PROFILE.school}
              </p>
              <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900">
                {STUDENT_PROFILE.fullName}
              </h3>
              <p className="text-sm text-slate-700 mt-1">
                Kelas {STUDENT_PROFILE.className} · Jurusan {STUDENT_PROFILE.department}
              </p>
            </div>
            <div className="text-xs text-slate-600 font-mono tabular-nums sm:text-right space-y-0.5">
              <p>Tahun Ajaran {STUDENT_PROFILE.academicYear}</p>
              <p>{STUDENT_PROFILE.domicile}</p>
              <p>{STUDENT_PROFILE.email}</p>
            </div>
          </div>

          <section className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-900 tracking-wide border-b border-slate-200 pb-1.5">
              Ringkasan Profil Siswa
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {STUDENT_PROFILE.statement}
            </p>
          </section>

          <section className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 tracking-wide border-b border-slate-200 pb-1.5">
              Kompetensi Teknis Utama (Tingkat X TITL)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMPETENCY_ITEMS.map((item) => (
                <div key={item.id} className="space-y-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {item.number}. {item.title}
                  </p>
                  <p className="text-xs text-slate-600">
                    {item.category} · {item.readinessLabel}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 tracking-wide border-b border-slate-200 pb-1.5">
              Riwayat Pendidikan
            </h4>
            <div className="space-y-3">
              {EDUCATION_RECORDS.map((edu) => (
                <div key={edu.period} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{edu.institution}</p>
                    <p className="text-xs text-slate-600">{edu.program}</p>
                  </div>
                  <p className="text-xs font-mono tabular-nums text-slate-600 shrink-0">
                    {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 tracking-wide border-b border-slate-200 pb-1.5">
              Catatan Evaluasi Praktikum Bengkel
            </h4>
            <div className="space-y-2">
              {EVALUATION_RECORDS.map((ev) => (
                <div key={ev.code} className="flex items-baseline justify-between gap-4 text-sm border-b border-slate-100 pb-1.5">
                  <span className="text-slate-800">{ev.title}</span>
                  <span className="text-xs font-medium text-slate-700 shrink-0">{ev.result}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>{STUDENT_PROFILE.schoolAddress}</span>
            <span className="font-mono">Dokumen Portofolio Siswa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
