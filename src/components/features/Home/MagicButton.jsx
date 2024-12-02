/* eslint-disable react/prop-types */
import { ButtonsCard } from "../../ui/AnimateButton";
import { FiArrowRight } from "react-icons/fi";

export function MagicButton({ title, color, textColor }) {
  return (
    <ButtonsCard>
      <button className="px-8 py-2 border rounded-full border-black text-primary font-semibold bg-[#080808] dark:border-white relative group transition duration-200">
        <div
          className={`absolute -bottom-2 -right-2 bg-[#111111] h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200`}
        />
        <span className={`relative text-white inline-flex items-center`}>
          {title} <FiArrowRight className="ml-2" />
        </span>
      </button>
    </ButtonsCard>
  );
}


export function MagicButtonBorder({ title }) {
  return (
    <ButtonsCard>
      <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        {title} <FiArrowRight className="ml-2" />
      </button>
    </ButtonsCard>
  );
}
