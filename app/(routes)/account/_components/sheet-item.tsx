
import { Sheet } from "@prisma/client"

interface SheetItemInteface {
  sheet: Sheet
}

export const SheetItem = ({
  sheet
}: SheetItemInteface) => {
  return (
    <div className="m-6 p-4 px-8 h-[128px] rounded-2xl shadow-xl text-black bg-white font-medium text-[18px] hover:scale-[108%] transition-all">
      {sheet.title || "haha"}

      <div className="text-black font-normal text-[15px]">
        {sheet.description || "No description"}
      </div>
    </div>
  )
}