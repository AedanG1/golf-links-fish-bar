import MenuCategorySection from "./Components/MenuCategorySection";
import OpenStatus from "./Components/OpenStatus";
import { Category, MenuItem } from "./types";
import { JSX } from "react";

export default async function Home() {

  const res = await fetch('https://script.google.com/macros/s/AKfycbwp4nKiUMA8-VqOqAS8eyzXlPcCoelEx5OZzCgolVZnN1HiahhkORFsZYogkG_Os-LcQg/exec', {
    // next: {revalidate: 300}
  });

  const data = await res.json();

  const categories = Array.from(new Set(data.map((item: MenuItem) => item.category))) as Category[];

  return (
   <div className="space-y-8 flex flex-col items-center">
    <div className="flex flex-col items-center gap-2">
      <h1 className="font-bold text-3xl uppercase font-display">Golf Links Fish Bar</h1>
      <h2 className="font-body text-sm">07 4732 0555</h2>
      <h3 className="font-body text-sm">112 Golf Links Dr, Kirwan QLD 4817</h3>
      <div className="flex flex-col items-center">
        <p className="font-body text-sm">Mon-Wed: 4:30 - 7:30pm</p>
        <p className="font-body text-sm">Thu: 4:30 - 8pm</p>
        <p className="font-body text-sm">Fri-Sun: 11:30 - 8pm</p>
      </div>
      <OpenStatus />
    </div>
    <div className="space-y-4">
    {
      categories.map((category: Category): JSX.Element => (
        <MenuCategorySection
          key={category}
          category={category}
          items={data.filter((item: MenuItem) => item.category === category) as MenuItem[]}
        />
      ))
    }
    </div>
   </div> 
  );
}