import React from "react";
import {
  ExternalLink,
  GitBranch,
  Layers,
  Eye,
  X,
  ArrowUpRight,
  Sparkles,
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

const PortfolioItem = ({ img, title, details, index = 0 }) => {
  const [open, setOpen] = React.useState(false);

  const previewDetail = pick(details, "Preview : ");
  const codeDetail    = pick(details, "Code : ");
  const techDetail    = pick(details, "Tech Used : ");
  const descDetail    = pick(details, "Description : ");

  const techList = techDetail?.desc?.split(", ").map((t) => t.trim()) ?? [];

  /* First two projects get a "featured" wider treatment */
  const isFeatured = index < 2;

  return (
    <>
      {/* ══════════════════════ CARD ══════════════════════ */}
      <article
        className={`
          portfolio-card group relative flex flex-col overflow-hidden
          rounded-2xl border border-border/50 bg-card cursor-pointer
          transition-all duration-500 ease-out
          hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10
          hover:-translate-y-2
          ${isFeatured ? "sm:col-span-1" : ""}
        `}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View ${title} project`}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
      >
        {/* ── Thumbnail ── */}
        <div className="relative overflow-hidden bg-muted/40 aspect-[16/10] shrink-0">
          <img
            src={img}
            alt={`${title} screenshot`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            loading="lazy"
          />

          {/* Gradient overlay — always visible at bottom for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Project index number — top left */}
          <div className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center
            rounded-full bg-black/40 backdrop-blur-sm
            text-[11px] font-bold text-white/70 border border-white/10">
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Quick-action icons — top right, visible on hover */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5
            opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-300">
            {codeDetail && (
              <a
                href={codeDetail.desc}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Source code"
                className="flex h-7 w-7 items-center justify-center rounded-full
                  bg-black/50 backdrop-blur-sm text-white hover:bg-white hover:text-black
                  transition-all duration-200"
              >
                <GitBranch className="h-3.5 w-3.5" />
              </a>
            )}
            {previewDetail && (
              <a
                href={previewDetail.desc}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Live preview"
                className="flex h-7 w-7 items-center justify-center rounded-full
                  bg-primary text-primary-foreground hover:bg-primary/90
                  transition-all duration-200"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          {/* Project title — always visible at bottom of image */}
          <div className="absolute bottom-0 inset-x-0 p-4">
            <h3 className="text-base font-bold text-white leading-tight drop-shadow-sm">
              {title}
            </h3>
            {/* First tech tags preview */}
            <div className="flex flex-wrap gap-1 mt-1.5">
              {techList.slice(0, 3).map((t, i) => (
                <span key={i}
                  className="text-[10px] font-medium text-white/60 bg-white/10
                  rounded-full px-2 py-0.5 border border-white/10">
                  {t}
                </span>
              ))}
              {techList.length > 3 && (
                <span className="text-[10px] font-medium text-white/40">
                  +{techList.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* "View Details" pill — slides up on hover */}
          <div className="absolute inset-0 flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full
              bg-white/15 backdrop-blur-md border border-white/20
              text-white text-sm font-semibold
              translate-y-2 group-hover:translate-y-0
              transition-transform duration-300">
              <Sparkles className="h-3.5 w-3.5" />
              View Details
            </div>
          </div>
        </div>

        {/* ── Card footer with description preview ── */}
        <div className="flex-1 px-4 py-3 border-t border-border/40">
          <p className="text-[12px] leading-relaxed text-muted-foreground line-clamp-2">
            {descDetail?.desc}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[11px] font-medium text-primary/70 flex items-center gap-1">
              <Eye className="h-3 w-3" />
              Click to explore
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40
              group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5
              transition-all duration-300" />
          </div>
        </div>
      </article>

      {/* ══════════════════════ DIALOG ══════════════════════ */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="
          p-0 gap-0
          w-[95vw] max-w-2xl
          max-h-[92vh] overflow-hidden
          rounded-2xl border border-border/60
          bg-card shadow-2xl
          flex flex-col
        ">

          {/* ── Hero image ── */}
          <div className="relative shrink-0 aspect-[16/9] w-full overflow-hidden bg-muted rounded-t-2xl">
            <img
              src={img}
              alt={`${title} preview`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Title overlaid on image */}
            <div className="absolute bottom-0 inset-x-0 p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
                Project {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {title}
              </h2>
            </div>

            {/* Close */}
            <DialogClose asChild>
              <button
                aria-label="Close"
                className="absolute top-3 right-3 z-10
                  flex h-8 w-8 items-center justify-center rounded-full
                  bg-black/50 backdrop-blur-sm text-white border border-white/10
                  hover:bg-black/80 hover:scale-105 transition-all duration-200"
              >
                <X className="h-4 w-4" />
              </button>
            </DialogClose>
          </div>

          {/* ── Scrollable content ── */}
          <div className="flex-1 overflow-y-auto overscroll-contain">

            {/* About */}
            {descDetail && (
              <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-border/40">
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-2">
                  About this project
                </p>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  {descDetail.desc}
                </p>
              </div>
            )}

            {/* Tech stack */}
            {techList.length > 0 && (
              <div className="px-5 sm:px-6 py-4 border-b border-border/40">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="h-3.5 w-3.5 text-primary shrink-0" />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
                    Tech Stack
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {techList.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-[11px] font-medium rounded-lg px-2.5 py-0.5
                        bg-primary/8 text-primary border border-primary/20
                        hover:bg-primary/15 cursor-default transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Links + CTAs */}
            <div className="px-5 sm:px-6 py-5 space-y-3">

              {/* URL display */}
              {(previewDetail || codeDetail) && (
                <div className="space-y-2">
                  {previewDetail && (
                    <a href={previewDetail.desc} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[12px] text-muted-foreground
                        hover:text-primary transition-colors break-all group/link">
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 group-hover/link:text-primary" />
                      {previewDetail.desc}
                    </a>
                  )}
                  {codeDetail && (
                    <a href={codeDetail.desc} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[12px] text-muted-foreground
                        hover:text-foreground transition-colors break-all group/link">
                      <GitBranch className="h-3.5 w-3.5 shrink-0" />
                      {codeDetail.desc}
                    </a>
                  )}
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                {previewDetail && (
                  <Button asChild size="default"
                    className="flex-1 gap-2 rounded-xl font-semibold text-sm
                      shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30
                      transition-all duration-300">
                    <a href={previewDetail.desc} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4" />
                      Live Preview
                      <ArrowUpRight className="h-3.5 w-3.5 ml-auto" />
                    </a>
                  </Button>
                )}
                {codeDetail && (
                  <Button asChild variant="outline" size="default"
                    className="flex-1 gap-2 rounded-xl font-semibold text-sm
                      border-border/60 hover:bg-muted hover:border-primary/40
                      transition-all duration-300">
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

export default PortfolioItem;
