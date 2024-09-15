import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  bgColor?: string;
  className?: string;
}

export const SectionWrapper = ({
  children,
  bgColor,
  className
}: SectionWrapperProps) => {
  return (
    <div className={cn(
      "relative w-full h-[600px] text-black flex flex-col items-center justify-center",
      bgColor ? `bg-[${bgColor}]` : "bg-green-200",
      className
    )}>
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative h-full w-full max-w-screen-xl grid grid-cols-2 grid-rows-1 gap-10 py-[64px] px-[48px]">
          {children}
        </div>
      </div>
    </div>
  )
}