"use client"

import { AddItemSheet } from "@/app/(routes)/account/_components/add-item-sheet"
import { EditItemSheet } from "@/app/(routes)/account/_components/edit-item-sheet"

export const SheetProvider = () => {

  return (
    <>
      <AddItemSheet />
      <EditItemSheet />
    </>
  )
}