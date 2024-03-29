import { googleFonts } from '@/lib/googleFonts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function GoogleFontInput({ className, placeholder = 'Select value', ...props }) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full ">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {googleFonts.map((name) => (
          <SelectItem key={name} value={name}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
