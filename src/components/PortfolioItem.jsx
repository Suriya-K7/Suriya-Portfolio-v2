import React from "react";
import { Play, X } from "lucide-react";
import { Zoom } from "react-awesome-reveal";
import parse from "html-react-parser";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const PortfolioItem = ({ img, title, details }) => {
  const [modal, setModal] = React.useState(false);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <Zoom duration={500} triggerOnce>
        <img
          src={img}
          alt={title}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Zoom>
      <div
        className="absolute inset-0 flex cursor-pointer items-center justify-center bg-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        onClick={() => setModal(true)}
      >
        <h3 className="text-lg font-semibold text-primary-foreground">{title}</h3>
      </div>

      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {details.map(({ icon, title: detailTitle, desc }, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 text-primary [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
                  <div>
                    <span className="text-sm font-semibold">{detailTitle}</span>
                    <span className="text-sm text-muted-foreground block">
                      {detailTitle === "Preview : " || detailTitle === "Code : " ? (
                        <a
                          href={desc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline underline-offset-4 hover:text-primary/80 break-all"
                        >
                          {desc}
                        </a>
                      ) : detailTitle === "Description : " ? (
                        desc
                      ) : (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {desc.split(", ").map((item, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </span>
                  </div>
                </div>

                {detailTitle === "Preview : " && (
                  <div className="mt-3 overflow-hidden rounded-lg border border-border">
                    <a
                      href={desc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                    >
                      <Play className="h-4 w-4" />
                      <span>Live Preview</span>
                    </a>
                    <img
                      src={img}
                      alt={title}
                      className="w-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioItem;
