"use client"

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";
import { Item } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { DatePicker } from "./date-picker";

import { Button } from "@/components/ui/button";
import { useEditItem } from "../hooks/use-edit-item";


const formSchema = z.object({
  name: z.string(),
  price: z.string().optional(),
  date: z.date().optional(),
  category: z.string().optional(),
  seller: z.string().optional(),
});

interface EditItemFormInterface {
  item: Item,
  editItem: (item: Item) => void;
}

export const EditItemForm = ({
  item,
  editItem
}: EditItemFormInterface) => {

  const { onCloseEditItem } = useEditItem();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name,
      price: item.price || "",
      date: item.date || undefined,
      category: item.category || undefined,
      seller: item.seller || undefined
    } 
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const temp: Item = {
      id: item.id,
      name: values.name,
      price: values.price || null,
      date: values.date || null,
      category: values.category || null,
      seller: values.seller || null,
      sheetId: item.sheetId
    }
    editItem(temp)
    onCloseEditItem()

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item</FormLabel>
              <FormControl>
                <Input placeholder="Item name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Item price" {...field} />
              </FormControl>
              <FormDescription>
                Input your item total price.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker value={field.value}
                  onChange={field.onChange} disabled={false}/>
              </FormControl>
              <FormDescription>
                The date of purchase.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seller"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provider</FormLabel>
              <FormControl>
                <Input placeholder="Provider" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}