import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical,
  ChevronDown,
  ChevronUp,
  Trash2,
  ArrowUp,
  ArrowDown,
  Edit2,
  Check,
  Calendar,
  DollarSign,
  Plus
} from 'lucide-react';
import { StopItem } from './StopItem';
import { useTrip } from '../context/TripContext';

export const DayCard = ({ day, isFirst, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(day.title);
  const [editDescription, setEditDescription] = useState(day.description);

  const { deleteDay, moveDay, updateDayHeader } = useTrip();

  // @dnd-kit sortable hook setup
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: day.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : 1
  };

  const handleSaveHeader = () => {
    updateDayHeader(day.id, editTitle, editDescription);
    setIsEditing(false);
  };

  // Completion Stats for Day
  const totalStops = day.stops?.length || 0;
  const completedStops = day.stops?.filter(s => s.completed).length || 0;
  const isDayCompleted = totalStops > 0 && completedStops === totalStops;

  return (
    <div ref={setNodeRef} style={style} className="touch-none mb-4">
      <motion.div
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`rounded-3xl glass-card border transition-all duration-200 overflow-hidden shadow-lg ${
          isDragging
            ? 'ring-2 ring-brand-500 border-brand-500 shadow-2xl'
            : isDayCompleted
            ? 'border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/10'
            : 'border-slate-200/90 dark:border-slate-800/90'
        }`}
      >
        {/* Card Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          
          {/* Left Controls & Title */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Drag Handle */}
            <button
              {...attributes}
              {...listeners}
              className="p-1.5 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-grab active:cursor-grabbing focus:outline-none"
              title="Drag to reorder day"
            >
              <GripVertical className="w-5 h-5" />
            </button>

            {/* Day Badge */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-500 text-white font-extrabold flex items-center justify-center shadow-md shadow-brand-500/20 shrink-0 text-sm">
              D{day.day}
            </div>

            {/* Title / Editing Mode */}
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="space-y-2 pr-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full text-base font-bold bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-brand-500 text-slate-900 dark:text-slate-100 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full text-xs bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none"
                  />
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg line-clamp-1">
                      {day.title}
                    </h4>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1 text-slate-400 hover:text-brand-500 transition-colors"
                      title="Edit title & description"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {day.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5">
            {isEditing ? (
              <button
                onClick={handleSaveHeader}
                className="p-2 rounded-xl bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1 hover:bg-emerald-600 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Save</span>
              </button>
            ) : (
              <>
                {/* Move Up / Down Buttons */}
                <div className="hidden sm:flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
                  <button
                    onClick={() => moveDay(day.id, 'up')}
                    disabled={isFirst}
                    className={`p-1 rounded-lg transition-colors ${
                      isFirst ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                    }`}
                    title="Move day up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveDay(day.id, 'down')}
                    disabled={isLast}
                    className={`p-1 rounded-lg transition-colors ${
                      isLast ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                    }`}
                    title="Move day down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Delete Day */}
                <button
                  onClick={() => deleteDay(day.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  title="Delete Day"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Expand / Collapse */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title={isExpanded ? "Collapse day" : "Expand day"}
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Day Meta Pill Bar */}
        <div className="px-5 py-2 bg-slate-100/40 dark:bg-slate-800/40 border-t border-b border-slate-200/50 dark:border-slate-800/50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Completed: {completedStops}/{totalStops} places
            </span>
            {day.estimatedCost && (
              <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                <DollarSign className="w-3.5 h-3.5" />
                Est. Cost: {day.estimatedCost}
              </span>
            )}
          </div>

          <div className="w-24 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-brand-500 h-full transition-all duration-300"
              style={{ width: `${totalStops > 0 ? (completedStops / totalStops) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Expandable Stops Content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 sm:p-5 space-y-3"
            >
              {day.stops && day.stops.map((stop) => (
                <StopItem key={stop.id} stop={stop} dayId={day.id} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
