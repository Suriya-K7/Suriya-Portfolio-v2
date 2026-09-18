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

const ProjectCard = ({ img, title, details, index = 0, _externalOpen, _onClose }) => {
  const [internalOpen, setInternalOpen] = React.useState(false);

  // Support both internal and external open control
  const open = _externalOpen !== undefined ? _externalOpen : internalOpen;
  const setOpen = _onClose
    ? (val) => { if (!val) _onClose(); }
    : setInternalOpen;

  const previewDetail = pick(details, "Preview : ");
  const codeDetail    = pick(details, "Code : ");
  const techDetail    = pick(details, "Tech Used : ");
  const descDetail    = pick(details, "Description : ");

  const techList = techDetail?.desc?.split(", ").map((t) => t.trim()) ?? [];
  const idxLabel = String(index + 1).padStart(2, "0");

  return (
    <>
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
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1 font-mono">
                Project {idxLabel}
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-white leading-tight font-mono">
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
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2 font-mono">
                  About this project
                </p>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {descDetail.desc}
                </p>
              </div>
            )}

            {techList.length > 0 && (
              <div className="px-6 sm:px-7 py-5 border-b border-border">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3 font-mono">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {techList.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-[11px] font-medium rounded-full px-3 py-0.5 font-mono"
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
                      className="flex items-center gap-2 text-[12px] text-muted-foreground hover:text-foreground transition-colors break-all font-mono">
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {previewDetail.desc}
                    </a>
                  )}
                  {codeDetail && (
                    <a href={codeDetail.desc} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[12px] text-muted-foreground hover:text-foreground transition-colors break-all font-mono">
                      <GitBranch className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {codeDetail.desc}
                    </a>
                  )}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                {previewDetail && (
                  <Button asChild size="default"
                    className="flex-1 gap-2 rounded-xl font-medium text-sm font-mono">
                    <a href={previewDetail.desc} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4" />
                      Live Preview
                      <ArrowUpRight className="h-3.5 w-3.5 ml-auto" />
                    </a>
                  </Button>
                )}
                {codeDetail && (
                  <Button asChild variant="outline" size="default"
                    className="flex-1 gap-2 rounded-xl font-medium text-sm font-mono">
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
