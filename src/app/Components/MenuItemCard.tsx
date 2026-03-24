import { MenuItem } from "../types";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({item}: MenuItemCardProps) {

  const formattedPrice = item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD'});

  return (
    <div className="flex justify-between items-center px-5 py-3 gap-4 border-b border-slate-300 last:border-b-0">
      <div>
        <p className="font-body text-sm font-medium text-slate-900">{item.name}</p>
        {item.desc && <p className="font-body text-xs text-slate-500 mt-0.5">{item.desc}</p>}
      </div>
      <span className="font-body text-sm font-medium text-slate-500 whitespace-nowrap">{formattedPrice}</span>
    </div>
  )
}