import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Paper, Typography, Button, Box, useTheme, useMediaQuery } from '@mui/material';

const TaskCard = ({ task, onDelete, onEdit, onViewDetails }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id.toString(),
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(task._id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(task);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (onViewDetails) onViewDetails(task);
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      elevation={3}
      sx={{
        p: 2,
        mb: 2,
        backgroundColor: '#B0E0FF',
        cursor: 'grab',
        width: '100%',
      }}
    >
      <div {...listeners}>
        <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>
          {task.title}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 1, 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {task.description}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mb: 1 }}>
          Created at: {new Date(task.createdAt).toLocaleString()}
        </Typography>
      </div>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'flex-end', 
        gap: 1 
      }}>
        <Button
          variant="outlined"
          size="small"
          onClick={handleDelete}
          sx={{
            backgroundColor: '#E75959',
            color: 'white',
            '&:hover': {
              backgroundColor: '#cc4f4f',
            },
            width: isMobile ? '100%' : 'auto',
          }}
          data-testid={`delete-${task._id}`}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={handleEdit}
          sx={{
            backgroundColor: '#4791db',
            color: 'white',
            '&:hover': {
              backgroundColor: '#3a79b1',
            },
            width: isMobile ? '100%' : 'auto',
          }}
          data-testid={`edit-${task._id}`}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={handleViewDetails}
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            '&:hover': {
              backgroundColor: '#145ea1',
            },
            width: isMobile ? '100%' : 'auto',
          }}
          data-testid={`view-${task._id}`}
        >
          View Details
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskCard;