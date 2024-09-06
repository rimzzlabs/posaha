import { ScrollArea } from "@/components/ui/scroll-area";
import { PropsWithChildren } from "react";

export function ProductContainer(props: PropsWithChildren) {
  return (
    <section className="py-6">
      <ScrollArea className="h-[calc(100vh-4rem-2rem-3rem-3rem-3rem)] md:h-[calc(100vh-4rem-5rem-5rem-3rem-3rem)]">
        {props.children}
      </ScrollArea>
    </section>
  );
}
