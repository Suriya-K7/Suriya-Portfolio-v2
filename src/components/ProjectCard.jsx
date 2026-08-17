import React from "react";
import {
  ExternalLink,
  GitBranch,
  Eye,
  X,
  ArrowUpRight,
  Sparkles,
  Code2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ── helper ── */
const pick = (details, key) => details.find((d) => d.title === key);

/* ── Project icon chips (reuse lucide icons by index) ── */
const CARD_ICONS = [Sparkles, Code2, Eye, GitBranch];

const ProjectCard = ({ img, title, details, index = 0 }) => {
  const [open, setOpen] = React.useState(false);

  const previewDetail = pick(details, "Preview : ");
  const codeDetail    = pick(details, "Code : ");
  const techDetail    = pick(details, "Tech Used : ");
  const descDetail    = pick(details, "Description : ");

  const techList = techDetail?.desc?.split(", ").map((t) => t.trim()) ?? [];
  const IconComp = CARD_ICONS[index % CARD_ICONS.length];
  const idxLabel = String(index + 1).padStart(2, "0");

  return (
    <>
      {/* ══════════════════════ CARD ══════════════════════ */}
      <article
        className="project-card group flex cursor-pointer flex-col gap-4 rounded-3xl border border-border bg-card p-3 sm:p-3.5"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View ${title} project details`}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
      >
        {/* ── Card header row ── */}
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
            <IconComp className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground">
            {title.toUpperCase()}
          </span>
          <span className="ml-auto text-[11px] font-medium text-muted-foreground/60 font-mono">
            {idxLabel}
          </span>
        </header>

        {/* ── Screenshot with browser-frame inset ── */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-muted/30 ring-1 ring-foreground/5">
          <div className="m-1.5 overflow-hidden rounded-xl">
            <img
              src={img}
              alt={`${title} screenshot`}
              className="w-full object-cover aspect-[16/10] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>

          {/* Quick-action icons — top right, visible on hover */}
          <div
            className="absolute top-3.5 right-3.5 flex items-center gap-1.5
              opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
              transition-all duration-300"
          >
            {codeDetail && (
              <a
                href={codeDetail.desc}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Source code for ${title}`}
                className="flex h-7 w-7 items-center justify-center rounded-full
                  bg-background/90 backdrop-blur-sm text-foreground border border-border/60
                  hover:bg-foreground hover:text-background
                  transition-all duration-200"
              >
                <GitBranch className="h-3 w-3" />
              </a>
            )}
            {previewDetail && (
              <a
                href={previewDetail.desc}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Live preview of ${title}`}
                className="flex h-7 w-7 items-center justify-center rounded-full
                  bg-foreground text-background
                  hover:opacity-80
                  transition-all duration-200"
              >
                <ArrowUpRight className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        {/* ── Content below image ── */}
        <div className="flex flex-col gap-2 px-1 pb-1">
          <h3 className="text-[18px] sm:text-[20px] font-medium leading-[1.2] tracking-tight text-foreground">
            {descDetail?.desc?.split(".")[0] ?? title}
          </h3>
          <p className="text-[13px] sm:text-[14px] leading-normal tracking-tight text-foreground/60 line-clamp-2">
            {descDetail?.desc}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            {techList.slice(0, 4).map((t, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
            {techList.length > 4 && (
              <span className="text-[11px] text-muted-foreground/60 font-medium">
                +{techList.length - 4} more
              </span>
            )}
          </div>
        </div>
      </article>

      {/* ══════════════════════ DIALOG ══════════════════════ */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="
          p-0 gap-0
          w-[95vw] max-w-2xl
          max-h-[92vh] overflow-hidden
          rounded-2xl border border-border
          bg-card shadow-2xl
          flex flex-col
        ">
          {/* ── Hero image ── */}
          <div className="relative shrink-0 aspect-[16/9] w-full overflow-hidden rounded-t-2xl">
            <img
              src={img}
              alt={`${title} preview`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
                Project {idxLabel}
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-white leading-tight">
                {title}
              </h2>
            </div>
            <DialogClose asChild>
              <button
                aria-label="Close dialog"
                className="absolute top-3 right-3 z-10
                  flex h-8 w-8 items-center justify-center rounded-full
                  bg-black/50 backdrop-blur-sm text-white border border-white/10
                  hover:bg-black/80 transition-all duration-200"
              >
                <X className="h-4 w-4" />
              </button>
            </DialogClose>
          </div>

          {/* ── Scrollable content ── */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {descDetail && (
              <div className="px-6 sm:px-7 pt-6 pb-5 border-b border-border">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  About this project
                </p>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {descDetail.desc}
                </p>
              </div>
            )}

            {techList.length > 0 && (
              <div className="px-6 sm:px-7 py-5 border-b border-border">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {techList.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-[11px] font-medium rounded-full px-3 py-0.5"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="px-6 sm:px-7 py-6 space-y-3">
              {(previewDetail || codeDetail) && (
                <div className="space-y-2">
                  {previewDetail && (
                    <a href={previewDetail.desc} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[12px] text-muted-foreground hover:text-foreground transition-colors break-all">
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {previewDetail.desc}
                    </a>
                  )}
                  {codeDetail && (
                    <a href={codeDetail.desc} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[12px] text-muted-foreground hover:text-foreground transition-colors break-all">
                      <GitBranch className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {codeDetail.desc}
                    </a>
                  )}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                {previewDetail && (
                  <Button asChild size="default"
                    className="flex-1 gap-2 rounded-xl font-medium text-sm">
                    <a href={previewDetail.desc} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4" />
                      Live Preview
                      <ArrowUpRight className="h-3.5 w-3.5 ml-auto" />
                    </a>
                  </Button>
                )}
                {codeDetail && (
                  <Button asChild variant="outline" size="default"
                    className="flex-1 gap-2 rounded-xl font-medium text-sm">
                    <a href={codeDetail.desc} target="_blank" rel="noopener noreferrer">
                      <GitBranch className="h-4 w-4" />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
