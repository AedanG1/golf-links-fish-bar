import { Category, MenuItem } from "../types"
import MenuItemCard from "./MenuItemCard";

interface MenuCategorySectionProps {
  category: Category;
  items: MenuItem[];
}

export default function MenuCategorySection ({category, items}: MenuCategorySectionProps) {
  return (
    <div className="border border-slate-300 rounded-xl overflow-hidden mb-6">
      <h2 className="font-body text-sm font-medium text-slate-500 uppercase tracking-widest px-5 py-3 border-b border-slate-300">
        {category}
      </h2>
      {
        items.map((item: MenuItem) => (
          <MenuItemCard 
            key={item.name}
            item={item}
          />
        ))
      }
    </div>
  )
}