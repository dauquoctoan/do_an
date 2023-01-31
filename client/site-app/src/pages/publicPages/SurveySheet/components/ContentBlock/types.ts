import { ReactNode } from "react";

export interface ContentBlockProps {
  icon: string;
  title: string;
  content: ReactNode;
  section?: any;
  button?: any;
  t?: any;
  id: string;
  type?: string;
}
