import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
      <h1 className="text-3xl">
          Hello World
          <Button>Click me</Button>
      </h1>
   );
}
