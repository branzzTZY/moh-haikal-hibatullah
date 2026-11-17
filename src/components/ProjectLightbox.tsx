import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { PracticumProject } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface ProjectLightboxProps {
  project: PracticumProject | null;
  onClose: () => void;
}

export function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 sm:p-6 overflow-y-auto no-print"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-mono tabular-nums">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.semester}</span>
            <span aria-hidden="true">·</span>
            <span>{project.dateLabel}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pratinjau proyek"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-700"
          >
            <X className="w-4 h-4" />
            <span>Tutup</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 bg-slate-100">
            <ResilientImage
              src={project.imageSrc}
              alt={project.imageAlt}
              fallbackTitle={project.title}
              className="w-full h-72 sm:h-96 lg:h-full object-cover"
            />
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3
                id="lightbox-title"
                className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug"
              >
                {project.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {project.summary}
              </p>

              <div className="pt-2 border-t border-slate-200 space-y-3">
                <h4 className="text-xs font-semibold tracking-wide text-slate-900">
                  Spesifikasi Teknis Praktikum
                </h4>
                <dl className="space-y-2.5">
                  {project.specifications.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-col border-b border-slate-100 pb-2 last:border-b-0 last:pb-0"
                    >
                      <dt className="text-xs text-slate-500">{spec.label}</dt>
                      <dd className="text-sm font-medium text-slate-900 font-mono tabular-nums mt-0.5">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <h4 className="text-xs font-semibold tracking-wide text-slate-900 mb-1.5">
                  Capaian Pembelajaran
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {project.learningOutcome}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
