const Filter = ({ q, onFilter }) =>
  <p>
    filter shown with <input name="q" type="text" value={q} onChange={onFilter} />
  </p>

export default Filter
