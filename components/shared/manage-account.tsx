"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, LockKeyhole } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import LoginAccountForm from "../form/login-account-form";
import CreateAccountForm from "../form/create-account-form";
import { AccountProps, AccountResponse } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "../ui/use-toast";
import Loader from "./loader";

const ManageAccount = () => {
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [state, setState] = useState<"login" | "create">("create");
  const [accounts, setAccounts] = useState<AccountProps[]>([]);
  const [currentAccount, setCurrentAccount] = useState<AccountProps | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const { data: session }: any = useSession();

  useEffect(() => {
    const getAllAccounts = async () => {
      try {
        const { data } = await axios.get<AccountResponse>(
          `/api/account?uid=${session.user.uid}`
        );
        data.success && setAccounts(data.data as AccountProps[]);
      } catch (error) {
        return toast({
          title: "Error",
          description: "An error accurred while creating your account",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    getAllAccounts();
  }, [session]);

  const onDelete = async (id: string) => {
    try {
      const isConfirmed = confirm("Your are sure you want to delete account?");

      if (isConfirmed) {
        const { data } = await axios.delete<AccountResponse>(
          `/api/account?id=${id}`
        );
        if (data.success) {
          setAccounts(accounts.filter((account) => account._id !== id));
          return toast({
            title: "Account deleted successfully",
            description: "You account has been deleted successfully",
          });
        } else {
          return toast({
            title: "Error",
            description: data.message,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      return toast({
        title: "Error",
        description: "An error accurred while creating your account",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div
      className={
        "min-h-screen flex justify-center items-center flex-col relative"
      }
    >
      <div className={"flex justify-center items-center flex-col"}>
        <h1 className={" text-white font-bold text-5xl my-12"}>
          Wo's watching?
        </h1>
        <ul className={"flex p-0 my-12 gap-4"}>
          {isLoading ? null : (
            <>
              {accounts &&
                accounts.map((account) => (
                  <li
                    key={account._id}
                    onClick={() => {
                      if (isDelete) return;
                      setOpen(true);
                      setState("login");
                      setCurrentAccount(account);
                    }}
                    className={
                      "max-w-[200px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[200px]"
                    }
                  >
                    <div className="relative">
                      <div
                        className={
                          "max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] object-cover w-[155px] h-[155px] relative"
                        }
                      >
                        <Image
                          src={
                            "https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                          }
                          alt="account"
                          fill
                        />
                      </div>
                      {isDelete ? (
                        <div
                          onClick={() => onDelete(account._id)}
                          className={
                            "absolute transform bottom-0 z-10 cursor-pointer"
                          }
                        >
                          <Trash2 className={"w-7 h-7 text-red-500"} />
                        </div>
                      ) : null}
                    </div>
                    <div className={"flex items-center gap-2"}>
                      <span className={"font-mono font-bold text-xl"}>
                        {account.name}
                      </span>
                      <LockKeyhole />
                    </div>
                  </li>
                ))}
              {accounts && accounts.length < 4 ? (
                <li
                  onClick={() => {
                    setOpen(true);
                    setState("create");
                  }}
                  className={
                    " border bg-[#e5b109] font-bold text-xl border-black max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] w-[155px] h-[155px] cursor-pointer flex justify-center items-center"
                  }
                >
                  {" "}
                  Add account
                </li>
              ) : null}
            </>
          )}
        </ul>
        <Button
          onClick={() => setIsDelete((prev) => !prev)}
          className={
            " bg-transparent rounded-none hover:bg-transparent !text-white border border-gray-100 cursor-pointer tracking-wide inline-flex text-sm px-[1.5em] py-[0.5em]"
          }
        >
          Manage Profiles
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {state === "login" && (
            <LoginAccountForm currentAccount={currentAccount} />
          )}
          {state === "create" && (
            <CreateAccountForm
              uid={session?.user?.uid}
              setOpen={setOpen}
              setAccounts={setAccounts}
              accounts={accounts}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageAccount;
