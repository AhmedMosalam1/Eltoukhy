"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { BannersSchema } from "@/components/validation/BannersSchema";
import { FormProvider, useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import { useState } from "react";
import PageHeading from "@/components/sharable/PageHeading";

const BannerPage = () => {
  let [file, setFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof BannersSchema>>({
    resolver: zodResolver(BannersSchema),
    mode: "onChange",
  });

  const { reset, formState } = form;

  function onSubmit(values: z.infer<typeof BannersSchema>) {
    console.log(values);
    reset();
    setFile(null);
  }

  return (
    <section className="mt-[130px] container">
      <div className="mb-6">
        <PageHeading title="Add Banner" />
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-[600px] mx-auto border border-border p-4 rounded-lg">
          <FormField
            control={form.control}
            name="titleEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Title"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="titleAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>titleAr</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter  titleAr"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="DescEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descriotion En</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Descriotion"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="DescAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description Ar</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter DescAr"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="fileInput">
              {file ? (
                <div className="flex flex-col gap-1">
                  <img
                    src={URL.createObjectURL(file)}
                    className="size-[300px]  object-fill rounded-lg max-w-xs mx-auto"
                  />
                  <p className="flex items-center justify-center gap-1">
                    <span>size:</span>
                    <span className="text-primary">{`${(
                      file.size /
                      (1024 * 1024)
                    ).toFixed(2)} MB`}</span>
                  </p>
                </div>
              ) : (
                <div className="bg-accent cursor-pointer size-28 grid place-items-center mx-auto rounded-lg">
                  <Upload />
                </div>
              )}
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => {
                setFile(e.target.files![0]);
                form.setValue("image", e.target.files![0]);
              }}
              className="w-full max-w-xs hidden"
            />
            {formState.errors.image?.message && (
              <p className="text-red-500 text-sm">
                {formState.errors.image.message}
              </p>
            )}
          </div>
          <Button className="w-full" type="submit">
            {formState.isSubmitting ? "Loading" : "Submit"}
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default BannerPage;
