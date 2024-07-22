import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

const Column = ({ id, tasks, onDelete, onEdit, onViewDetails }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div ref={setNodeRef}>
      {tasks.map((task) => (
        <TaskCard
          key={task._id.toString()}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default Column;