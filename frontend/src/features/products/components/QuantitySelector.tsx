import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorProps {
  max: number
  onChange: (quantity: number) => void
  value: number
}

export function QuantitySelector({ max, onChange, value }: QuantitySelectorProps) {
  const updateQuantity = (nextValue: number) => onChange(Math.min(Math.max(nextValue, 1), max))

  return (
    <div className="quantity-selector">
      <span>Cantidad</span>
      <div>
        <button aria-label="Reducir cantidad" disabled={value === 1} onClick={() => updateQuantity(value - 1)} type="button"><Minus size={15} /></button>
        <output aria-live="polite">{value}</output>
        <button aria-label="Aumentar cantidad" disabled={value === max} onClick={() => updateQuantity(value + 1)} type="button"><Plus size={15} /></button>
      </div>
    </div>
  )
}
