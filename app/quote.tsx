"use client";

import { Blockquote } from "flowbite-react";

export function Quote() {
  return(
      <Blockquote className="my-4 border-l-4 border-white-300 bg-white-50 p-4 dark:border-white-500 dark:bg-white-800">
        "The best way to predict the future is to invent it." <i>- Alan Kay</i>
      </Blockquote>
    );
};

