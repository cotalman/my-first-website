import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';

const INITIAL_ITEMS = [
  { id: 'item-1', label: 'HTML' },
  { id: 'item-2', label: 'CSS' },
  { id: 'item-3', label: 'JavaScript' },
  { id: 'item-4', label: 'React' },
  { id: 'item-5', label: 'Node.js' },
];

/**
 * DragDropSection 컴포넌트
 * HTML5 Drag and Drop API 기반 아이템 이동 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <DragDropSection />
 */
function DragDropSection() {
  const [sourceItems, setSourceItems] = useState(INITIAL_ITEMS);
  const [droppedItems, setDroppedItems] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item.id);
    setDraggingId(item.id);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDropToTarget = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const itemId = e.dataTransfer.getData('text/plain');
    const item = sourceItems.find((i) => i.id === itemId);
    if (item) {
      setSourceItems((prev) => prev.filter((i) => i.id !== itemId));
      setDroppedItems((prev) => [...prev, item]);
    }
  };

  const handleReturn = (item) => {
    setDroppedItems((prev) => prev.filter((i) => i.id !== item.id));
    setSourceItems((prev) => [...prev, item]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          mb: 3,
          textAlign: 'center',
        }}
      >
        Drag &amp; Drop
      </Typography>
      <Grid container spacing={3}>
        {/* 드래그 영역 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            드래그 영역
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              minHeight: 160,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              alignContent: 'flex-start',
            }}
          >
            {sourceItems.length === 0 && (
              <Typography variant="body2" sx={{ color: 'text.disabled', width: '100%', textAlign: 'center', mt: 6 }}>
                모든 아이템이 이동되었습니다
              </Typography>
            )}
            {sourceItems.map((item) => (
              <Chip
                key={item.id}
                label={item.label}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onDragEnd={handleDragEnd}
                sx={{
                  cursor: 'grab',
                  opacity: draggingId === item.id ? 0.4 : 1,
                  transition: 'opacity 0.2s ease',
                  '&:active': { cursor: 'grabbing' },
                }}
              />
            ))}
          </Paper>
        </Grid>

        {/* 드롭 영역 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            드롭 영역
          </Typography>
          <Paper
            variant="outlined"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDropToTarget}
            sx={{
              p: 2,
              minHeight: 160,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              alignContent: 'flex-start',
              borderColor: isDragOver ? 'primary.main' : 'divider',
              borderWidth: isDragOver ? 2 : 1,
              bgcolor: isDragOver ? 'action.hover' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            {droppedItems.length === 0 && (
              <Typography variant="body2" sx={{ color: 'text.disabled', width: '100%', textAlign: 'center', mt: 6 }}>
                여기에 아이템을 드롭하세요
              </Typography>
            )}
            {droppedItems.map((item) => (
              <Chip
                key={item.id}
                label={item.label}
                color="primary"
                onDelete={() => handleReturn(item)}
              />
            ))}
          </Paper>
        </Grid>
      </Grid>
      <Typography
        variant="body2"
        sx={{
          mt: 2,
          color: 'text.secondary',
          textAlign: 'center',
        }}
      >
        {droppedItems.length > 0
          ? `${droppedItems.length}개 아이템 이동됨: ${droppedItems.map((i) => i.label).join(', ')}`
          : '아이템을 드래그하여 드롭 영역으로 이동해보세요'}
      </Typography>
    </Box>
  );
}

export default DragDropSection;
