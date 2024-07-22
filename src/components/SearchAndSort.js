import React, { useState, useCallback } from 'react';
import { Box, TextField, Select, MenuItem, Typography, useTheme, useMediaQuery } from '@mui/material';
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        gap: 2,
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: isMobile ? 1 : 2,
          width: '100%',
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          Search:
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          width: '100%',
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          Sort By:
        </Typography>
        <Select
          fullWidth
          value={sortOption}
          onChange={handleSortChange}
          variant="outlined"
        >
          <MenuItem value="recent">Most Recent</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
          <MenuItem value="alphabetical">Alphabetical</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default SearchAndSort;