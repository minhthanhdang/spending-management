"use client";
import { Sheet } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { SheetItem } from "../_components/sheet-item";
import Link from "next/link";

const Tables = () => {

  const [ sheets, setSheets ] = useState<Sheet[]>([]);

  useEffect(() => {
    axios
      .get("/api/sheets/getAllSheets")
      .then((res) => {
        setSheets(res.data);
      })
      .catch((error) => {
        console.log("Failed to fetch tables");
        console.log(error)
      })
  }, []);

  return (
    <>
      <div className="relative w-full flex justify-center overflow-y-scroll">
        <div className="relative flex flex-col w-full min-h-screen max-w-screen-2xl bg-green-100 rounded-3xl my-[24px] px-[32px] h-full">
          <div className="w-full h-[128px] text-black text-[36px] font-semibold flex items-center justify-start">
            Welcome back!!!!
          </div>
          <div className="w-full h-[36px] text-black text-[16px] font-semibold flex items-center justify-start mt-[-48px]">
            Manage your spending has never been easier!
          </div>

          <div className="h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {sheets.map((sheet)=> (
              <>
                <Link href={`/account/tables/${sheet.id}`}>
                  <SheetItem sheet={sheet}/>
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Tables;