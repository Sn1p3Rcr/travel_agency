import React from 'react'

type Props = {
  onFilter?: (q: Record<string, string>) => void
}

export const FilterForm = ({ onFilter }: Props): JSX.Element => {
  const [query, setQuery] = React.useState('')

  return (
    <form onSubmit={(e) => { e.preventDefault(); onFilter?.({ q: query }) }} style={{ display: 'flex', gap: 8 }}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск по названию или стране" />
      <button type="submit">Поиск</button>
    </form>
  )
}

export default FilterForm
