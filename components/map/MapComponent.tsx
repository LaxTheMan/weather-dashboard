import dynamic from "next/dynamic";

export const LazyMap = dynamic(() => import("./Map"), { ssr: false });
