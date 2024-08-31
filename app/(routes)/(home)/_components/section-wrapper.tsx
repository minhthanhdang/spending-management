import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  bgColor?: string;
}

export const SectionWrapper = ({
  children,
  bgColor
}: SectionWrapperProps) => {
  return (
    <div className={cn(
      "relative w-full h-[600px] opacity-55 text-black flex flex-col items-center",
      bgColor ? `bg-[${bgColor}]` : "bg-green-200"
    )}>
      <div className="relative h-full w-full max-w-screen-xl grid grid-cols-2 grid-rows-1 gap-4 py-[64px] px-[96px]">
        {children}
      </div>
    </div>
  )
}