import { cn } from "@/lib/utils";

type LogoProps = {
  size: number;
}

export const Logo = ({
  size
}: LogoProps) => {
  return (
    <img width={cn(`${size}px`)} height={cn(`${size}px`)} className="relative object-scale-down" src="/logo_256.png" alt="logo" />
  )
}

