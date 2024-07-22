import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  Modal,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../redux/actions/taskActions";
import TaskCard from "../components/TaskCard";
import Column from "../components/Column";
import debounce from 'lodash/debounce';

const SearchAndSort = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('recent');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 300),
    [onSearch]
  );

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOption(value);
    onSort(value);
  };

  return (
    <Paper sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row',justifyContent: "space-between", gap: 2, width: '100%',p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: isMobile ? '100%' : '40%' }}>
        <Typography sx={{ mr: 1, whiteSpace: 'nowrap' }}>Search:</Typography>
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', width: isMobile ? '100%' : '40%' }}>
        <Typography sx={{ mr: 1, whiteSpace: 'nowrap' }}>Sort By:</Typography>
        <Select
          value={sortOption}
          onChange={handleSortChange}
          size="small"
          fullWidth
        >
          <MenuItem value="recent">Most Recent</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
          <MenuItem value="alphabetical">Alphabetical</MenuItem>
        </Select>
      </Box>
    </Paper>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('recent');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreateTask = () => {
    dispatch(createTask({ ...newTask, status: "TODO" }));
    setNewTask({ title: "", description: "" });
    setIsModalOpen(false);
  };

  const handleUpdateTask = () => {
    dispatch(updateTask(editingTask._id, editingTask));
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };
  
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };
  
  const handleViewDetails = (task) => {
    setViewingTask(task);
  };

  const onDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeTask = tasks.find((task) => task._id.toString() === active.id);
    const overColumn = over.id;

    if (activeTask.status !== overColumn) {
      dispatch(
        updateTask(activeTask._id, { ...activeTask, status: overColumn })
      );
    }

    setActiveId(null);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleSort = (value) => {
    setSortOption(value);
  };

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOption) {
      case 'recent':
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'alphabetical':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [tasks, searchTerm, sortOption]);

  const getTasksByStatus = (status) =>
    filteredAndSortedTasks.filter((task) => task.status === status);

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          onClick={() => setIsModalOpen(true)}
          sx={{ alignSelf: isMobile ? 'stretch' : 'flex-start' }}
        >
          Add New Task
        </Button>
        <SearchAndSort onSearch={handleSearch} onSort={handleSort} />
      </Box>

      {/* Create/Edit Task Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: '90%', sm: '80%', md: 400 },
            maxWidth: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editingTask ? "Edit Task" : "Add New Task"}
          </Typography>
          <TextField
            label="Title"
            fullWidth
            value={editingTask ? editingTask.title : newTask.title}
            onChange={(e) =>
              editingTask
                ? setEditingTask({ ...editingTask, title: e.target.value })
                : setNewTask({ ...newTask, title: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={editingTask ? editingTask.description : newTask.description}
            onChange={(e) =>
              editingTask
                ? setEditingTask({
                    ...editingTask,
                    description: e.target.value,
                  })
                : setNewTask({ ...newTask, description: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              variant="contained"
              onClick={editingTask ? handleUpdateTask : handleCreateTask}
            >
              {editingTask ? "Save" : "Add Task"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setIsModalOpen(false);
                setEditingTask(null);
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* View Task Details Modal */}
      <Modal
        open={!!viewingTask}
        onClose={() => setViewingTask(null)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: '90%', sm: '80%', md: 400 },
            maxWidth: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Task Details
          </Typography>
          {viewingTask && (
            <>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Title:</strong> {viewingTask.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Description:</strong> {viewingTask.description}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Created at:</strong> {new Date(viewingTask.createdAt).toLocaleString()}
              </Typography>
            </>
          )}
          <Button
            variant="contained"
            onClick={() => setViewingTask(null)}
          >
            Close
          </Button>
        </Box>
      </Modal>

      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        collisionDetection={closestCorners}
      >
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
          {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
            <Grid item xs={12} sm={6} md={4} key={status}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: "primary.contrastText",
                  color: "#ffffff",
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  minHeight: isMobile ? 'auto' : 400,
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: (theme) => theme.palette.primary.light,
                    borderTopLeftRadius: (theme) => theme.shape.borderRadius + 'px',
                    borderTopRightRadius: (theme) => theme.shape.borderRadius + 'px',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {status.replace("_", " ")}
                  </Typography>
                </Box>
                <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto' }}>
                  <Column
                    id={status}
                    tasks={getTasksByStatus(status)}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                    onViewDetails={handleViewDetails}
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <DragOverlay>
          {activeId ? (
            <TaskCard
              task={tasks.find((task) => task._id.toString() === activeId)}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              onViewDetails={handleViewDetails}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Container>
  );
};

export default Dashboard;