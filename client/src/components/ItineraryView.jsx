import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import { Calendar, GripVertical, Sparkles, Layers } from 'lucide-react';
import { DayCard } from './DayCard';
import { SummaryPanel } from './SummaryPanel';
import { useTrip } from '../context/TripContext';

export const ItineraryView = () => {
  const { currentTrip, reorderDays } = useTrip();

  // Sensors for DnD kit (pointer & keyboard)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5 // Avoid accidental drags when clicking input fields
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  if (!currentTrip || !currentTrip.days) return null;

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = currentTrip.days.findIndex(day => day.id === active.id);
      const newIndex = currentTrip.days.findIndex(day => day.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newDaysOrder = arrayMove(currentTrip.days, oldIndex, newIndex);
        reorderDays(newDaysOrder);
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner Notice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 rounded-2xl glass-panel border border-brand-500/20 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Interactive Itinerary Board
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Drag handles to reorder days, check off places, or expand days to inspect stop details.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
          <GripVertical className="w-4 h-4 text-brand-500" />
          <span>Drag & Drop Enabled</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Summary Panel */}
        <div className="lg:col-span-1">
          <SummaryPanel />
        </div>

        {/* Right Sortable Days List */}
        <div className="lg:col-span-2">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={currentTrip.days.map(d => d.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {currentTrip.days.map((day, index) => (
                  <DayCard
                    key={day.id}
                    day={day}
                    isFirst={index === 0}
                    isLast={index === currentTrip.days.length - 1}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
};
