"use client"

import { useCSVReader } from "react-papaparse";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { SectionWrapper } from "../(home)/_components/section-wrapper";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";


const Scan = () => {
  const { CSVReader } = useCSVReader();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [base64, setBase64] = useState<string | null>(null);

  const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImage(file);
      setPreview(URL.createObjectURL(file));
      console.log('set file success')
    }
  };
  
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!base64) {
      console.log("Image loading failed");
      return;
    }

    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: [
          {
            "type": "image_url",
            "image_url": {
              "url": base64
            }
          }
        ]
      }
      const response = await axios.post("/api/receipt", {message: userMessage})

      const data = response.data;

      localStorage.setItem("temp_receipt", JSON.stringify(data));

      console.log(response)
      console.log(data)

      router.push("/account");

    } catch (error: any) {
      console.log(error);
    }
  }
    
  
  return (
    <div className="h-full bg-gradient-to-tl from-[#07fc2cce] from-10% to-[#bcfbce] to-90% text-primary-foreground px-[64px] flex flex-col items-center justify-center">
      <div className="max-w-screen-xl w-full flex gap-8 items-center justify-center h-[70%]">
        <div className="relative w-full h-full col-span-2 flex flex-col gap-4 items-center">
          <Button
            size="sm"
            variant="picture"
            className="relative z-30 h-[80%] flex flex-col items-center rounded-full py-2 bg-[#FFFFFF] aspect-square"
            asChild
          >
            <label htmlFor="fileinput">
              <div className="relative z-30 h-full flex flex-col items-center rounded-[64px] aspect-square">
                <img className="relative h-full rounded-full aspect-square" src="/scan.png" alt="Scan" />
              </div>  
            </label>
          </Button>
          <h2 className="text-[24px] font-semibold">
            Import your receipt to start
          </h2>
          <form className="relative" onSubmit={onSubmit}>
            <input className="hidden sticky top-[-10px]" id="fileinput" type="file" accept="image/*" onChange={onChange}/>
            <Button variant='secondary' type="submit" className="min-w-[80px]">
              Submit & Scan
            </Button>
          </form>
        </div>
      <div className="relative w-full h-full col-span-2 flex flex-col gap-8 items-center">
        
        <CSVReader onUploadAccepted={(results: any)=>{console.log(results)}}>
          {({ getRootProps }: any) => (
            <Button
              size="sm"
              variant="picture"
              className="relative z-30 h-[80%] flex flex-col items-center rounded-full py-2 bg-[#FFFFFF] aspect-square"
              {...getRootProps()}
            >
              <div className="relative z-30 h-full flex flex-col items-center rounded-[64px] aspect-square">
                <img className="relative h-full rounded-full aspect-square" src="/scan.png" alt="Scan" />
              </div>  
            </Button>
          )}
        </CSVReader>
        <h2 className="text-[24px] font-semibold">
          Or upload a CSV file
        </h2>
      </div>

    </div>
    </div>
  )
}

export default Scan;