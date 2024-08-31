"use client"

import Image from "next/image";
import { useCSVReader } from 'react-papaparse';
import { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Introduction } from "./_components/introduction";
import { SectionWrapper } from "./_components/section-wrapper";

const styles = {
  csvReader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  } as CSSProperties,
  browseFile: {
    width: '20%',
  } as CSSProperties,
  acceptedFile: {
    border: '1px solid #ccc',
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: '80%',
  } as CSSProperties,
  remove: {
    borderRadius: 0,
    padding: '0 20px',
  } as CSSProperties,
  progressBarBackgroundColor: {
    backgroundColor: 'red',
  } as CSSProperties,
};

const INITIAL_IMPORT_RESULTS = { 
  data: [],
  errors: [],
  meta: {},
};

export default function Home() {
  const { CSVReader } = useCSVReader();

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    console.log({ results });
  };

  return (
    <div className="w-full flex flex-col items-center">

      <Introduction />

      <SectionWrapper bgColor="#FFFFFF">
        <div> 

        </div>
        <div className="flex flex-col">
          <div className="w-[400px] text-wrap font-medium text-[48px] leading-[57px]">
            Automatic receipt extraction
          </div>
          <div className="mt-4">
            Bycel can read key information and format it into spreadsheet for you. From product name, price, date, and store name, we got you covered. Everything happens in a blink of an eye.
          </div>
        </div>
      </SectionWrapper>


      <div className="w-full flex justify-center text-[#fcf9ff] font-bold text-[64px] z-20">
        Scan your receipt instantly!
      </div>

      <div className="max-w-[600px] w-[80%] h-[400px] mt-12 flex flex-col items-center justify-center bg-[#ECECA3] rounded-[48px] gap-8">
        <div>Use your camera</div>
        <div className="w-[60%] h-[60%] bg-white rounded-3xl p-4 border-dashed border-black border-2">
          
        </div>
        <CSVReader onUploadAccepted={onUpload}>
          {({ getRootProps }: any) => (
            <Button
              size="sm"
              className="w-full lg:w-auto"
              {...getRootProps()}
            >
              <Upload className="size-4 mr-2" />
              Import
            </Button>
          )}
        </CSVReader>

        
      </div>
      <div className="mt-8">
        <div className="text-black">
          Or create an account to manage your receipts!
        </div>
      </div>
    </div>
  );
}
