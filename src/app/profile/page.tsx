"use client";
import { Store } from "@/lib/Redux/ReduxStore";
import React from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const { token, userdata } = useSelector(
    (state: ReturnType<typeof Store.getState>) => state.auth
  );
  console.log("token" + token);
  console.log("userdata" + userdata);

  return <div>profile</div>;
}
