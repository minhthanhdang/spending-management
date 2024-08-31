import { Button } from "@/components/ui/button"

interface ActionsProps {
  isChanged: boolean,
  save: () => void,
  discard: () => void
}

export const Actions = ({
  isChanged,
  save, 
  discard
}: ActionsProps) => {
  return (
    <div className="h-[24px] w-full flex justify-end gap-6">
      {isChanged && (
        <>
          <Button onClick={save}>
            Save
          </Button>
          <Button onClick={discard}>
            Discard Changes
          </Button>
        </>
      )}
    </div>
  )
}