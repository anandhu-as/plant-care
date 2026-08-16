"use client";

import { useEffect } from "react";
import { rememberHouseholdAction } from "@/app/actions/household";

const RememberHousehold = ({ token, name }: { token: string; name: string }) => {
  useEffect(() => {
    rememberHouseholdAction(token, name);
  }, [token, name]);

  return null;
};

export default RememberHousehold;