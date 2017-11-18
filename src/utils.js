import moment from 'moment'

// Sorting comparator
export const sortByDate = (...items) => {
  const dates = items.map(normalizeDate)
  return moment(dates[0]).diff(moment(dates[1]))
}

// Extract date info in a moment.js friendly format
export function normalizeDate({year, month}) {
  if (!year || !month || typeof year !== 'number' || typeof month !== 'number') 
    throw new Error('Date value missing, cannot normalize date.')
  return {year, month: month-1}
}