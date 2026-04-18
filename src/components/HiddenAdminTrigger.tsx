import { useEffect, useState } from "react";
import { X, Shield } from "lucide-react";
import Admin from "@/pages/Admin";

const HiddenAdminTrigger = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const customHandler = () => setOpen(true);
    window.addEventListener("warborn:open-admin", customHandler);
    return () => window.removeEventListener("warborn:open-admin", customHandler);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <>
      {/* Admin button at the very bottom of the page */}
      <div className="w-full flex justify-center py-6 bg-background border-t border-border/50">
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir panel admin"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/60 transition-all text-[10px] font-heading tracking-[0.3em]"
        >
          <Shield className="w-3.5 h-3.5" />
          ADMIN
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Panel de administración"
          className="fixed inset-0 z-[200] bg-background overflow-y-auto"
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar panel admin"
            className="fixed top-3 right-3 z-[210] w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border hover:bg-destructive/10 hover:border-destructive transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <Admin />
        </div>
      )}
    </>
  );
};

export default HiddenAdminTrigger;
