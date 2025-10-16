'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Calendar Component Placeholder
 * 
 * This component requires the 'react-day-picker' package to be installed.
 * To enable full calendar functionality, run:
 * npm install react-day-picker
 * 
 * For now, this is a placeholder that won't break the build.
 */

interface CalendarProps {
  className?: string
  mode?: 'single' | 'multiple' | 'range'
  selected?: Date | Date[]
  onSelect?: (date: Date | Date[] | undefined) => void
}

function Calendar({
  className,
  mode = 'single',
  selected,
  onSelect,
}: CalendarProps) {
  return (
    <div className={cn('p-3 bg-white rounded-md border', className)}>
      <div className="text-center">
        <div className="text-sm font-medium mb-2">Calendar Component</div>
        <div className="text-xs text-gray-500">
          Install <code className="bg-gray-100 px-1 rounded">react-day-picker</code> package
          <br />
          for full calendar functionality
        </div>
        {selected && (
          <div className="mt-3 text-xs">
            Selected: {selected instanceof Date ? selected.toLocaleDateString() : 'Multiple dates'}
          </div>
        )}
      </div>
    </div>
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
