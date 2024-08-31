"use client"

import { SectionWrapper } from "../(home)/_components/section-wrapper";
import { Item, Sheet } from "@prisma/client";
import { DataTable } from "./_components/data-table";
import {columns} from "./_components/columns";
import { useEffect, useState } from "react";
import { Actions } from "./_components/actions";
import axios from "axios";
import { useAddItem } from "@/components/account/hooks/use-add-item";
import { Button } from "@/components/ui/button";
import { useCurrentItems } from "@/components/account/hooks/use-current-items";

const data: Item[] = [
  {
    id: 1,
    name: 'item1 asdfhajldsfhljadshfjladshfkjlhkljashflkajdshfkljhsfaklj',
    price: '100.00',
    date: new Date(),
    category: "food",
    seller: "im here",
    sheetId: null
  },
  {
    id: 2,
    name: 'item2',
    price: '200.70',
    date: null,
    category: "clothing",
    seller: "online store",
    sheetId: null
  },
  { 
    id: 3,
    name: 'item3',
    price: '50',
    date: null,
    category: "electronics",
    seller: "tech store",
    sheetId: null
  },
  {
    id: 4,
    name: 'item4',  
    price: '150',
    date: null,
    category: "home decor",
    seller: "local shop",
    sheetId: null
  },
  {
    id: 5,
    name: 'item5',
    price: '300',
    date: null,
    category: "furniture",
    seller: "furniture store",
    sheetId: null
  }
]


const sheets: Sheet[] = [

]

const Account = () => {

  const [ unsavedReceipt, setUnsavedReceipt ] = useState<Item[]|null>(null);
  const [ isChanged, setIsChanged ] = useState(true);
  const [ sheets, setSheets ] = useState<Sheet[]>([]);
  const [ currentSheet, setCurrentSheet ] = useState<Sheet|null>(null);
  
  const { onOpen } = useAddItem();
  const { currentItems, setItems } = useCurrentItems();

  const onSave = () => {
    if (currentSheet) {
      return;
    }
    const items = localStorage.getItem('temp_receipt')
    console.log(items)
    if (!items) return;
    axios.post("/api/sheets/addSheet", { title: "Test sheet", items, description: "Test description"})
  }

  useEffect(() => {
    let temp = localStorage.getItem('temp_receipt');

    setUnsavedReceipt(temp ? JSON.parse(temp) : null);
    setItems(temp ? JSON.parse(temp) : null)
    console.log('temp', temp)

    axios.get('/api/sheets/getAllSheets')
      .then((res) => {
        console.log('sheets: ', res.data);
        setSheets(res.data);
      }).catch((err) => {
        console.log(err);
      })
    
  }, []);

  return (
    <div className="relative w-full h-full flex justify-center">
      <div className="relative flex w-full h-full max-w-screen-2xl">
        <div className="relative hidden xl:flex lg:w-[300px] py-8 px-4 text-black bg-slate-100 h-full min-h-">
          
          <div className="w-full flex justify-center text-[20px] font-bold">
            Your Tables
          </div>
        </div>
        <div className="py-8 flex flex-col items-center flex-grow">
          
          <div className="text-black text-[20px] font-bold">
            Table Name
          </div>
          <div className="w-full text-black">
            <Button onClick={onOpen}>
              Add Item
            </Button>
          </div>
          <div className="w-full text-black">
            <Actions isChanged={isChanged} save={onSave} discard={()=>{}}/>
          </div>
          <div className="text-black container mx-auto py-10">
            {unsavedReceipt ? <DataTable columns={columns} data={currentItems} /> :
            <DataTable columns={columns} data={data} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account;