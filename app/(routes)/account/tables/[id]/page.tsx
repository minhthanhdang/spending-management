"use client"

import { Item, Sheet } from "@prisma/client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "../../_components/data-table";
import {columns} from "../../_components/columns";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAddItem } from "@/components/account/hooks/use-add-item";
import { useCurrentItems } from "@/components/account/hooks/use-current-items";
import { arraysEqual } from "@/lib/utils";

const Table = () => {

  const [ sheet, setSheet ] = useState<Sheet | null>(null)
  const { id } = useParams();
  const [ originalItems, setOriginalItems ] = useState<Item[]>([])

  const { isOpen, onOpen } = useAddItem();
  const { currentItems, setItems } = useCurrentItems();
  const [ isChanged, setIsChanged ] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Set the returnValue property of the event to show the confirmation dialog

      if (isChanged) {
        event.preventDefault();
        
        event.returnValue = ''; // Chrome requires returnValue to be set for the dialog to show

        return '';
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [originalItems, currentItems, isChanged]);

  useEffect(() => {

    if (id == "temp") {
      let temp = localStorage.getItem('temp_receipt');
      setItems(temp ? JSON.parse(temp) : null);
    }

    axios
      .post("/api/items/getSheetItems", { id: id })
      .then((res) => {
        setItems(res.data)
        setOriginalItems(res.data)
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })

    if (id != "temp") {
      axios
        .post("/api/sheets/getSheet", { id: id })
        .then((res) => {
          setSheet(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, []);

  useEffect(() => {
    if (arraysEqual(originalItems, currentItems)) {
      setIsChanged(false);
    } else {
      setIsChanged(true);
    }
  }, [originalItems, currentItems]);

  console.log(originalItems)
  console.log(currentItems)
  return (
    <>
      <div className="relative w-full flex justify-center overflow-y-scroll">
        <div className="relative flex flex-col w-full min-h-screen max-w-screen-2xl bg-green-100 rounded-3xl my-[24px] px-[32px] h-full">
          <div className="absolute top-0 left-7  text-black mt-[20px] hover:bg-foreground rounded-full">
            <Link href="/account/tables">
              <ArrowLeft size={28}/>
            </Link>
          </div>
          <div className="w-full h-[128px] text-black text-[36px] font-semibold flex items-center justify-start mt-2">
            Welcome back!!!!
          </div>
          <div className="w-full h-[36px] text-black text-[16px] font-semibold flex items-center justify-start mt-[-48px]">
            Manage your spending has never been easier!
          </div>


          <div className="w-full flex justify-between items-center mt-[20px]">
            <div className="text-black text-[24px] font-bold">
              Table Name
            </div>
            <div className="h-[24px] flex gap-6">
              
              <Button onClick={onOpen}>
                Add Item
              </Button>
              <Button onClick={()=>{}}>
                Discard Changes
              </Button>
                
            </div>
          </div>
          <div className="mt-6">
            <DataTable columns={columns} data={currentItems} />
          </div>
        </div>
      </div>
  </>
  )
}

export default Table;