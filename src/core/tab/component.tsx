import * as React from "react";

export type TabWrapperProps = {
  children: React.ReactNode;
};

export const TabWrapper = ({ children }: TabWrapperProps) => {
  return (
    <>
      {children}
    </>
  );
}
