import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Custom text tokens are font sizes, not colors. Without this contract,
// `text-label-sm text-foreground` silently loses its size and line height.
const merge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "title-h1", "title-h2", "title-h3", "title-h4", "title-h5", "title-h6",
        "label-xl", "label-lg", "label-md", "label-sm", "label-xs",
        "paragraph-xl", "paragraph-lg", "paragraph-md", "paragraph-sm", "paragraph-xs",
        "subheading-md", "subheading-sm", "subheading-xs", "subheading-2xs",
      ],
      shadow: [
        "e1", "e2", "e3", "e4", "e5", "tooltip", "switch-thumb", "toggle",
        "fancy-accent", "fancy-neutral", "fancy-danger", "fancy-success",
        "fancy-warning", "fancy-stroke", "ring-accent", "ring-neutral", "ring-danger",
      ],
      // Every numeric step of the system radius scale — otherwise
      // cn("rounded-10", "rounded-8") keeps both and the winner is CSS order.
      radius: ["4", "6", "8", "10", "12", "14", "16", "20"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return merge(clsx(inputs));
}
