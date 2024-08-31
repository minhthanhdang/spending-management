import { Button } from "@/components/ui/button"



export const Introduction = () => {

  return (
    <div className="w-full h-[600px] bg-green-200 opacity-55 text-black flex flex-col items-center">
      <div className="w-full max-w-screen-xl grid grid-cols-2 gap-4 pt-[128px] px-[96px]">
        <div className="flex flex-col">
          <h1 className="w-[400px] text-wrap font-medium text-[48px] leading-[57px]">
            Powerful receipts management tool
          </h1>
          <div className="mt-4">
            Bycel provides a powerful receipt scanner that allows you to turn your receipts into digital data.
            Accuracy is guaranteed with our advanced AI technology, so you can focus on what matters most.
            View summary of your spending, categorize your expenses, and export your data with ease.
          </div>
          <div className="mt-12 flex gap-6">
            <Button className="h-14 text-[18px]">
              Sign up now!
            </Button>
            <Button className="h-14 text-[18px]">
              Try free scanning
            </Button>
          </div>
        </div>
        <div>
          <img />
        </div>
      </div>
    </div>
  )
}