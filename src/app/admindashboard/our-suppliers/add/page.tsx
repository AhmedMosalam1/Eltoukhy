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
import { FormProvider, useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import { useState } from "react";
import PageHeading from "@/components/sharable/PageHeading";
import { SupplierSchema } from "@/components/validation/Supplier";
import { addSupplierFunc } from "@/store/DashboardSlices/addSupplier";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

const SupplierPageAdd = () => {
  let [file, setFile] = useState<any | null>(null);
  const form = useForm<z.infer<typeof SupplierSchema>>({
    resolver: zodResolver(SupplierSchema),
    mode: "onChange",
  });

  const { reset, formState } = form;
  const { islodaing } = useSelector(
    (state: RootState) => state.addSupplier as { islodaing: boolean }
  );
  const dispatch = useDispatch<AppDispatch>();
  async function onSubmit(values: z.infer<typeof SupplierSchema>) {
    let formData = new FormData();
    formData.append("title.en", values.titleEn);
    formData.append("title.ar", values.titleAr);
    formData.append("type.en", values.category);
    formData.append("type.ar", values.category == "National" ? "وطني" : "دولي");
    formData.append("image", values.image);

    let res = await dispatch(addSupplierFunc(formData));
    if (res.meta.requestStatus === "fulfilled") {
      reset();
      setFile(null);
      form.setValue("category", "");
    }
  }

  return (
    <section className="mt-[130px] container">
      <div className="mb-6">
        <PageHeading title="Add Supplier" />
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
                <FormLabel>Name En</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Name En"
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
                <FormLabel>Name Ar</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter  Name Ar"
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>category</FormLabel>
                <FormControl>
                  <select
                    className="w-full bg-background  p-1 outline-none rounded-lg border border-border"
                    {...field}>
                    <option className="hidden ">selcet category</option>
                    <option value={"National"}>National</option>
                    <option value={"International"}>International</option>
                  </select>
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
          <Button
            disabled={formState.isSubmitting}
            className={`w-full ${formState.isSubmitting && "opacity-50"}`}
            type="submit">
            {formState.isSubmitting ? "Loading" : "Submit"}
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default SupplierPageAdd;
