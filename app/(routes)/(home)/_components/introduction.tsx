import { Button } from "@/components/ui/button"



export const Introduction = () => {

  return (
    <div className="w-full h-[600px] bg-gradient-to-tl from-[#07fc2cce] from-10% to-[#bcfbce] to-90% opacity-100 text-black flex flex-col items-center justify-center min-w-[950px]">
      <div className="w-full h-full  max-w-screen-xl grid grid-cols-2 gap-4 px-[40px]">
        <div className="h-full flex flex-col justify-center">
          <h1 className="w-[400px] text-wrap font-bold text-[48px] leading-[54px] text-primary-foreground z-30">
            Powerful receipts management tool
          </h1>
          <div className="mt-4 text-[18px]">
            Bycel provides a powerful receipt scanner that allows you to turn your receipts into digital data.
            Accuracy is guaranteed with our advanced AI technology, so you can focus on what matters most.
            View summary of your spending, categorize your expenses, and export your data with ease.
          </div>
          <div className="mt-12 flex gap-6">
            <Button variant='secondary' className="h-14 text-[18px]">
              Sign up now!
            </Button>
            <Button variant='secondary' className="h-14 text-[18px]">
              Try free scanning
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <div>
            <img src="/main-1.png" />
          </div>
        </div>
      </div>
    </div>
  )
}