"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { site } from "@/content/site";
import { Mascot } from "@/components/ui/Mascot";
import { SpeechBubble } from "@/components/ui/SpeechBubble";

/** Small fixed mascot in the corner that links to karmaverse.earth. Dismissible. */
export function FloatingBuddy() {
  const [hidden, setHidden] = useState(false);
  return (
    <AnimatePresence>
      {!hidden && (
        <motion.aside
          aria-label="KarmaVerse buddy"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed bottom-3.5 right-4 z-[55] flex items-end gap-1.5"
        >
          <div className="relative mb-[70px] hidden max-w-[190px] sm:block">
            <a href={site.karmaverseUrl} target="_blank" rel="noopener noreferrer">
              <SpeechBubble className="px-3.5 py-2.5 text-[13px]" />
            </a>
            <button
              type="button"
              aria-label="Hide KarmaVerse buddy"
              onClick={() => setHidden(true)}
              className="absolute -right-2.5 -top-3 grid h-7 w-7 place-items-center rounded-full bg-text text-white"
            >
              <X className="h-3 w-3" strokeWidth={2.6} />
            </button>
          </div>
          <a href={site.karmaverseUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit karmaverse.earth" className="block w-[84px] sm:w-[110px]">
            <Mascot decorative blinkDelay={-2} />
          </a>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
